const themes = {
    fruits: ['🍉', '🍎', '🍌', '🍇', '🍓', '🍒', '🥭', '🥝', '🍋', '🍍'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'],
    emojis: ['😀', '😂', '😍', '😎', '😭', '😡', '🤔', '🤗', '😴', '😇']
};
let selectedTheme = 'fruits';
let cards = [];
let flippedCards = [];
let moves = 0;
let timer;
let startTime;
let highScore = localStorage.getItem('highScore') || 'N/A';
let playerTurn = true; // true for human player, false for computer
let memory = {}; // Computer memory

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.high-score').textContent = `High Score: ${highScore}`;
    restartGame();
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateCards() {
    const symbols = themes[selectedTheme].slice(0, 6); // Select 6 symbols to ensure an even number of pairs
    cards = [...symbols, ...symbols]; // Create pairs of symbols
    shuffle(cards);
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = ''; // Clear previous cards
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back"><span class="symbol">${symbol}</span></div>
            </div>
        `;
        card.addEventListener('click', () => playerTurn && flipCard(card));
        gameContainer.appendChild(card);
    });
}

function flipCard(card) {
    if (!flippedCards.includes(card) && flippedCards.length < 2) {
        card.classList.add('flipped');
        flippedCards.push(card);
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    const symbol1 = firstCard.querySelector('.symbol').textContent;
    const symbol2 = secondCard.querySelector('.symbol').textContent;
    setTimeout(() => {
        if (symbol1 === symbol2) {
            memory[firstCard.dataset.index] = symbol1;
            memory[secondCard.dataset.index] = symbol2;
            flippedCards = [];
            if (document.querySelectorAll('.flipped').length === cards.length) {
                endGame();
            } else {
                changeTurn();
            }
        } else {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
            changeTurn();
        }
        moves++;
        document.querySelector('.score').textContent = `Moves: ${moves}`;
    }, 1000);
}

function changeTurn() {
    playerTurn = !playerTurn;
    document.querySelector('.turn-indicator').textContent = playerTurn ? 'Your Turn' : 'Computer Turn';
    if (!playerTurn) {
        setTimeout(computerMove, 1000);
    }
}

function computerMove() {
    const availableCards = [...document.querySelectorAll('.card:not(.flipped)')];
    let cardToFlip;
    let knownPairs = Object.entries(memory).filter(([index, symbol]) => {
        return availableCards.some(card => card.dataset.index == index);
    });
    
    if (knownPairs.length >= 2) {
        // If there are known pairs, find and flip them
        cardToFlip = knownPairs.map(pair => availableCards.find(card => card.dataset.index == pair[0]));
    } else {
        // Otherwise, flip random cards
        cardToFlip = [availableCards[Math.floor(Math.random() * availableCards.length)]];
        cardToFlip.push(availableCards.find(card => card !== cardToFlip[0]));
    }

    flipCard(cardToFlip[0]);
    setTimeout(() => flipCard(cardToFlip[1]), 1000);
}

function startTimer() {
    startTime = Date.now();
    timer = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 900);
        document.querySelector('.timer').textContent = `Time: ${elapsedTime}s`;
    }, 1000);
}

function endTimer() {
    clearInterval(timer);
}

function endGame() {
endTimer();
const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
const finalScore = moves + elapsedTime;
let currentHighScore = highScore === 'N/A' ? Infinity : parseInt(highScore);
if (finalScore < currentHighScore) {
highScore = finalScore;
localStorage.setItem('highScore', highScore);
document.querySelector('.high-score').textContent = `High Score: ${highScore}`;
}
    setTimeout(() => alert('Congratulations! You won the game!'), 500);
}


function restartGame() {
    moves = 0;
    flippedCards = [];
    memory = {};
    playerTurn = true;
    document.querySelector('.score').textContent = `Moves: ${moves}`;
    document.querySelector('.timer').textContent = `Time: 0s`;
    document.querySelector('.turn-indicator').textContent = 'Your Turn';
    endTimer();
    generateCards();
    startTimer();
}