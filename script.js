"use strict";
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");

const displayInterface = (() => {
  const displayResults = (results) => {
    document.querySelector("#results").innerHTML = results;
  };

  return {
    displayResults,
  };
})();

// displayInterface test
console.log("Testing displayResults function:");
displayInterface.displayResults("Player X wins!");

//Gameboard Module
const gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const renderBoard = () => {
    const gameboardContainer = document.querySelector("#gameboard-container");
    gameboardContainer.innerHTML = "";

    board.forEach((cellValue, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = cellValue;

      cell.addEventListener("click", () => {});
      gameboardContainer.appendChild(cell);
    });
  };

  // Function to start the game
  const startGame = () => {
    // Initialize the game state (e.g., set game over flag to false, current player index, game board)
    // Render the initial game board
    game.start();
    renderBoard();
  };

  return {
    startGame,
  };
})();

//game module
const game = (() => {
  let players = [];
  let currentPlayer;
  let gameOver;

  const playerSetup = () => {
    const playerXInput = document.querySelector("#player1");
    const playerOInput = document.querySelector("#player2");

    players = [
      {
        name: playerXInput.value,
        mark: "X",
        input: playerXInput,
      },
      {
        name: playerOInput.value,
        mark: "O",
        input: playerOInput,
      },
    ];
  };

  const start = () => {
    playerSetup();
    currentPlayer = players[0];
    console.log("Players:", players);
    console.log("Current Player:", currentPlayer);
  };

  return {
    start,
  };
})();

startButton.addEventListener("click", gameboard.startGame);
