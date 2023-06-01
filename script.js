"use strict";
const modal = document.querySelector(".modal");
const startButton = document.querySelector(".start-game-btn");
const submitNameBtn = document.querySelector(".submit-name-btn");
const closeModalBtn = document.querySelector(".close-modal-btn");

//Array to store player names
let playerNames = [];
let player1Name = document.getElementById("name1");
let player2Name = document.getElementById("name2");
playerNames.push(player1Name);
playerNames.push(player2Name);

//Function retrieve and add player names to DOM
function displayPlayerNames() {
  const player1NameDisplay = document.querySelector(".player1-name-display");
  const player2NameDisplay = document.querySelector(".player2-name-display");

  player1NameDisplay.textContent = playerNames[0].value;
  player2NameDisplay.textContent = playerNames[1].value;
}

//Submit button to add names to DOM
submitNameBtn.addEventListener("click", (event) => {
  event.preventDefault();
  displayPlayerNames();
  modal.classList.remove("open");
  modal.close();
});

// Shows modal button
startButton.addEventListener("click", () => {
  modal.classList.add("open");
  modal.showModal();
});

//Close modal button
closeModalBtn.addEventListener("click", (event) => {
  modal.classList.remove("open");
  modal.close();
});

//Module to build game board
const gameBoard = (function () {
  //Private variables
  let board = [];

  //Private function to initialize the game board
  function initializeBoard() {
    let board = Array(9).fill(""); //Creates an array of 9 empty cells
  }

  //Public function to get the current game baord
  function getBoard() {
    return board;
  }

  // Other public functions:

  return {
    initializeBoard,
    getBoard,
  };
})();
