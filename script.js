const pauseTime = 1000;
let turnCard = false;
let firstTurnedCard;
let secondTurnedCard;
let allCards;
// let totalCards;

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


function initializeBoard(totalCards) {
	let allCards = document.querySelectorAll(".memory-card");

	if (allCards) {
		allCards.forEach(card => {
			card.removeEventListener("click", onClickedCard);
		});
	}
		allCards = document.querySelectorAll(".memory-card");
		allCards.forEach(function (card, index) {
			if( index < totalCards) {
			const randomIndex = Math.floor(Math.random() * totalCards);
			card.style.order = randomIndex;
			card.addEventListener("click", onClickedCard);
			card.style.display = "block";
			} else {
				card.style.display = "none";
			}
		});
	}

function blockFirstSecondCards() {
	firstTurnedCard.removeEventListener("click", onClickedCard);
	secondTurnedCard.removeEventListener("click", onClickedCard);
	resetBoard();
	checkAllCardsOpened(allCards);
}

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
	let selectedLevel = document.getElementById("level").value;
	let totalCards;
	
	if (selectedLevel === "Easy") {
		totalCards = 8;
	} else if (selectedLevel === "Medium") {
		totalCards = 10;
	} else if (selectedLevel === "Hard") {
		totalCards = 12;
	}
	
	initializeBoard(totalCards);

	document.querySelector(".memory-game").style.setProperty("display", "flex");

	background.classList.remove("initial-bckg");
	background.classList.add("body");
startTimer();

}

document.getElementById("startButton").addEventListener("click",function() {
	document.querySelector(".start-page").style.display = "none";
	document.querySelector(".level").style.display = "none";
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
console.log("count opened:", countOpened);

if (countOpened === allCardsOpened.length) {
	let openWindow = document.getElementById("finishWindow");	
	
console.log("displaying finish window");

	openWindow.style.display = "flex";
	return true;

}
return false;

}
checkAllCardsOpened(allCards);

function playAgain() {
	let openWindow = document.getElementById("finishWindow");
	let loseWindow = document.getElementById("lose game");
	openWindow.style.display = "none";
	loseWindow.style.display = "none";
	location.reload();
}
