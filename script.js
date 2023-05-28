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

function displayPlayerNames() {
  const player1NameDisplay = document.querySelector(".player1-name-display");
  const player2NameDisplay = document.querySelector(".player2-name-display");

  player1NameDisplay.textContent = playerNames[0].value;
  player2NameDisplay.textContent = playerNames[1].value;
}

submitNameBtn.addEventListener("click", (event) => {
  event.preventDefault();
  displayPlayerNames();
  modal.close();
});

// Shows modal
startButton.addEventListener("click", () => {
  modal.showModal();
});

closeModalBtn.addEventListener("click", (event) => {
  modal.close();
});
