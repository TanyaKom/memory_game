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
}

initializeBoard();
