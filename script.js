"use strict";

// Select buttons from the DOM
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");

// Module to manage the display of game results
const displayInterface = (() => {
  const displayResults = (results) => {
    document.querySelector("#results").textContent = results;
  };

  return {
    displayResults,
  };
})();

// Module to manage the display of player turns
const displayPlayerTurn = (() => {
  const displayTurn = (turn) => {
    document.querySelector("#player-turn").textContent = turn;
  };

  return {
    displayTurn,
  };
})();

// Module for managing the game board
const gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const renderBoard = () => {
    const gameboardContainer = document.querySelector("#gameboard-container");
    gameboardContainer.innerHTML = "";

    board.forEach((cellValue, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = cellValue;

      cell.addEventListener("click", () => {
        game.handleClick(index); // Handle cell click
      });

      gameboardContainer.appendChild(cell);
    });
  };

  const startGame = () => {
    const playerXInput = document.querySelector("#player1");
    const playerOInput = document.querySelector("#player2");
    const errorElement = document.querySelector("#game-start-error");

    // Validate player names
    if (playerXInput.value === "" || playerOInput.value === "") {
      errorElement.textContent = "Please Enter Names For Players 1 and 2";
      return;
    }

    errorElement.textContent = ""; // Clear error message
    game.start();
    renderBoard(gameboard.board, game.handleClick);
    const gameboardContainer = document.querySelector("#gameboard-container");
    gameboardContainer.style.display = "grid";
  };

  return {
    startGame,
    renderBoard,
    board,
  };
})();

// Module for managing the game logic
const game = (() => {
  let players = [];
  let currentPlayer;
  let gameOver = false;

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

  const checkWinner = (board) => {
    const winningConditions = [
      [0, 1, 2], // Row
      [3, 4, 5], // Row
      [6, 7, 8], // Row
      [0, 3, 6], // Column
      [1, 4, 7], // Column
      [2, 5, 8], // Column
      [0, 4, 8], // Diagonal
      [2, 4, 6], // Diagonal
    ];

    // Check each winning condition
    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return currentPlayer; // Return the winning player (X or O)
      }
    }

    return null; // No winner
  };

  const start = () => {
    playerSetup();
    currentPlayer = players[0];
    displayPlayerTurn.displayTurn(`${currentPlayer.name}'s Turn`);
  };

  const restartGame = () => {
    for (let i = 0; i < 9; i++) {
      gameboard.board[i] = ""; // Clear each cell's value
    }
    gameboard.renderBoard();
    displayPlayerTurn.displayTurn("");
    displayInterface.displayResults("");
    gameOver = false;

    const playerXInput = document.querySelector("#player1");
    const playerOInput = document.querySelector("#player2");
    playerXInput.value = "";
    playerOInput.value = "";
    players = [];
    currentPlayer = null;
    const gameboardContainer = document.querySelector("#gameboard-container");
    gameboardContainer.style.display = "none";
  };

  const handleClick = (index) => {
    if (gameOver) return;

    if (gameboard.board[index] === "") {
      gameboard.board[index] = currentPlayer.mark;
      gameboard.renderBoard();

      const winner = checkWinner(gameboard.board);
      if (winner) {
        displayInterface.displayResults(`${winner.name} is the winner!`);
        displayPlayerTurn.displayTurn(`Game Over`);
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        displayPlayerTurn.displayTurn(`${currentPlayer.name}'s Turn`);
      }

      const tieGame = gameboard.board.every((cell) => cell !== "");
      if (tieGame) {
        displayInterface.displayResults(`It's a tie!`);
        displayPlayerTurn.displayTurn(`Game Over`);
        gameOver = true;
      }
    }
  };

  return {
    start,
    handleClick,
    restartGame,
  };
})();

// Event listeners for buttons
startButton.addEventListener("click", gameboard.startGame);
restartButton.addEventListener("click", game.restartGame);
