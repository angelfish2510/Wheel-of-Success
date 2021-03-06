const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const overlayContainer = document.querySelector('.main-container div'); 
const show = document.getElementsByClassName('show');
const letters = document.getElementsByClassName('letter');
const scoreboardLives = document.querySelectorAll('.tries img');

let missed = 0;
let won;
let newGame;


//create phrases and convert to arrays of letters
const myPhrases = ['ohana means family',
                 'You better Belize it',
                 'it is not easy being green',
                 'Just a spoon full of sugar helps the medicine go down',
                 'Always take the time to stop and smell the roses'
];


function getRandomPhrasesAsArray(arr) {
    const randomNumber = Math.floor( Math.random() * arr.length );
    const randomPhrase = arr[randomNumber].toLowerCase();
    const charactersInPhrase = randomPhrase.split('');
    console.log(charactersInPhrase);
    return charactersInPhrase;
}

let charactersInRandomPhrase = getRandomPhrasesAsArray(myPhrases);



// allow user to hide alerts
    // create button
const divForHideAlerts = document.createElement('div');
divForHideAlerts.style.display = 'flex, align-items';

const headerMainPage = document.querySelector('.header'); 

const hideAlerts = document.createElement('label');
hideAlerts.textContent = 'Check the Box to Hide Alerts';
hideAlerts.style.color = ('purple');
hideAlerts.style.fontSize = 'xx-large';

headerMainPage.appendChild(divForHideAlerts);
divForHideAlerts.appendChild(hideAlerts);

let checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.style.width = '50px';
checkbox.style.height = '50px';
checkbox.style.marginLeft = '40px';

hideAlerts.appendChild(checkbox);

    // create default to revert to
const originalAlert = window.alert;

    // event listener for clicking and unclicking the new button
headerMainPage.addEventListener('change', (e) => {
    let checkbox = e.target
    if(checkbox.checked) {
        window.alert = function() {};
    } else {
        window.alert = originalAlert;
    }
});



// display gameboard according to randomly selected phrase
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        console.log( li.textContent = arr[i] );
        phrase.appendChild(li);
            if (arr[i] !== ' ') {
        li.classList.add('letter');
            } else {
            li.classList.add('space');
        }
    }
}

addPhraseToDisplay(charactersInRandomPhrase);



// check for matches between guessed letter and gameboard phrase
function checkLetter(button) {
    const liElements = document.querySelectorAll('li');
    let match = null;
    for (let i = 0; i < liElements.length; i++) {
        if ( button.innerText === liElements[i].innerText ) {
            liElements[i].classList.add("show");
            match = button.innerText;
        }
    }
    return match;
}


// check for end of game
const checkWin = () => {
    if (show.length === letters.length) {
        won = 'yes';
        overlayContainer.className = 'win';
        overlay.style.display = 'flex';
        document.querySelector('.title').innerText = 'Wheel of Success - And You Are Successful!  Congratulations on Winning!';
        startButton.innerText = 'We have success! Click to play again.';
        startButton.addEventListener('click', (e) => {
            playAgain();
        })
    }   else if (missed > 4) {
            overlayContainer.className = 'lose';
            overlay.style.display = 'flex';
            document.querySelector('.title').innerText = 'Wheel of Success - Not so successful this time!';
            startButton.innerText = 'Try Again';
            won = 'no';  
            startButton.addEventListener('click', (e) => {
                playAgain();
            })
        }
    return won;
};



//reset gameboard, keyboard, hearts
function playAgain () {

    missed = 0;
    phrase.textContent = ' ';
    
    const selectedLetters = document.querySelectorAll(".chosen");    
    for ( let i = 0; i < selectedLetters.length; i++ ) {
        selectedLetters[i].disabled = false;
        selectedLetters[i].classList.remove("chosen");
    };

    for (let i = 0; i < scoreboardLives.length; i++) {
        scoreboardLives[i].src = "images/liveHeart.png";
    };

    let charactersInRandomPhrase2 = getRandomPhrasesAsArray(myPhrases);
    addPhraseToDisplay(charactersInRandomPhrase2);

}


// initialize game
startButton.addEventListener('click', (e) => {
    overlay.style.display = 'none';
});

qwerty.addEventListener('click', (e) => {
    let button = e.target;
    let livesRemaining;
    console.log(button.innerText);
    if ( button.tagName !== 'BUTTON' ) {
        alert("Please select a letter.");
    } else if (button.className === "chosen") {
        button.disabled = true;
        alert(`The letter ${button.innerText} has already been selected.  Please select a new letter to continue playing.`);
    } else {
        button.classList.add("chosen");
        let letterFound = checkLetter(button);
        if (letterFound === null) {    
            missed++;
            scoreboardLives[(missed-1)].src = "images/lostHeart.png";
            checkWin();
            if (missed > 0 && missed < 4) {
                livesRemaining = 5 - missed;
                alert(`Darn... you lost a life, but I believe in you!  You still have ${livesRemaining} more tries... you can do it!`);
            } else if  (missed === 4 ) {
                livesRemaining = 5 - missed;
                alert(`Darn... you lost a life, but I believe in you!  You still have ${livesRemaining} more try... you can do it!`);
               }
            } else {
            checkWin();
            if (won === 'yes') {
                return;
            }
            livesRemaining = 5 - missed;
            alert(`Way to go!  You chose wisely AND you still have ${livesRemaining} more lives... you can do it!  Select another letter to continue playing.`);
        }
      }
});