//Creating container for hangman
let hangmanContainer = createDomElement('div', 'hangman-container');


//Creating title container for hangman title and subtitle
let hangmanTitleContainer = createDomElement('div', 'hangman-title-container');

let hangmanTitle = createDomElement('div', 'hangman-title');
hangmanTitle.innerText = 'Hangman Game';

//Create a highest score container
let hangmanHighScore = createDomElement('div', 'hangman-high-score');


//Creating container for displaying lives left
let hangmanLivesDisplay = createDomElement('div', 'hangman-lives-display');


//Creating container for word to be gussed
let hangmanWordGuessContainer = createDomElement('dom', 'hangman-word-container');


//Creating container for selecting alphabet for hangman
let alphabetContainer = createDomElement('div', 'alphabet-container');

let alphabetSelectTitle = createDomElement('div', 'alphabet-select-title');
alphabetSelectTitle.innerText = 'Use the alphabet below to guess the word, you will have 6 lives to begin with for each level.';

let alphabetSelectContent = createDomElement('div', 'alphabet-select-content');


//Creating a alphabet btn and returning
function getAlphabetButton() {
    let alphabetBtn = createDomElement('div', 'alphabet-btn');
    return alphabetBtn;
}

//Creating alphabets in the guess word
let alphabetGuessWordContainer = createDomElement('div', 'alphabet-guess-word-container');
function getAlphabetsInGuessWord() {
    let alphhabetInGuessWord = createDomElement('div', 'alphabet-guess-word');
    return alphhabetInGuessWord;
}

//Creating container for displaying the hangman
let hangmanCanvasContainer = createDomElement('div', 'hangman-canvas-container');

//Creating container for start button
let hangmanStartContainer = createDomElement('div', 'hangman-start-conatiner');

//Creating start btn 
let hangmanStartBtn = createDomElement('div', 'hangman-start-btn');
hangmanStartBtn.innerHTML = 'Start Game';

//creating hangman title on start page and game over
let hangmanStartPageMessage = createDomElement('div', 'hangman-start-page-msg');

//Prepare every component on start game
hangmanStartBtn.addEventListener('click', () => {
    alphabetContainer.style.display = 'grid';
    hangmanLivesDisplay.style.display = 'flex';
    alphabetGuessWordContainer.style.display = 'flex';
    hangmanStartContainer.style.display = 'none';
    hangmanStartPageMessage.style.display = 'none';
    document.body.style.background = '#c1d72e';
    score = 0;
    lives = initialLives;
    //display lives initially and score
    displayRemainingLivesForHangman(initialLives, score, highscore);
    reset();
})


//reset for new game
function reset() {
    alphabetSelectContent.innerHTML = '';
    alphabetGuessWordContainer.innerHTML = '';
    clearContext(hangmanCanvas);
    createHangmanOnCanvas(hangmanCanvas);
    createAlphabetButton();
    createGuessWord();
}
//Clear context of canvas
function clearContext(context) {
    getContextForCanvas(hangmanCanvas).clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
}


//Creating alphabet arr for creating options for hangman
let alphabetArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];


//Creating alphabet button and appending it to container
function createAlphabetButton() {
    alphabetArr.forEach((item) => {
        let btn = getAlphabetButton();
        btn.innerText = item;
        btn.setAttribute('onclick', `checkAlphabetExistInWord('${item}')`);
        alphabetSelectContent.appendChild(btn);
    })
    return alphabetSelectContent;
}

//Creating words arr to create guess word
let words = [
    'javascript',
    'monkey',
    'amazing',
    'pancake',
    'galvainze',
    'cohort',
    'concatenate',
    'iteration',
    'index',
    'code',
    'angular',
    'react',
    'python',
    'donkey',
    'apple',
    'mango',
    'cherry',
    'pineapple',
    'newcastle-united',
];

//initailize variable
let currentLives = 6;
let initialLives = 6;
let score = 0;
let highscore = 0;

//Get random word for guessing
let selectedWord = '';
function getRandomWord() {
    let index = Math.floor((Math.random() * words.length));
    selectedWord = words[index];
    return selectedWord;
}

//Set alphabet as selected on click
function setAlphabetVisited(selectedChar) {
    let alphabetBtns = document.querySelectorAll('.alphabet-btn');
    for (var i = 0; alphabetBtns[i]; ++i) {
        if (alphabetBtns[i].innerText === selectedChar) {
            alphabetBtns[i].classList.add('class', 'alphabet-visited');
            alphabetBtns[i].style.pointerEvents = 'none';
        }
    }
}


//Check if the alphabet exist in words
function checkAlphabetExistInWord(selectedChar) {
    setAlphabetVisited(selectedChar);
    if (selectedWord.toLowerCase().includes(selectedChar)) {

        //Get all occurrence of the alphabet present in the guess word
        let indexOfChar = selectedWord.split("").map((item, index) => {
            if (item === selectedChar) {
                return index;
            }
        }).filter((item) => item !== undefined);

        //Reveal letter if present in guess word
        let wordGuessComplete = true;
        let alphabetsInGuessWord = document.querySelectorAll('.alphabet-guess-word');
        for (let i = 0; alphabetsInGuessWord[i]; ++i) {
            if (indexOfChar.includes(i)) {
                alphabetsInGuessWord[i].innerText = selectedChar;
            }
            let alphabetInWord = alphabetsInGuessWord[i].innerText;
            if (!alphabetArr.includes(alphabetInWord) && alphabetInWord !== '-') {
                wordGuessComplete = false;
            }
        }
        if (wordGuessComplete) {
            score = score + 1;
            currentLives = initialLives;
            if (score > highscore) {
                highscore = score;
            }
            displayRemainingLivesForHangman(currentLives, score, highscore);
            setTimeout(function () {
                reset()
            }, 500);

        }

    } else {
        //draw hangman if lives left or gameover
        if (currentLives > 0) {
            currentLives = currentLives - 1;
            order = (initialLives - currentLives) - 1;
            displayRemainingLivesForHangman(currentLives, score, highscore);
            drawOrder[order](hangmanCanvas);
        }
        if (currentLives === 0) {
            setTimeout(function () {
                gameOver();
            }, 500);
        }
    }
}

//draw head
function drawHead(hangmanCanvas) {
    let context = getContextForCanvas(hangmanCanvas);
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
}

//draw body
function drawBody(hangmanCanvas) {
    let context = getContextForCanvas(hangmanCanvas);
    draw(context, 60, 90, 60, 35);
}

//draw left hand
function drawLeftHand(hangmanCanvas) {
    let context = getContextForCanvas(hangmanCanvas);
    draw(context, 30, 60, 60, 45);
}

//draw right hand
function drawRightHand(hangmanCanvas) {
    let context = getContextForCanvas(hangmanCanvas);
    draw(context, 90, 60, 60, 45);
}

//draw left leg
function drawLeftLeg(hangmanCanvas) {
    let context = getContextForCanvas(hangmanCanvas);
    draw(context, 35, 110, 60, 90);
}

//draw right leg
function drawRightLeg(hangmanCanvas) {
    let context = getContextForCanvas(hangmanCanvas);
    draw(context, 85, 110, 60, 90);
}

//draw order
let drawOrder = [drawHead, drawBody, drawLeftHand, drawRightHand, drawLeftLeg, drawRightLeg];

//Create random indexes to show some chars intially to make it easy
function getRandomIndexes(str) {
    let indexList = [];
    for (let i = 1; i <= parseInt((str.length / 2)) - 1; i++) {
        indexList.push(Math.floor(Math.random() * str.length));
    }
    return indexList;
}


//Creating guess word
function createGuessWord() {
    let selectedWord = getRandomWord();
    let randomIndex = getRandomIndexes(selectedWord);
    let guessWord = selectedWord.split("").map((char, index) => {
        if ((char === '-') || randomIndex.includes(index)) {
            return char;
        } else {
            return '_';
        }
    })
    guessWord.forEach((item) => {
        let alphabetsInGuessWord = getAlphabetsInGuessWord();
        alphabetsInGuessWord.innerHTML = item;
        alphabetGuessWordContainer.appendChild(alphabetsInGuessWord);
    })

    return alphabetGuessWordContainer;

}

//Create hangman canvas 
let hangmanCanvas = createDomElement('canvas', 'hangman-canvas', 'hangman-canvas', 'hangman-canvas');

//Create context for canvas
function getContextForCanvas(canvas) {
    let context = canvas.getContext('2d');
    return context;
}


//Draw hanman on canvas
function createHangmanOnCanvas(hangmanCanvas) {
    let context = getContextForCanvas(hangmanCanvas);
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
    draw(context, 0, 150, 150, 150);
    draw(context, 10, 0, 10, 600);
    draw(context, 0, 5, 70, 5);
    draw(context, 60, 5, 60, 15);
    return hangmanCanvas;
}

//draw on canvas
function draw(context, pathFromx, pathFromy, pathTox, pathToy) {
    context.moveTo(pathFromx, pathFromy);
    context.lineTo(pathTox, pathToy);
    context.stroke();
}

//Display Remaining lives for hangman
function displayRemainingLivesForHangman(remainingLives, score, highscore) {
    hangmanLivesDisplay.innerText = `Your Lives Left : ${remainingLives} :: Current Score : ${score} :: High Score ${highscore}`;
}


//Create Elements and set properties classname , Id, name
function createDomElement(elem, elemClass = '', elemName = '', elemId = '') {
    let element = document.createElement(elem);
    (elemClass !== '') && element.setAttribute('class', elemClass);
    (elemName !== '') && element.setAttribute('name', elemName);
    (elemId !== '') && element.setAttribute('id', elemId);
    return element;
}


//handle gameover
function gameOver() {
    alphabetContainer.style.display = 'none';
    hangmanLivesDisplay.style.display = 'none';
    alphabetGuessWordContainer.style.display = 'none';
    hangmanStartContainer.style.display = 'grid';
    hangmanStartPageMessage.innerHTML = `<h3><b>GameOver</b>:The Word was <b>"${selectedWord}"</b></h3><h5>Your score : ${score}</h5>`;
    hangmanStartPageMessage.style.display = 'flex';
    document.body.style = {
        'background-image': 'linear-gradient(to bottom,rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.7)),url("hangman-image.jpg")',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
    }
}

//Create Complete Hangman for Start
function hangmanStart(hangmanCanvas) {
    hangmanCanvas.classList.add('home-page-hangman-canvas');
    let hangman = createHangmanOnCanvas(hangmanCanvas);
    drawHead(hangmanCanvas);
    drawBody(hangmanCanvas);
    drawLeftHand(hangmanCanvas);
    drawRightHand(hangmanCanvas);
    drawLeftLeg(hangmanCanvas);
    drawRightLeg(hangmanCanvas);
    let wrapperDiv = createDomElement('div', 'canvas-wrapper-div');
    wrapperDiv.append(hangman)
    return wrapperDiv;
}


//Appending all the created elements
hangmanStartContainer.append(hangmanStartPageMessage, hangmanStartBtn);
hangmanCanvasContainer.append(createHangmanOnCanvas(hangmanCanvas));
hangmanTitleContainer.append(hangmanTitle, hangmanHighScore);
alphabetContainer.append(alphabetSelectTitle, createAlphabetButton(), hangmanCanvasContainer);
hangmanContainer.append(hangmanTitleContainer, alphabetContainer, hangmanLivesDisplay, createGuessWord(), hangmanStartContainer)
document.body.append(hangmanContainer);