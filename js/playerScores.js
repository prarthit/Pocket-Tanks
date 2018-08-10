var leftPlayerScore = document.querySelector("#score1"),
	rightPlayerScore = document.querySelector("#score2"),
	stats = document.querySelector("#stats"),
	winnerBox = document.querySelector("#winnerBox"),
	playAgain = document.querySelector("#winnerBox button"),
	body = document.querySelector("body");

function updateScores(){
	leftPlayerScore.innerText = tankleft.score;
	rightPlayerScore.innerText = tankright.score;
}

function winningState(){
	clearInterval();
	canvas.style.display = "none";
	stats.style.display = "none";
	winnerBox.style.display = "block";
	body.style.background = "url(css/images/background.png)";

	if(tankleft.score > tankright.score){
		winnerBox.children[0].innerText = "PLAYER 1 WON!";
	}
	else if(tankright.score > tankleft.score){
		winnerBox.children[0].innerText = "PLAYER 2 WON!";
	}
	else{
		winnerBox.children[0].innerText = "TIE!";
	}
}

//PLAY AGAIN BUTTON EVENT LISTENER
playAgain.addEventListener("click", function(){
	canvas.style.display = "block";
	stats.style.display = "block";
	winnerBox.style.display = "none";
	body.style.background = "none";

	powerInput.value = 50;
	powerSlider.value = 50;
	angleInput.value = 50;

	startGame();
});
