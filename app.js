const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');

let missed = 0;

const scoreboard = document.querySelector('#scoreboard');
let liveHeart = scoreboard.querySelectorAll(":scope > ol");


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


// Create an addPhraseToDisplay function that loops through an array of characters. You will need to write it so that it can take any array of letters and add it to the display.
function addPhraseToDisplay(arr) {
//  Inside the loop, for each character in the array,
    for (let i = 0; i <= arr.length; i++) {
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
console.log(addPhraseToDisplay(charactersInRandomPhrase));




// Create a function “stub” for the checkLetter function
// ❏ Include a parameter in the function head for the button that gets clicked
function checkLetter(button) {
// ❏ Store all of the li elements in a variable inside checkLetter
    const liElements = document.querySelectorAll('li');
// ❏ Create a variable to store if a match is found and give it an initial value of null
    let match = null
// ❏ Loop through all of the li elements. Remember: arrays start with index 0!
    for (let i = 0; i <=liElements.length; i++) {
// ❏ Create a conditional that compares the text of the button parameter to the text of the li at the current index of the loop
        if ( button.innerText === liElements[i].innerText ) {
// ❏ If they match, add the “show” class to the li
console.log( liElements[i].classList.add("show") );

// ❏ If they match, store the button text in the match variable
            match = button.innertext;
        // } else if (button.innerText !== liLetters[i].innerText) {
        //     return null;
        }
    }
    return match;
}



// Start by creating an event listener for the qwerty element that listens for the
// “click” event.
qwerty.addEventListener('click', (e) => {
    let button = e.target;
    console.log(button.innerText);


    // ❏ Use a conditional to filter out clicks that don’t happen on the buttons or if the
// button already has the “chosen” class
    if ( button.tagName !== 'BUTTON' || button.className === "chosen" ) {
        button.disabled = true;
        alert("Please select a letter.");
    } else {
        button.disabled = false;
        // ❏ Add the “chosen” class to the button that was pressed.
        button.classList.add("chosen");
// ❏ Call the checkLetter function and store the results in a variable.
        let letterFound = checkLetter(button);
// ❏ If the checkLetter function does not find a letter, remove one of the heart
// images and increment the missed counter
        if (letterFound !== button.innerText) {
            missed++;
            liveHeart.removeChild(liveHeart.childNodes[0]);
        }        
      }
});