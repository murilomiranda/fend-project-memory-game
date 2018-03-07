const deck = document.querySelector(".deck");

document.addEventListener('DOMContentLoaded', startGame);

// Display the cards on the page
function startGame() {
  // Create a list that holds all of your cards
  const cards = document.querySelectorAll(".card");

  // shuffle the list of cards using the provided "shuffle" method below
  const newCards = shuffle(Array.from(cards));

  // remove cards from deck
  cards.forEach(function(card){
    card.parentElement.removeChild(card);
  });

  // loop through each card and create its HTML
  // add each card's HTML to the page
  newCards.forEach(function(card){
    deck.innerHTML = deck.innerHTML + card.outerHTML;
  });

  moves = 0;
  totalSeconds = 0;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


let openCards = [];

let numberMatches = 0
// let deck = document.querySelector('.deck');
deck.addEventListener('click', cardSelection);


// TIMER
let totalSeconds = 0;
let timer = document.querySelector(".timer");
let countTime;

function timeRun(){
  countTime = setInterval(function(){
    ++totalSeconds;
    timer.innerHTML = pad(parseInt(totalSeconds/60)) + ":" + pad(totalSeconds%60);
  }, 1000);

  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      valString = "0" + valString;
    }
    return valString;
  }
}


function isMatch() {
  // check if there are two cards
  if(openCards.length === 2){
    // if the cards match
    if(openCards[0] === openCards[1]){
      //lock the cards in the open position
      const matchCards = document.getElementsByClassName(openCards[0]);
      Array.from(matchCards).forEach(function(card){
        card.parentElement.classList.remove("show");
        card.parentElement.classList.remove("open");
        card.parentElement.classList.add("match");
      });
      numberMatches = numberMatches + 1;
      if(numberMatches === 8){
        endGame();
      }
    }else{ // cards do not match
      setTimeout(noMatch, 900, openCards[0], openCards[1]);
    }
    // increment the move counter and display it on the page
    moves = moves + 1;
    if(moves == 1) {
      totalSeconds = 0;
      timeRun();
    }
    const numberMoves = document.querySelector(".moves");
    numberMoves.textContent = moves;
    openCards = [];
  }
}

function noMatch(openCard1, openCard2){
  const noMatchCard1 = document.getElementsByClassName(openCard1);
  Array.from(noMatchCard1).forEach(function(card){
    card.parentElement.classList.remove("show");
    card.parentElement.classList.remove("open");
  });
  const noMatchCard2 = document.getElementsByClassName(openCard2);
  Array.from(noMatchCard2).forEach(function(card){
    card.parentElement.classList.remove("show");
    card.parentElement.classList.remove("open");
  });
}

function cardSelection(evt){
  let target = evt.target;
  // Add classes "show" and "open" to a selected card
  if(target.nodeName === "LI" & !target.classList.contains("show")){
    target.classList.add("show");
    target.classList.add("open");
    openCards.push(target.firstElementChild.classList[1]);
  }else if(target.nodeName === "I" & !target.parentElement.classList.contains("show")){
    target.parentElement.classList.add("show");
    target.parentElement.classList.add("open");
    openCards.push(target.classList[1]);
  }
  isMatch();
}

// End the game
function endGame(){
  // deck.removeEventListener('click', cardSelection);
  clearInterval(countTime);
}

// Reset the Game
const btn_restart = document.querySelector('.restart');
btn_restart.addEventListener('click', restartGame);

function restartGame(){
  const matchClass = document.querySelectorAll(".match");
  Array.from(matchClass).forEach(function(card){
    card.classList.remove("match");
  });
  const numberMoves = document.querySelector(".moves");
  numberMoves.textContent = 0;
  startGame();
}
