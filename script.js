const cardArrays = [
    { name: 'apple', img:'images/apple.png' },
    { name: 'apricote', img:'images/apricote.png' },
    { name: 'avocado', img:'images/avocado.png' },
    { name: 'avocadoslice', img:'images/avocadoslice.png' },
    { name: 'banana', img:'images/banana.png' },
    { name: 'blackberry', img:'images/blackberry.png' },
    { name: 'blueberry', img:'images/blueberry.png' },
    { name: 'carambole', img:'images/carambole.png' },
    { name: 'cherry', img:'images/cherry.png' },
    { name: 'coconut', img:'images/coconut.png' },
    { name: 'cranberry', img:'images/cranberry.png' },
    { name: 'grapefruit', img:'images/grapefruit.png' },
    { name: 'grapes', img:'images/grapes.png' },
    { name: 'greenpear', img:'images/greenpear.png' },
    { name: 'kiwi', img:'images/kiwi.png' },
    { name: 'lemon', img:'images/lemon.png' },
    { name: 'lime', img:'images/lime.png' },
    { name: 'limeslice', img:'images/limeslice.png' },
    { name: 'litchi', img:'images/litchi.png' },
    { name: 'litchslice', img:'images/litchslice.png' },
    { name: 'mango', img:'images/mango.png' },
    { name: 'Mangosteen', img:'images/Mangosteen.png' },
    { name: 'melon', img:'images/melon.png' },
    { name: 'mulberry', img:'images/mulberry.png' },
    { name: 'orange', img:'images/orange.png' },
    { name: 'papaya', img:'images/papaya.png' },
    { name: 'papayaslice', img:'images/papayaslice.png' },
    { name: 'Passion', img:'images/Passion.png' },
    { name: 'passionfruit', img:'images/passionfruit.png' },
    { name: 'peach', img:'images/peach.png' },
    { name: 'pear', img:'images/pear.png' },
    { name: 'persimmon', img:'images/persimmon.png' },
    { name: 'pineapple', img:'images/pineapple.png' },
    { name: 'pitaya', img:'images/pitaya.png' },
    { name: 'plum', img:'images/plum.png' },
    { name: 'pomegrenate', img:'images/pomegrenate.png' },
    { name: 'pomegrenateslice',img:'images/pomegrenateslice.png' },
    { name: 'rambutan', img:'images/rambutan.png' },
    { name: 'raspberry', img:'images/raspberry.png' },
    { name: 'strawberry', img:'images/strawberry.png' },
    { name: 'watermelon', img:'images/watermelon.png' },
    { name: 'watermelonslice', img:'images/watermelonslice.png' }
]

const delay = 1;
let firstGuess = '';
let secondGuess = '';
let matchedPairs = 0;
let count = 0;
let previousTarget = null;

const game = document.querySelector('.game-board');
const gameGrid = shuffleArray(cardArrays.concat(cardArrays));

function shuffleArray(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createCard(item) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.name;

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${item.img})`;

    card.appendChild(front);
    card.appendChild(back);
    return card;
}

function initGameBoard() {
    gameGrid.forEach(item => {
        const card = createCard(item);
        game.appendChild(card);
    });
}

function handleCardClick(event) {
    const clicked = event.target;

    if (clicked.nodeName === 'SECTION' ||
        clicked === previousTarget ||
        clicked.parentNode.classList.contains('match') ||
        clicked.parentNode.classList.contains('selected')) {
        // Allow re-clicking on the same card to deselect it
        if (clicked.parentNode.classList.contains('flipped') && count === 1) {
            count--;
            clicked.parentNode.classList.remove('selected', 'flipped');
            firstGuess = '';
        }
        return;
    }

    if (count < 2) {
        count++;
        clicked.parentNode.classList.add('selected', 'flipped');
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            if (firstGuess && secondGuess) {
                if (firstGuess === secondGuess) {
                    setTimeout(match, delay);
                } else {
                    setTimeout(resetGuesses, delay);
                }
            }
        }
        previousTarget = clicked;
    } else {
        // Reset if already two cards are selected
        setTimeout(resetGuesses, delay);
    }
}

function match() {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => card.classList.add('match'));
    matchedPairs++;

    if (matchedPairs === cardArrays.length) {
        setTimeout(() => {
            alert('Congratulations! You found all the matches.');
        }, delay);
    }

    resetGuesses();
}

function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => card.classList.remove('selected', 'flipped'));
}

game.addEventListener('click', handleCardClick);

initGameBoard();