var fireInfo = {
	is_on: false,
	path: [],
	pathIterator: 0,
	explosion: {
		gridX: 0,
		gridY: 0,
		bomb: new Image()
	},
	drawPath(){
		if(this.is_on === true && this.pathIterator<this.path.length){
			ctx.beginPath();
			ctx.arc(this.path[this.pathIterator].x, this.path[this.pathIterator].y, 5, 0, 2*Math.PI);
			ctx.fillStyle = 'black';
			ctx.fill();
			this.pathIterator++;
		}
		else if(this.is_on === true && this.pathIterator>=this.path.length && this.explosion.gridY<=64*4){
			if(this.explosion.gridX>64*4)
			{ this.explosion.gridX = 0; this.explosion.gridY += 64; }

			var xPos = this.path[this.path.length-1].x - 32;
			var yPos = this.path[this.path.length-1].y - 32;

			ctx.drawImage(this.explosion.bomb, this.explosion.gridX, this.explosion.gridY, 64,64,xPos,yPos,64,64);

			this.explosion.gridX += 64;
		}
		else if(this.is_on === true && this.pathIterator>=this.path.length){
			this.explosion.gridX = 0;
			this.explosion.gridY = 0;
			this.is_on = false;
			this.pathIterator = 0;
			this.path = [];
			switchTurn();
		}
	}
};

fireInfo.explosion.bomb.onload = function(){ loadedImages++; goAhead(); }
fireInfo.explosion.bomb.src = 'css/images/explosion.png';

function fire(){
	if(tankleft.turn === true)
		fireByLeftTank();
	else if(tankright.turn === true)
		fireByRightTank();
}

function fireByLeftTank(){
	var beta = tankleft.theta + tankleft.nozzle.alpha,
		initVel = tankleft.power,
		acceleration = 8;
	
	for(var x=0; x<=canvas.width; x+=20)
	{
		var newx = 0,newy = 0;
		var y = x*Math.tan(beta) - (((0.5)*acceleration*x*x)/(Math.pow(initVel*Math.cos(beta),2)));

		var tankx_i = points[tankright.pos_index].x,
			tankx_f = tankx_i + tankWidth*Math.cos(tankright.theta);

		newx = tankleft.nozzle.x + x;
		newy = tankleft.nozzle.y - y;

		if(newx>=canvas.width || newy>=points[Math.floor(newx)].y || collisionDetection(newx, newy, tankx_i, tankx_f)){
			fireInfo.is_on = true;
			return;
		}

		fireInfo.path.push({x: newx, y: newy});
	}
}

function fireByRightTank(){
	var beta = -tankright.theta + tankright.nozzle.alpha,
		initVel = tankright.power,
		acceleration = 8;
	
	for(var x=0; x<=canvas.width; x+=20)
	{
		var newx = 0,newy = 0;
		var y = x*Math.tan(beta) - (((0.5)*acceleration*x*x)/(Math.pow(initVel*Math.cos(beta),2)));

		var tankx_i = points[tankleft.pos_index].x,
			tankx_f = tankx_i + tankWidth*Math.cos(tankleft.theta);

		newx = tankright.nozzle.x - x;
		newy = tankright.nozzle.y - y;

		if(newx>=canvas.width || newy>=points[Math.floor(newx)].y || collisionDetection(newx, newy, tankx_i, tankx_f)){
			fireInfo.is_on = true;
			return;
		}

		fireInfo.path.push({x: newx, y: newy});
	}
}

function collisionDetection(newx, newy, tankx_i, tankx_f){
	if(newx>=tankx_i && newx<=tankx_f){
		if(newy>=points[Math.floor(newx)].y - 45)
		{
			if(tankx_i<canvas.width/2)
				tankright.score += 25;
			else
				tankleft.score += 25;
			return true;
		}
	}
}