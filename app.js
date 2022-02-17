const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');

const overlay = document.getElementById('overlay');
const overlayContainer = document.querySelector('.main-container div'); 


let missed = 0;
let lost;
let won;
let newGame;

let show = document.getElementsByClassName('show');
let letters = document.getElementsByClassName('letter');


let scoreboardLives = document.querySelector('#scoreboard ol')
let liveHeart = scoreboardLives.firstChild;
// let liveHeart = document.querySelector('.tries')


//create phrases and convert to arrays of letters

const myPhrases = ['Bunnies are the best',
                 'Belize is incredible',
                 'Apple starts with A',
                 'My children are amazing humans',
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
        lost = 'no';
        won = 'yes';
        overlayContainer.className = 'win';
        overlay.style.display = 'flex';
        document.querySelector('.title').innerText = 'Wheel of Success - And You Are Successful!  Congratulations on Winning!';
        startButton.innerText = 'We have success! Click to play again.';
        startButton.addEventListener('click', (e) => {
            playAgain();
        })
        // const newGame = document.createElement('input');
        // newGame.type = 'button';
        // newGame.innerText = 'Play Again';
        // newGame.className = 'btn__reset';
        // overlayContainer.appendChild(newGame);
        // return newGame;

        // startButton.className = 'btn__startover';
        // overlay.style.display = 'flex';
    // } else if (missed > 1 && missed < 5) {
    //      checkWinLives = missed;
    //      alert(`Darn... you lost a life, but I believe in you!  You still have ${livesRemaining} more tries... you can do it!`);
    //    } else if ( missed = 1 ) {
    //     livesRemaining = 5 - missed;
    //     alert(`Darn... you lost a life, but I believe in you!  You still have ${livesRemaining} more try... you can do it!`);
    }   else if (missed > 4) {
            overlayContainer.className = 'lose';
            overlay.style.display = 'flex';
            document.querySelector('.title').innerText = 'Wheel of Success - Not so successful this time!';
            startButton.innerText = 'Try Again';
            //    startButton.className = 'btn__startover';
            lost = 'yes';
            won = 'no';
            startButton.addEventListener('click', (e) => {
                playAgain();
            })
        }
    return lost;
// return playAgain;
};



//reset gameboard, keyboard, hearts

function playAgain () {

    missed = 0;
    phrase.textContent = ' ';
    
    const selectedLetters = document.querySelectorAll(".chosen");    
    for (let i = 0; i < selectedLetters.length; i++) {
        selectedLetters[i].disabled = false;
        selectedLetters[i].classList.remove("chosen");

    };


    let lostHearts = document.querySelectorAll('.fail');
    for (let i = 0; i < lostHearts.length; i++) {
        lostHearts[i].className = '.tries';
    };

    document.querySelector('.tries img').src = "images/liveHeart.png";

    let charactersInRandomPhrase2 = getRandomPhrasesAsArray(myPhrases);
    addPhraseToDisplay(charactersInRandomPhrase2);

}

// playAgain.addEventListener('click', (e) => {
//     overlay.style.display = 'none';
//     getRandomPhrasesAsArray(myPhrases);
// });
// newGame.addEventListener('submit', (e) => {
//     secondPhrase.style.display = 'flex';
//     phrase.style.display = 'none';
//     secondKeys.style.display = 'flex';
//     qwerty.style.display = 'none';
//     overlay.style.display = 'none';
//     addPhraseToDisplay(charactersInRandomPhrase2);
// });




// initialize game

startButton.addEventListener('click', (e) => {
    overlay.style.display = 'none';
});

qwerty.addEventListener('click', (e) => {
    let button = e.target;
    let livesRemaining;
    console.log(button.innerText);
    if ( button.tagName !== 'BUTTON' || button.className === "chosen" ) {
        button.disabled = true;
        alert("Please select a letter.");
    } else {
        // button.disabled = false;
        button.classList.add("chosen");
        let letterFound = checkLetter(button);
        if (letterFound === null) {    
            missed++;
            document.querySelector('.tries img').src = "images/lostHeart.png";
            document.querySelector('.tries').className = 'fail';
            checkWin();
            if (missed > 0 && missed < 5) {
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
            // missed = missed;
            livesRemaining = 5 - missed;
            alert(`Way to go!  Select another letter to continue playing.  You still have ${livesRemaining} more lives... you can do it!`);
        }
      }
});