"use strict";
const modal = document.querySelector(".modal");
const startButton = document.querySelector(".start-game-btn");
const submitNameBtn = document.querySelector(".submit-name-btn");
const closeModalBtn = document.querySelector(".close-modal-btn");

// Shows modal
startButton.addEventListener("click", () => {
  modal.showModal();
});

closeModalBtn.addEventListener("click", (event) => {
  modal.close();
});
