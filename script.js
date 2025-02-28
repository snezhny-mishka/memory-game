const colors = ["red", "pink", "blue", "yellow", "green", "orange","red", "pink", "blue", "yellow", "green", "orange"];
colors.sort(() => Math.random() - 0.5);

const cards = [...document.querySelectorAll(".card")];

for (let i = 0; i < cards.length; i++) {
    cards[i].style.backgroundColor = colors[i];
};

let firstCard = "";
let secondCard = "";


cards.forEach(card => card.addEventListener("click", eventClick));

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

        card1.removeEventListener("click", eventClick);
        card2.removeEventListener("click", eventClick);
        setTimeout(() => {
            card1.classList.add("pair");
            card2.classList.add("pair");
        }, 2500);

        resetTheCards();
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
    if(card2)  {
        return true;
        
     } else {
        return false;
     }
}

