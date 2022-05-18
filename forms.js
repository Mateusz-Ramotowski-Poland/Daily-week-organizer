import { nodeTimersSection } from "./countdown-timers.js";
import { getTimer } from "./countdown-timers.js";
import { nodeTimers } from "./countdown-timers.js";
import { timersSongs } from "./countdown-timers.js";
import { songAudioKabaret } from "./countdown-timers.js";
import { songAudioBeethoven } from "./countdown-timers.js";

const btnFormStart = document.querySelector(".form-start");
const btnFormCancel = document.querySelector(".form-cancel");

const formModal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const minutesInput = formModal.querySelector('input[id="minutes"]');
const secondsInput = formModal.querySelector('input[id="seconds"]');
const descriptionInput = formModal.querySelector('input[id="description"]');
const selectSongInput = formModal.querySelector("select");

let timerNumber;
function hideForm() {
  formModal.classList.add("hidden");
  overlay.classList.add("hidden");
}

nodeTimersSection.addEventListener("click", function (event) {
  if (!event.target.classList.contains("btnEdit")) return;
  formModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  timerNumber = getTimer(event);
  console.log(timerNumber);
});
overlay.addEventListener("click", hideForm);
btnFormCancel.addEventListener("click", hideForm);
btnFormStart.addEventListener("click", function () {
  console.log(typeof minutesInput.value, minutesInput.value);
  console.log(typeof secondsInput.value, secondsInput.value);
  console.log(typeof descriptionInput.value, descriptionInput.value);

  hideForm();
  const minutes = minutesInput.value.padStart(2, "0");
  const seconds = secondsInput.value.padStart(2, "0");
  nodeTimers[timerNumber].querySelector(
    ".timer-time"
  ).textContent = `${minutes}:${seconds}`;
  nodeTimers[timerNumber].querySelector(
    ".description"
  ).textContent = `${descriptionInput.value}`;

  selectSongInput.value === "Piosenka jest dobra na wszystko"
    ? (timersSongs[timerNumber] = songAudioKabaret)
    : (timersSongs[timerNumber] = songAudioBeethoven);
  console.log(selectSongInput.value);
  console.log(timersSongs);
});
