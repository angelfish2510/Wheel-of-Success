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


//declare and initialize the phrases array, storing at least five strings that contain only letters and spaces, no punctuation
const myPhrases = ['Bunnies are the best',
                 'Belize is incredible',
                 'Apple starts with A',
                 'My children are amazing humans',
                 'Always take the time to stop and smell the roses'
];

//Add the event listener to the variable startButton
//Hide the overlay by changing its display property

startButton.addEventListener('click', (e) => {
    overlay.style.display = 'none';
});

// Create a getRandomPhraseAsArray function
function getRandomPhrasesAsArray(arr) {
    // Create a variable to store a random number based on the length of the array
    const randomNumber = Math.floor( Math.random() * arr.length );
    const randomPhrase = arr[randomNumber].toLowerCase();
    // Use the variable to select an index inside of the array.
    const charactersInPhrase = randomPhrase.split('');
    console.log(charactersInPhrase);
    return charactersInPhrase;
}

// After you create the getRandomPhraseArray, you will need to "call" it, and pass the phrases array to it.
let charactersInRandomPhrase = getRandomPhrasesAsArray(myPhrases);
let charactersInRandomPhrase2 = getRandomPhrasesAsArray(myPhrases);


// Create an addPhraseToDisplay function that loops through an array of characters. You will need to write it so that it can take any array of letters and add it to the display.
function addPhraseToDisplay(arr) {
//  Inside the loop, for each character in the array,
    for (let i = 0; i < arr.length; i++) {
// ❏ Create a list li item
  const li = document.createElement('li');
// ❏ Put the character inside of the list item
    console.log( li.textContent = arr[i] );
// ❏ Append that list item to the #phrase ul in your HTML
    phrase.appendChild(li);
// ❏ If the character in the array is a letter and not a space, the
// function should add the class “letter” to the list item. If not, add
// the “space” class.
if (arr[i] !== ' ') {
      li.classList.add('letter');
//   } else if (arr[i] === ' ') {
      } else {
      li.classList.add('space');
  }
 }
}

// To use the function, you’ll get the value returned by the getRandomPhraseAsArray, save it to a variable, and pass it to addPhraseToDisplay as an argument.
// let charactersInRandomPhrase = getRandomPhrasesAsArray(myPhrases);
addPhraseToDisplay(charactersInRandomPhrase);




// Create a function “stub” for the checkLetter function
// ❏ Include a parameter in the function head for the button that gets clicked
function checkLetter(button) {
// ❏ Store all of the li elements in a variable inside checkLetter
    const liElements = document.querySelectorAll('li');
// ❏ Create a variable to store if a match is found and give it an initial value of null
    let match = null;
// ❏ Loop through all of the li elements. Remember: arrays start with index 0!
    for (let i = 0; i < liElements.length; i++) {
// ❏ Create a conditional that compares the text of the button parameter to the text of the li at the current index of the loop
        if ( button.innerText === liElements[i].innerText ) {
// ❏ If they match, add the “show” class to the li
        liElements[i].classList.add("show");

// ❏ If they match, store the button text in the match variable
            match = button.innerText;
        }
    }
    return match;
}



const checkWin = () => {
    // let checkWinLives;
    if (show.length === letters.length) {
        lost = 'no';
        won = 'yes';
        overlayContainer.className = 'win';
        overlay.style.display = 'flex';
        document.querySelector('.title').innerText = 'Wheel of Success - And You Are Successful!  Congratulations on Winning!';
        startButton.innerText = 'We have success! Click to play again.';
        playAgain();
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
       }
       else if (missed > 4) {
           overlayContainer.className = 'lose';
           overlay.style.display = 'flex';
           document.querySelector('.title').innerText = 'Wheel of Success - Not so successful this time!';
           startButton.innerText = 'Try Again';
        //    startButton.className = 'btn__startover';
           lost = 'yes';
           won = 'no';
    // } else {

    //     alert()
     }
    return lost;
// return playAgain;

    // function buttonText() {
    //     if (lost === 'yes') {

    //     } else if (lost === 'no') {
    //     }
    // }

    // buttonText();
};




// Start by creating an event listener for the qwerty element that listens for the
// “click” event.
qwerty.addEventListener('click', (e) => {
    let button = e.target;
    let livesRemaining;
    console.log(button.innerText);


    // ❏ Use a conditional to filter out clicks that don’t happen on the buttons or if the
// button already has the “chosen” class
    if ( button.tagName !== 'BUTTON' || button.className === "chosen" ) {
        button.disabled = true;
        alert("Please select a letter.");
    } else {
        // button.disabled = false;
        // ❏ Add the “chosen” class to the button that was pressed.
        button.classList.add("chosen");
// ❏ Call the checkLetter function and store the results in a variable.
        let letterFound = checkLetter(button);
// ❏ If the checkLetter function does not find a letter, remove one of the heart
// images and increment the missed counter

        if (letterFound === null) {    
            missed++;
            document.querySelector('.tries img').src = "images/lostHeart.png";
            document.querySelector('.tries').className = 'fail';
            checkWin();
            if (missed > 1 && missed < 5) {
                livesRemaining = 5 - missed;
                alert(`Darn... you lost a life, but I believe in you!  You still have ${livesRemaining} more tries... you can do it!`);

            } else if  (missed === 4 ) {
                livesRemaining = 5 - missed;
                alert(`Darn... you lost a life, but I believe in you!  You still have ${livesRemaining} more try... you can do it!`);
               }


        // } else if (!win) {

        } else {
            checkWin();
            if (won === 'yes') {
                return;
            }
            let livesRemaining;
            // missed = missed;
            livesRemaining = 5 - missed;
            
            alert(`Way to go!  Select another letter to continue playing.  You still have ${livesRemaining} more tries... you can do it!`);
        // }   else {
            // tryAgain();
        }
      }
});


function playAgain () {

    missed = 0;
    
    phrase.textContent = ' ';

    const selectedLetters = document.querySelectorAll(".chosen");
    selectedLetters.disabled = false;
    selectedLetters.classList.remove("chosen");

    let lostHearts = document.querySelectorAll('.fail');
    lostHearts.className = '.tries';

    addPhraseToDisplay(charactersInRandomPhrase);

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
