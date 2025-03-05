const symbols = ['🍎', '🍌', '🍒', '🍓', '🍊', '🍍', '🥭', '🍉'];
let cardArray = [];
let flippedCards = [];
let matchedCards = [];
let attempts = 0;

const gameGrid = document.getElementById('game-grid');
const attemptsCounter = document.getElementById('attempts');
const gameOverMessage = document.getElementById('game-over-message');
const resetButton = document.getElementById('reset-button');


function initGame() {
    const shuffledSymbols = [...symbols, ...symbols].sort(() => 0.5 - Math.random());
    cardArray = shuffledSymbols.map(symbol => ({
        symbol,
        isFlipped: false,  
        isMatched: false
    }));

    gameGrid.innerHTML = '';
    cardArray.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', flipCard);
        gameGrid.appendChild(cardElement);
    });

    flippedCards = [];
    matchedCards = [];
    attempts = 0;
    attemptsCounter.textContent = attempts;
    gameOverMessage.style.display = 'none';
}


function flipCard() {
    const cardIndex = this.dataset.index;
    const card = cardArray[cardIndex];

    if (card.isFlipped || card.isMatched || flippedCards.length === 2) return;

    this.classList.add('flip');
    this.textContent = card.symbol;

    flippedCards.push({ card, element: this });

    if (flippedCards.length === 2) {
        attempts++;
        attemptsCounter.textContent = attempts;

        setTimeout(() => checkMatch(), 1000);
    }
}


function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.card.symbol === secondCard.card.symbol) {
        firstCard.card.isMatched = true;
        secondCard.card.isMatched = true;
        matchedCards.push(firstCard.card.symbol);
        if (matchedCards.length === symbols.length) {
            gameOverMessage.style.display = 'block';
        }
    } else {
        firstCard.element.classList.remove('flip');
        secondCard.element.classList.remove('flip');
        firstCard.element.textContent = '';
        secondCard.element.textContent = '';
    }

    flippedCards = [];
}


resetButton.addEventListener('click', initGame);

initGame(); 
