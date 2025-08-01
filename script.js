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
const timerDisplay = document.getElementById("timer");
const showCurrScore = document.getElementById("curr-score");
const showHighScore = document.getElementById("high-score");

let firstCard = "";
let secondCard = "";
let pair = 0; // counting the cards pairs
// timer
let timer = null;
let startTime = 0;
let elapsedTime = 0;

// arranging the cards
function arrangeTheCards() {
    colors.sort(() => Math.random() - 0.5);
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = colors[i];
    };
    cards.forEach(card => card.addEventListener("click", eventClick));
}
arrangeTheCards();
startTimer();

// timer
function startTimer() {
        startTime = Date.now();
        timer = setInterval(updateTimer, 50);
}

function updateTimer() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function stopTimer() {
    clearInterval(timer);
}


// handling the click event
function eventClick(e) {
    if(!isBoardLocked(secondCard)) {
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

function handleScores() {
    const currScore = timerDisplay.textContent;
    localStorage.setItem("current-score", currScore);
    const highScore = localStorage.getItem("high-score");

    if (!highScore) {
        localStorage.setItem("high-score", currScore);
    } else if (localStorage.getItem("current-score") < localStorage.getItem("high-score")) {
        localStorage.setItem("high-score", currScore);
    }
}

let matchTimeout = null;
let modalTimeout = null;
let noMatchTimeout = null;

function showModal() {
    showCurrScore.textContent = localStorage.getItem("current-score");
    showHighScore.textContent = localStorage.getItem("high-score");
    modalTimeout = setTimeout(() => {
        modal.classList.add("show");
    }, 800);
}

function matchDelay(card1, card2) {
    matchTimeout = setTimeout(() => {
        card1.classList.add("pair");
        card2.classList.add("pair");
        resetTheCards();
    }, 700);
}

function noMatchDelay(card1, card2) {
    noMatchTimeout = setTimeout(() => {
        card1.classList.toggle("flip-card");
        card2.classList.toggle("flip-card");
        resetTheCards();
    }, 700);
}

function compareCards(card1, card2) {
    if (card1.style.backgroundColor === card2.style.backgroundColor) {
        pair++;
        card1.removeEventListener("click", eventClick);
        card2.removeEventListener("click", eventClick);
        matchDelay(card1, card2);

        if (pair === 6) {
            stopTimer();
            handleScores();
            showModal();
        }
    } else {
        noMatchDelay(card1, card2);
    }
}




function resetTheCards() {
    firstCard = "";
    secondCard = "";
}

function flip(card) {
    card.classList.add("flip-card");
}

function isBoardLocked(card2) {
    if(card2) {
        return true;      
    } else {
        return false;
    }
}

// MODAL BTN - reset the game
playAgainBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    pair = 0;
    arrangeTheCards();
    startTimer();
    cards.forEach(card => {
        card.classList.remove("pair");
        card.classList.remove("flip-card");
    });
});

