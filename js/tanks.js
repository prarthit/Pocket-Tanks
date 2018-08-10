var tankleft = new tankinfo();
var tankright = new tankinfo();

var tankHeight = 50, tankWidth = 80;

var loadedImages = 0;
loadTanks();

function loadTanks(){
    tankleft.image.src = 'css/images/tank_left.png';
    tankright.image.src = 'css/images/tank_right.png';

    tankleft.image.onload = function(){ loadedImages++; goAhead(); }
    tankright.image.onload = function(){ loadedImages++; goAhead(); }
}

function tankinfo(){
	this.image = new Image();
    this.pos_index = 0;
    this.theta = 0;
    this.score = 0;
    this.numOfTurns = 0;
    this.power = 50;
    this.turn = false;
    this.nozzle = {x: 0, y: 0, alpha: 50*Math.PI/180};
}

function generateTankPoints(){
    tankleft.pos_index = Math.floor(Math.random()*canvas.scrollWidth/3)+10;
    tankright.pos_index = Math.floor((Math.random()*canvas.scrollWidth/3) + 2*canvas.scrollWidth/3)-85;
}

function draw_tank(){
	var index, x1, y1, x2, y2, slope;

    //draw the left tank
    index = tankleft.pos_index;

    x1 = points[index].x;
	y1 = canvas.scrollHeight - points[index].y;

	x2 = points[index+tankWidth].x;
	y2 = canvas.scrollHeight - points[index+tankWidth].y;
	
	slope = (y2-y1)/(x2-x1);

    ctx.save();

    tankleft.theta=Math.atan(slope);
    
    ctx.translate(x1, canvas.scrollHeight - y1);
    ctx.rotate(-tankleft.theta);
    ctx.drawImage(tankleft.image, 0, 0-53, tankWidth, tankHeight);

    ctx.restore();

    //draw the right tank
    index = tankright.pos_index;

    x1 = points[index].x;
	y1 = canvas.scrollHeight - points[index].y;

	x2 = points[index+tankWidth].x;
	y2 = canvas.scrollHeight - points[index+tankWidth].y;
	
	slope = (y2-y1)/(x2-x1);

    ctx.save();

    tankright.theta=Math.atan(slope);
    
    ctx.translate(x1, canvas.scrollHeight - y1);
    ctx.rotate(-tankright.theta);
    ctx.drawImage(tankright.image, 0, 0-53, tankWidth, tankHeight);
    
    ctx.restore();
}

function draw_nozzle(){
    var nozzleX, nozzleY;
    var theta, alpha, index;

    //draw nozzle for the left tank
    ctx.save();

    index = tankleft.pos_index;
    theta = tankleft.theta;
    alpha = tankleft.nozzle.alpha;

    nozzleX = tankWidth-30;
    nozzleY = tankHeight-12;

    ctx.translate(points[index].x,points[index].y);
    ctx.rotate(-theta);
    ctx.translate(nozzleX, -nozzleY);
    ctx.rotate(-alpha);
    ctx.fillStyle = "#556B2F";
    ctx.fillRect(0,0,40,4);

    tankleft.nozzle.x = points[index].x + ((nozzleX + 40*Math.cos(alpha))*Math.cos(theta) - (nozzleY + 40*Math.sin(alpha))*Math.sin(theta));
    tankleft.nozzle.y = points[index].y - ((nozzleX + 40*Math.cos(alpha))*Math.sin(theta) + (nozzleY + 40*Math.sin(alpha))*Math.cos(theta));
    
    ctx.restore();

    //draw nozzle for the right tank
    ctx.save();

    index = tankright.pos_index;
    theta = tankright.theta;
    alpha = tankright.nozzle.alpha;

    nozzleX = 30;
    nozzleY = (tankHeight-16);

    ctx.translate(points[index].x,points[index].y);
    ctx.rotate(-theta);
    ctx.translate(nozzleX, -nozzleY);
    ctx.rotate(alpha);
    ctx.fillStyle = "#556B2F";
    ctx.fillRect(0,0,-40,-4);

    nozzleY += 4;

    tankright.nozzle.x = points[index].x + ((nozzleX - 40*Math.cos(alpha))*Math.cos(-theta) + (nozzleY + 40*Math.sin(alpha))*Math.sin(-theta));
    tankright.nozzle.y = points[index].y - (-(nozzleX - 40*Math.cos(alpha))*Math.sin(-theta) + (nozzleY + 40*Math.sin(alpha))*Math.cos(-theta));
    
    ctx.restore();
}