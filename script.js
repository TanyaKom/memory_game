const pauseTime = 1000;
let turnCard = false;

let firstTurnedCard;
let secondTurnedCard;

function resetBoard() {
	turnCard = false;
	firstTurnedCard = null;
	secondTurnedCard = null;
}
 
function turnOverCards() {
	setTimeout(function () {
		firstTurnedCard.classList.remove("flip");
		secondTurnedCard.classList.remove("flip");
		resetBoard();
	}, pauseTime);
}

function compareCards (firstTurnedCardFramework, secondTurnedCardFramework) {
	if (firstTurnedCardFramework === secondTurnedCardFramework) {
		blockFirstSecondCards();
	} else {
		turnOverCards();
	}
}

function onClickedCard(event) {
	if(firstTurnedCard && secondTurnedCard) {
		return;
	}
	const clickedCard = event.target.closest(".memory-card");
	if(clickedCard === firstTurnedCard) {
		return;
	}
	clickedCard.classList.add("flip");
	if(!turnCard) {
		turnCard = true;
		firstTurnedCard = clickedCard;
	} else {
		secondTurnedCard = clickedCard;
		const firstCardFramework = firstTurnedCard.dataset.framework;
		const secondCardFramework = secondTurnedCard.dataset.framework;
	compareCards(firstCardFramework, secondCardFramework);
	}
}

function initializeBoard() {
	let allCards = document.querySelectorAll(".memory-card");

	allCards.forEach(function (card) {
		const randomIndex = Math.floor(Math.random() * allCards.length);
		card.style.order = randomIndex;
		card.addEventListener("click", onClickedCard);

	});
}

function blockFirstSecondCards() {
	firstTurnedCard.removeEventListener("click", onClickedCard);
	secondTurnedCard.removeEventListener("click", onClickedCard);
	resetBoard();
	checkAllCardsOpened();
}

initializeBoard();



let timerDisplay = document.getElementById("timer");
let startButton = document.getElementById("startButton");
let gameContainer = document.getElementById("game-container");

let totalSeconds = 60;
let interval;

function startTimer() {
interval = setInterval(() => {
	if (totalSeconds <= 0) {
		clearInterval(interval);

		if(!checkAllCardsOpened()) {
			let loseWindow = document.getElementById("lose game");
			loseWindow.style.display = "flex";
		}
	} else {
		
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = totalSeconds % 60;

	if (seconds < 10) {
		seconds = `0${seconds}`;
	}
		timerDisplay.innerHTML = `${minutes}:${seconds}`;
		totalSeconds--;
		}
	},1000);
}

function startGame() {
	let background = document.getElementById("game-container");

	document.querySelector(".memory-game").style.setProperty("display", "flex");

	background.classList.remove("initial-bckg");
	background.classList.add("body");

	let allCards = document.querySelectorAll(".memory-card");
	allCards.forEach(card => {
		card.style.display = "block";
	});
	startTimer();
}


document.getElementById("startButton").addEventListener("click",function() {
	document.querySelector(".start-page").style.display = "none";
	document.querySelector(".memory-game").style.setProperty("display", "flex");

	startGame();	
});

function checkAllCardsOpened() {
let allCardsOpened = document.querySelectorAll(".memory-card");
let countOpened = 0;

allCardsOpened.forEach((card) => {
	if (card.classList.contains("flip")) {
		countOpened++;
		}
});
if (countOpened === allCardsOpened.length) {
	let openWindow = document.getElementById("finishWindow");	
	
	openWindow.style.display = "flex";
	return true;

}
return false;
}

function playAgain() {
	let openWindow = document.getElementById("finishWindow");
	let loseWindow = document.getElementById("lose game");
	openWindow.style.display = "none";
	loseWindow.style.display = "none";
	location.reload();
}
