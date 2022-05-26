import { minNumberTimers } from "./config.js";
import { maxNumberTimers } from "./config.js";
import { baseTimerTime } from "./config.js";
///////////////////////////////////////////Below all global variables///////////////////////////////////////////
const btnAddTimer = document.querySelector(".main__section__btn-add-timer");
const btnDeleteTimer = document.querySelector(
  ".main__section__btn-delete-timer"
);

export const nodeTimers = document.getElementsByClassName(
  "main__section__timer"
); // return HTML live collection
export const nodeTimersSection = document.querySelector(
  ".main__section__timers"
); // return static NodeList

export const songAudioKabaret = new Audio(
  "/mp3/piosenka-jest-dobra-na-wszystko.mp3"
);
export const songAudioBeethoven = new Audio("/mp3/beethoven-5th-symphony.mp3");

const timersId = []; // array of intervalID, which is a numeric, non-zero value which identifies the timer created
export const timersSongs = []; // you should add default songs
///////////////////////////////////////////Below All adEventListener///////////////////////////////////////////
btnAddTimer.addEventListener("click", function () {
  if (!(nodeTimers.length < maxNumberTimers)) return;

  const emptyNodeTimer = nodeTimers[0].cloneNode(true);
  emptyNodeTimer.querySelector(".main__section__timer-time").textContent =
    baseTimerTime;
  emptyNodeTimer.querySelector(
    ".main__section__timer-description"
  ).textContent = "";
  nodeTimersSection.append(emptyNodeTimer);
});

btnDeleteTimer.addEventListener("click", function () {
  if (!(nodeTimers.length > minNumberTimers)) return;

  deleteTimer(nodeTimers.length - 1);
  nodeTimers.item(nodeTimers.length - 1).remove();
  pauseSong(timersSongs.length - 1);
});

nodeTimersSection.addEventListener("click", startNewTimer); // I used here event delegation, it is for main__section__btn-start

nodeTimersSection.addEventListener("click", function (event) {
  if (!event.target.classList.contains("main__section__btn-reset")) return;

  //Here I use Event delegation
  const timerNumber = getTimer(event);
  deleteTimer(timerNumber);
  pauseSong(timerNumber);
  event.target
    .closest(".main__section__timer")
    .querySelector(".main__section__timer-time").textContent = baseTimerTime;
});
///////////////////////////////////////////Below All function declarations///////////////////////////////////////////
function calculateTime(nodeTimerTime) {
  const minutes = parseInt(nodeTimerTime.textContent.substring(0, 2));
  const seconds = parseInt(nodeTimerTime.textContent.substring(3));
  return minutes * 60 * 1000 + seconds * 1000; // time in miliseconds
}

function deleteTimer(timerNumber) {
  clearInterval(timersId[timerNumber]);
  timersId[timerNumber] = null;
}

export function getTimer(event) {
  for (const [index, timer] of Object.entries(event.currentTarget.children)) {
    if (timer === event.target.closest(".main__section__timer")) {
      return index;
    }
  }
}

function pauseSong(songPosition) {
  timersSongs[songPosition]?.paused === false
    ? timersSongs[songPosition].pause()
    : "";
  timersSongs[songPosition] = null;
}

function setTimer(startTime, timerSetTime, nodeTimerTime, timerNumber) {
  return setInterval(function () {
    const passedTime = Date.now() - startTime;
    showTime(timerSetTime - passedTime, nodeTimerTime);
    if (passedTime < timerSetTime) return;

    deleteTimer(timerNumber);
    timersSongs[timerNumber].currentTime = 0; // rewind the song to the beginning, 0 seconds
    timersSongs[timerNumber].play();
  }, 1000);
}

export function showTime(timerTime, nodeTimerTime) {
  const minutes = `${Math.trunc(timerTime / (60 * 1000))}`.padStart(2, "0");
  let seconds = `${Math.trunc((timerTime / 1000) % 60)}`.padStart(2, "0");
  seconds[0] === "-" ? (seconds = "00") : ""; // because of this line I don't have minus value of seconds
  nodeTimerTime.textContent = `${minutes}:${seconds}`;
}

export function startNewTimer(
  event,
  btnClass = "main__section__btn-start",
  timerNumber = getTimer(event)
) {
  if (!event.target.classList.contains(btnClass)) return;
  const startTime = Date.now();
  const nodeTimerTime = nodeTimersSection.children[timerNumber].querySelector(
    ".main__section__timer-time"
  );

  let timerSetTime = calculateTime(nodeTimerTime); // time in miliseconds
  if (timersId[timerNumber]) {
    deleteTimer(timerNumber);
  }
  timersId[timerNumber] = setTimer(
    startTime,
    timerSetTime,
    nodeTimerTime,
    timerNumber
  );
}
