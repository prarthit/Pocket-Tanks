startGame();

function startGame(){
	initialize();
	tankleft.turn = true;
	generate_terrain_pts();
	draw_terrain();
	generateTankPoints();
	setInterval(updateFrames, 60);
}

function initialize(){
	points = [];

    tankleft.pos_index = 0;
    tankleft.theta = 0;
    tankleft.score = 0;
    tankleft.numOfTurns = 0;
    tankleft.power = 50;
    tankleft.turn = false;
    tankleft.nozzle = {x: 0, y: 0, alpha: 50*Math.PI/180};

    tankright.pos_index = 0;
    tankright.theta = 0;
    tankright.score = 0;
    tankright.numOfTurns = 0;
    tankright.power = 50;
    tankright.turn = false;
    tankright.nozzle = {x: 0, y: 0, alpha: 50*Math.PI/180};
}

function updateFrames(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	draw_terrain();
	goAhead();
}

function goAhead(){
    if(loadedImages == 3)
    {
        draw_tank();
        draw_nozzle();
        fireInfo.drawPath();
    }
}

function switchTurn(){
	var turns = 2;

	if(tankleft.turn === true){
		updateAnglePower("right");
		tankleft.numOfTurns++;
		tankright.turn = true;
		tankleft.turn = false;
	}
	else if(tankright.turn === true){
		updateAnglePower("left");
		tankright.numOfTurns++;
		tankright.turn = false;
		tankleft.turn = true;
	}

	updateScores();

	if(tankleft.numOfTurns===turns && tankright.numOfTurns===turns)
		winningState();
}