const colors = [
    "darkred", 
    "lightcoral", 
    "indigo", 
    "yellowgreen", 
    "sandybrown", 
    "skyblue", 
    "darkred", 
    "lightcoral",
    "indigo", 
    "yellowgreen", 
    "sandybrown", 
    "skyblue"];

const board = document.getElementById("board");
const cards = [...document.querySelectorAll(".card")];
const modal = document.getElementById("modal-container");
const playAgainBtn = document.getElementById("play-again-btn");

let firstCard = "";
let secondCard = "";
let pair = 0; // counting the cards pairs

// arranging the cards
function arrangeTheCards() {
    colors.sort(() => Math.random() - 0.5);
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = colors[i];
    };
    cards.forEach(card => card.addEventListener("click", eventClick));
}
arrangeTheCards();

// handling the click event
function eventClick(e) {
    if(!isBoardLocked(firstCard, secondCard)) {
        flip(e.currentTarget);
        flipTwoCards(e.currentTarget);
    }
}

function flipTwoCards(card) {
    if (!firstCard) {
        firstCard = card;
    } else {
        if (firstCard !== card) {
            secondCard = card;
            compareCards(firstCard, secondCard);
        }
    }
}

function compareCards(card1, card2) {
    if (card1.style.backgroundColor === card2.style.backgroundColor) {
        pair++;
        card1.removeEventListener("click", eventClick);
        card2.removeEventListener("click", eventClick);
        setTimeout(() => {
            card1.classList.add("pair");
            card2.classList.add("pair");
            setTimeout(() => {
                if (pair === 6) {
                    modal.hidden = false;
                }
            }, 1000);
            resetTheCards();
        }, 2500);
    } else {
        setTimeout(() => {
            card1.classList.toggle("flip-card");
            card2.classList.toggle("flip-card");
            resetTheCards();
        }, 2500);
    }
}

function resetTheCards() {
    firstCard = "";
    secondCard = "";
}

function flip(card) {
    card.classList.add("flip-card");
}

function isBoardLocked(card1, card2) {
    if(card2) {
        return true;      
    } else {
        return false;
    }
}

// MODAL BTN - reset the game
playAgainBtn.addEventListener("click", () => {
    modal.hidden = true;
    pair = 0;
    arrangeTheCards();
    cards.forEach(card => {
        card.classList.remove("pair");
        card.classList.remove("flip-card");
    });
});

