import { deleteTimer } from "./countdown-timers.js";
import { formModalEditTimer } from "./countdown-timers.js";
import { formModalRestartTimer } from "./countdown-timers.js";
import { getTimer } from "./countdown-timers.js";
import { nodeTimers } from "./countdown-timers.js";
import { nodeTimersSection } from "./countdown-timers.js";
import { pauseSong } from "./countdown-timers.js";
import { songAudioKabaret } from "./countdown-timers.js";
import { songAudioBeethoven } from "./countdown-timers.js";
import { startNewTimer } from "./countdown-timers.js";
import { timersDescription } from "./countdown-timers.js";
import { timersSongs } from "./countdown-timers.js";
import { timersTimes } from "./countdown-timers.js";
import { overlay } from "./countdown-timers.js";
///////////////////////////////////////////Below all global variables///////////////////////////////////////////
const btnFormCancel = document.querySelector(".main__form__btn-cancel");
const btnFormStart = document.querySelector(".main__form__btn-start");
const btnFormOk = document.querySelector(".main__form__btn-ok");
const btnFormRestartTimer = document.querySelector(
  ".main__form__btn-restart-timer"
);
const descriptionInput = document.querySelector('input[id="description"]');
const minutesInput = formModalEditTimer.querySelector('input[id="minutes"]');
const secondsInput = formModalEditTimer.querySelector('input[id="seconds"]');
const selectSongInput = formModalEditTimer.querySelector("select");

let timerNumber;
///////////////////////////////////////////Below All adEventListener///////////////////////////////////////////
btnFormCancel.addEventListener("click", hideForm);

btnFormOk.addEventListener("click", function (event) {
  const timerNumber = btnFormRestartTimer.dataset.timerNumber;
  resetTimer(event, timerNumber);
});

btnFormRestartTimer.addEventListener("click", function (event) {
  const timerNumber = btnFormRestartTimer.dataset.timerNumber;
  resetTimer(event, timerNumber);
  startNewTimer(event, "main__form__btn-restart-timer", timerNumber);
});

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
  timersDescription[timerNumber] = descriptionInput.value;
  hideForm();
});

nodeTimersSection.addEventListener("click", function (event) {
  if (!event.target.classList.contains("main__section__btn-edit")) return; 
  formModalEditTimer.classList.remove("hidden");
  overlay.classList.remove("hidden");
  timerNumber = getTimer(event);
});

overlay.addEventListener("click", hideForm);
///////////////////////////////////////////Below All function declarations///////////////////////////////////////////
function hideForm() {
  formModalEditTimer.classList.add("hidden");
  formModalRestartTimer.classList.add("hidden");
  overlay.classList.add("hidden");
}

function resetTimer(event, timerNumber) {
  event.preventDefault();
  deleteTimer(timerNumber);
  pauseSong(timerNumber);
  nodeTimers[timerNumber].querySelector(
    ".main__section__timer-time"
  ).textContent = timersTimes[timerNumber];
  hideForm();
}
