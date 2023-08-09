"use strict";
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");

const displayInterface = (() => {
  const displayResults = (results) => {
    document.querySelector("#results").textContent = results;
  };

  return {
    displayResults,
  };
})();

// displayInterface test
// console.log("Testing displayResults function:");
// displayInterface.displayResults("Player X wins!");

//Gameboard Module
const gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const renderBoard = () => {
    // Accept the board array as a parameter
    const gameboardContainer = document.querySelector("#gameboard-container");
    gameboardContainer.innerHTML = "";

    board.forEach((cellValue, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = cellValue;

      cell.addEventListener("click", () => {
        game.handleClick(index); // Pass the clicked cell's index to handleClick
      });

      gameboardContainer.appendChild(cell);
    });
  };

  // Function to start the game
  const startGame = () => {
    // Initialize the game state (e.g., set game over flag to false, current player index, game board)
    // Render the initial game board
    game.start();
    renderBoard(gameboard.board, game.handleClick); // Pass the board array to renderBoard
    const gameboardContainer = document.querySelector("#gameboard-container");
    gameboardContainer.style.display = "grid";
  };

  return {
    startGame,
    renderBoard,
    board, // Expose the board array for access outside the module
  };
})();

//game module
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
    // Define all possible winning combinations
    const winningConditions = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left to bottom-right
      [2, 4, 6], // Diagonal from top-right to bottom-left
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
    console.log("Players:", players);
    console.log("Current Player:", currentPlayer);
  };

  const restartGame = () => {
    for (let i = 0; i < 9; i++) {
      gameboard.board[i] = ""; // Clear each cell's value in the board array
    }
    gameboard.renderBoard(); // Render the updated game board
    displayInterface.displayResults(""); // Clear any displayed messages
    gameOver = false; // Reset the game state

    // Clear input fields
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
    // This function will handle the click event for a cell with the given index
    // You can implement the logic to update the game state, check for a winner, etc.

    if (gameOver) return;

    if (gameboard.board[index] === "") {
      gameboard.board[index] = currentPlayer.mark;
      gameboard.renderBoard(); // Update the board and re-render it

      //Check for winner after each move
      const winner = checkWinner(gameboard.board);
      if (winner) {
        console.log("Winner", winner);
        displayInterface.displayResults(`${winner.name} is the winner!`);
        gameOver = true;
      } else {
        // Switch players after each click
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        console.log("Current Player:", currentPlayer);
      }

      //Check for tie
      const tieGame = gameboard.board.every((cell) => cell !== "");
      if (tieGame) {
        console.log("It's a tie!");
        displayInterface.displayResults(`It's a tie!`);
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

startButton.addEventListener("click", gameboard.startGame);

restartButton.addEventListener("click", game.restartGame);
