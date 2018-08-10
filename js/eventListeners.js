var moveBtns = document.querySelectorAll("#move button"),
	fireBtn = document.querySelector("#fireAndPower button.statBox"),
	powerInput = document.querySelector("#power p input"),
	powerSlider = document.querySelector("#myRange"),
	angleBtns = document.querySelectorAll("#angle button"),
	angleInput = document.querySelector("#angle input");

//MOVE BUTTON EVENT LISTENERS AND FUNCTIONS
moveBtns[0].addEventListener("click",moveLeft);
moveBtns[1].addEventListener("click",moveRight);

var tankleftMoveCount = 1, tankrightMoveCount = 1;

function moveLeft(){	
	if(tankleft.turn === true && tankleftMoveCount<=4)
	{
		if(tankleft.pos_index >= 40)
			tankleft.pos_index-=20;
		tankleftMoveCount++;
	}
	else if(tankright.turn === true && tankrightMoveCount<=4)
	{
		tankright.pos_index-=20;
		tankrightMoveCount++;
	}
}

function moveRight(){	
	if(tankleft.turn === true && tankleftMoveCount<=4)
	{
		tankleft.pos_index+=20;
		tankleftMoveCount++;
	}
	else if(tankright.turn === true && tankrightMoveCount<=4)
	{
		if(tankright.pos_index <= canvas.scrollWidth-120)
			tankright.pos_index+=20;
		tankrightMoveCount++;
	}
}

//ANGLE BUTTONS EVENT LISTENERS AND FUNCTIONS
angleBtns[0].addEventListener("click",angleAdd);
angleBtns[1].addEventListener("click",angleSub);

function angleAdd(){
	if(angleInput.value<90)
		angleInput.value++;

	if(tankleft.turn === true)
		tankleft.nozzle.alpha = angleInput.value*Math.PI/180;
	else
		tankright.nozzle.alpha = angleInput.value*Math.PI/180;
}

function angleSub(){
	if(angleInput.value>0)
		angleInput.value--;

	if(tankleft.turn === true)
		tankleft.nozzle.alpha = angleInput.value*Math.PI/180;
	else
		tankright.nozzle.alpha = angleInput.value*Math.PI/180;
}

//FIRE BUTTON EVENT LISTENER
fireBtn.addEventListener("click",fire);

//POWER SLIDER EVENT LISTENERS AND FUNCTIONS
powerInput.addEventListener("input",powerInput_in);
powerSlider.addEventListener("input",powerSlider_in);

function powerSlider_in(){
	powerInput.value = powerSlider.value;
	if(tankleft.turn === true)
		tankleft.power = powerInput.value;
	else
		tankright.power = powerInput.value;
}

function powerInput_in(){
	powerSlider.value = powerInput.value;
	if(tankleft.turn === true)
		tankleft.power = powerInput.value;
	else
		tankright.power = powerInput.value;
}

//THE FUNCTION TO UPDATE POWER AND ANGLE OF TANKS (called in switchTurn function)
function updateAnglePower(whichTank){
	if(whichTank === "left"){
		powerInput.value = tankleft.power;
		powerSlider.value = tankleft.power;
		angleInput.value = tankleft.nozzle.alpha * 180/Math.PI;
	}
	else if(whichTank === "right"){
		powerInput.value = tankright.power;
		powerSlider.value = tankright.power;
		angleInput.value = tankright.nozzle.alpha * 180/Math.PI;
	}
}