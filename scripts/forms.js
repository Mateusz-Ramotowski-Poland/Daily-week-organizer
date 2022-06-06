import { getTimer } from "./countdown-timers.js";
import { nodeTimers } from "./countdown-timers.js";
import { nodeTimersSection } from "./countdown-timers.js";
import { songAudioKabaret } from "./countdown-timers.js";
import { songAudioBeethoven } from "./countdown-timers.js";
import { startNewTimer } from "./countdown-timers.js";
import { showTime } from "./countdown-timers.js";
import { timersSongs } from "./countdown-timers.js";
import { timersTimes } from "./countdown-timers.js";

///////////////////////////////////////////Below all global variables///////////////////////////////////////////
const btnFormCancel = document.querySelector(".main__form__btn-cancel");
const btnFormStart = document.querySelector(".main__form__btn-start");
const descriptionInput = document.querySelector('input[id="description"]');
const formModal = document.querySelector(".main__form--modal");
const minutesInput = formModal.querySelector('input[id="minutes"]');
const overlay = document.querySelector(".main__form__overlay");
const secondsInput = formModal.querySelector('input[id="seconds"]');
const selectSongInput = formModal.querySelector("select");

let timerNumber;
///////////////////////////////////////////Below All adEventListener///////////////////////////////////////////
btnFormCancel.addEventListener("click", hideForm);

btnFormStart.addEventListener("click", function (event) {
  if (!(minutesInput.checkValidity() && secondsInput.checkValidity())) {
    minutesInput.reportValidity();
    secondsInput.reportValidity();
    return;
  }
  const minutes = minutesInput.value.padStart(2, "0");
  const seconds = secondsInput.value.padStart(2, "0");
  nodeTimers[timerNumber].querySelector(
    ".main__section__timer-time"
  ).textContent = `${minutes}:${seconds}`;

  nodeTimers[timerNumber].querySelector(
    ".main__section__timer-description"
  ).textContent = `${descriptionInput.value}`;

  selectSongInput.value === "Piosenka jest dobra na wszystko"
    ? (timersSongs[timerNumber] = songAudioKabaret)
    : (timersSongs[timerNumber] = songAudioBeethoven);

  startNewTimer(event, "main__form__btn-start", timerNumber);
  timersTimes[timerNumber] = `${minutes}:${seconds}`;
  hideForm();
});

nodeTimersSection.addEventListener("click", function (event) {
  if (!event.target.classList.contains("main__section__btn-edit")) return; //event delegation
  formModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  timerNumber = getTimer(event);
});

overlay.addEventListener("click", hideForm);
///////////////////////////////////////////Below All function declarations///////////////////////////////////////////
function hideForm() {
  formModal.classList.add("hidden");
  overlay.classList.add("hidden");
}
