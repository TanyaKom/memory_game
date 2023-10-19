const crds = document.querySelectorAll('.memory-card');
const cards = 12;
const pauseTime = 1000;
let turnCard = false;

let firstTurnedCard;
let secondTurnedCard;
let allCards = document.querySelectorAll(".memory-card");

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
	if(firstTurnedCard !== null && secondTurnedCard !== null && firstTurnedCard !== undefined && secondTurnedCard !== undefined) {
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

function initialisationBoard(cardsArray) {
	cardsArray.forEach(function (cardsArray) {
		const randomIndex = Math.floor(Math.random() * cardsArray.length);
		cardsArray.style.order = randomIndex;
		cardsArray.addEventListener("click", onClickedCard);
	});
}

function blockFirstSecondCards() {
	firstTurnedCard.removeEventListener("click", onClickedCard);
	secondTurnedCard.removeEventListener("click", onClickedCard);
	resetBoard();
}
initialisationBoard(allCards);


function shuffle() {
	crds.forEach(crd => {
	  let ramdomPos = Math.floor(Math.random() * 12);
	  crd.style.order = ramdomPos;
	});
  }
  shuffle(cards);