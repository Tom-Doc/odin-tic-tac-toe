"use strict";
const modal = document.querySelector(".modal");
const startButton = document.querySelector(".start-game-btn");
const submitNameBtn = document.querySelector(".submit-name-btn");
const closeModalBtn = document.querySelector(".close-modal-btn");
const player1NameDisplay = document.querySelector(".player1-name-display");
const player2NameDisplay = document.querySelector(".player2-name-display");

//Player1 will always start first, so currentPlayer = player1NameDisplay to start the game
let currentPlayer = player1NameDisplay.textContent;

//Array to store player names
let playerNames = [];
let player1Name = document.getElementById("name1");
let player2Name = document.getElementById("name2");
playerNames.push(player1Name);
playerNames.push(player2Name);

//Function retrieve and add player names to DOM
function displayPlayerNames() {
  player1NameDisplay.textContent = playerNames[0].value;
  player2NameDisplay.textContent = playerNames[1].value;
  currentPlayer = player1NameDisplay.textContent;
  gameBoard.togglePlayer(player1NameDisplay, player2NameDisplay);
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
    console.log("Initializing the game board");
    board = Array(9).fill(""); //Creates an array of 9 empty cells
    const cells = document.querySelectorAll(".cell");

    function playerMove() {
      cells.forEach(function (cell) {
        cell.addEventListener("click", function (event) {
          const clickedCell = event.target;
          const dataIndex = clickedCell.getAttribute("data-index");
          console.log("Clicked cell index:", dataIndex);
          // Call other functions or perform desired actions with the clicked cell index
        });
      });
    }

    playerMove();
  }

  //Private function to toggle between players
  function switchPlayer(player1, player2) {
    console.log("Before toggle: currentPlayer =", currentPlayer);
    currentPlayer =
      currentPlayer === player1.textContent
        ? player2.textContent
        : player1.textContent;
    console.log("After toggle: currentPlayer =", currentPlayer);
  }

  //Public function to get the current game board
  function getBoard() {
    return board;
  }

  //Public function to toggle the current player
  function togglePlayer(player1, player2) {
    switchPlayer(player1, player2);
  }

  // Other public functions:

  return {
    initializeBoard,
    getBoard,
    togglePlayer,
  };
})();

gameBoard.initializeBoard();
