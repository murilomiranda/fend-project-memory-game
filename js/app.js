
// open cards from click action
let openCards = [];

// number of matches
let numberMatches = 0;

// number of games
let numberGames = 0;
let infoGames = [];

// add event listener at "deck" class
const deck = document.querySelector(".deck");

// when one clicks on one card
deck.addEventListener('click', cardSelection);

// modal box pop up
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

// one can play when the page is completely loaded
document.addEventListener('DOMContentLoaded', startGame);

// Display the cards on the page
function startGame() {
  // Create a list that holds all of your cards
  const cards = document.querySelectorAll(".card");

  // shuffle the list of cards using the provided "shuffle" method below
  const newCards = shuffle(Array.from(cards));

  // remove cards from deck
  cards.forEach(function(card) {
    card.parentElement.removeChild(card);
  });

  // loop through each card and create its HTML
  // add each card's HTML to the page
  newCards.forEach(function(card) {
    deck.innerHTML = deck.innerHTML + card.outerHTML;
  });

  // reset
  moves = 0;
  totalSeconds = 0;
  numberMatches = 0;
  openCards = [];
  numberStars = 3;
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

// Number of stars
let numberStars = 3;
const starClass = document.querySelector(".stars");

// Timer
let totalSeconds = 0;
const timer = document.querySelector(".timer");
let countTime;

function timeRun(){
  countTime = setInterval(function() {
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
  if(openCards.length === 2) {
    // if the cards match
    if(openCards[0] === openCards[1]) {
      //lock the cards in the open position
      const matchCards = document.getElementsByClassName(openCards[0]);
      Array.from(matchCards).forEach(function(card){
        card.parentElement.classList.remove("show");
        card.parentElement.classList.remove("open");
        card.parentElement.classList.add("match");
      });
      numberMatches = numberMatches + 1;

      //clean the openCards array
      openCards = [];

    }else { // cards do not match
      addNomatchClass();
      setTimeout(noMatch, 800);
    }

    // increment the move counter and display it on the page
    moves = moves + 1;

    if(moves === 1) {
      totalSeconds = 0;
      timeRun();
    }
    const numberMoves = document.querySelector(".moves");
    numberMoves.textContent = moves;

    //calculate the number of stars
    countStars();

    // Check if all cards are matched
    if(numberMatches === 8) {
      setTimeout(endGame, 1100);
    }
  }
}

// add nomatch class when two cards do not match
function addNomatchClass() {
  const noMatchCard = document.querySelectorAll(".show");
  Array.from(noMatchCard).forEach(function(card) {
    card.classList.add("nomatch");
  });
}

function noMatch() {
  const noMatchCard = document.querySelectorAll(".show");
  Array.from(noMatchCard).forEach(function(card) {
    card.classList.remove("show");
    card.classList.remove("open");
    card.classList.remove("nomatch");
  });

  //clean the openCards array
  openCards = [];
}

// count the number of STARS
function countStars() {
  if(moves > 12 && moves <= 18) {
    if(numberStars === 3) {
      numberStars = 2;
      starClass.removeChild(starClass.firstElementChild);
    }
  } else if(moves > 18 && moves <= 26) {
    if(numberStars === 2) {
      numberStars = 1;
      starClass.removeChild(starClass.firstElementChild);
    }
  }
}

function cardSelection(evt) {
  if(openCards.length < 2){
    let target = evt.target;
    // Add classes "show" and "open" to a selected card
    if(target.nodeName === "LI") {
      if(!target.classList.contains("show") && !target.classList.contains("match")) {
        target.classList.add("show");
        target.classList.add("open");
        openCards.push(target.firstElementChild.classList[1]);
      }
    } else if(target.nodeName === "I") {
      if(!target.parentElement.classList.contains("show") && !target.parentElement.classList.contains("match")) {
        target.parentElement.classList.add("show");
        target.parentElement.classList.add("open");
        openCards.push(target.classList[1]);
      }
    }
    // console.log(evt);
    isMatch();
  }
}

// End the game
function endGame() {
  clearInterval(countTime);
  modal.classList.add("show-modal");

  function toggleModal() {
      modal.classList.remove("show-modal");
  }

  infoGames = [numberGames, moves, timer.innerHTML, numberStars];
  finalTime = timer.innerHTML.split(":");
  minute = parseInt(finalTime[0]) > 1 ? parseInt(finalTime[0]) + " minutes" : parseInt(finalTime[0]) + " minute";
  second = parseInt(finalTime[1]) > 1 ? parseInt(finalTime[1]) + " seconds" : parseInt(finalTime[1]) + "second";
  finalTime = parseInt(finalTime[0]) > 0 ? minute + " and " + second : second;
  closeButton.addEventListener("click", toggleModal);
  document.querySelector("span#moves").innerHTML = moves > 1 ? moves + " moves" : moves + " move";
  document.querySelector("span#time").innerHTML = finalTime;
  document.querySelector("span#star").innerHTML = numberStars > 1 ? numberStars + " stars": numberStars + " star";
}

// Play the Game again
const btn_play = document.querySelector('.play-again');
btn_play.addEventListener('click', playAgain);

function playAgain() {
  numberGames = numberGames + 1;
  resetGame();

  if(numberGames === 1) {
    // create the head of table
    const getTable = document.querySelector(".table");
    getTable.firstElementChild.remove();
    getTable.innerHTML = "<table class='score-table'><thead><tr><th>Try</th><th>Moves</th><th>Time</th><th>Stars</th></tr></thead><tbody></tbody></table>";
  }

  const bodyTable = document.querySelector("tbody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = "<td>"+ infoGames[0] +"</td><td>"+ infoGames[1] +"</td><td>"+ infoGames[2] +"</td><td>"+ infoGames[3] +"</td>";
  bodyTable.appendChild(newRow);

  //restart Game
  startGame();
}

// Restart the Game
const btn_restart = document.querySelector('.restart');
btn_restart.addEventListener('click', restartGame);

function restartGame() {
  numberGames = 0;
  const getTable = document.querySelector(".table");
  getTable.firstElementChild.remove();
  getTable.innerHTML = "<span>You could compare your scores if you play more.</span>";

  resetGame();
  //restart Game
  startGame();
}

// Reset the Game
function resetGame(){
  modal.classList.remove("show-modal");

  // reset up the timer
  clearInterval(countTime);
  timer.innerHTML = "00:00";

  // reset up the cards
  const cardClass = document.querySelectorAll(".card");
  Array.from(cardClass).forEach(function(card) {
    card.classList.remove("match");
    card.classList.remove("show");
    card.classList.remove("open");
  });

  // reset up the number of moves
  const numberMoves = document.querySelector(".moves");
  numberMoves.textContent = 0;

  //reset up the number of stars
  for(let i = numberStars; i < 3; i++) {
    const oneStar = document.createElement("li");
    oneStar.innerHTML = '<i class="fa fa-star"></i>';

    starClass.appendChild(oneStar);
  }
}
