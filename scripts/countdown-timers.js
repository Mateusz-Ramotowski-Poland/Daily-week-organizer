import { minNumberTimers } from "./config.js";
import { maxNumberTimers } from "./config.js";
import { baseTimerTime } from "./config.js";
/////////////// notes from previous projects //////////////////
// try not to use global variabes
//one function - one functionality
// I can use a fev js script instead of one
// use Babel to use your code on every browser
// use get/   verbs in function name
// use inputs instead of prompt
// in function name - write what it do not how it do
///////////////////////////////////////////Below all global variables///////////////////////////////////////////
export const nodeTimers = document.getElementsByClassName(
  "main__section__timer"
); // return HTML live collection
export const nodeTimersSection = document.querySelector(
  ".main__section__timers"
); // return static NodeList

const btnAddTimer = document.querySelector(".main__section__btn-add-timer");
const btnDeleteTimer = document.querySelector(
  ".main__section__btn-delete-timer"
);

export const songAudioKabaret = new Audio(
  "/mp3/piosenka-jest-dobra-na-wszystko.mp3"
);
export const songAudioBeethoven = new Audio("/mp3/beethoven-5th-symphony.mp3");

export const timersSongs = []; // you should add default songs
const timersId = []; // array of intervalID, which is a numeric, non-zero value which identifies the timer created
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
export function getTimer(event) {
  for (const [index, timer] of Object.entries(event.currentTarget.children)) {
    if (timer === event.target.closest(".main__section__timer")) {
      return index;
    }  
  }
}

function showTime(timerTime, nodeTimerPTag) {
  const minutes = `${Math.trunc(timerTime / (60 * 1000))}`.padStart(2, "0");
  let seconds = `${Math.trunc((timerTime / 1000) % 60)}`.padStart(2, "0");
  seconds[0] === "-" ? (seconds = "00") : "";
  nodeTimerPTag.textContent = `${minutes}:${seconds}`;
}

function deleteTimer(timerNumber) {
  clearInterval(timersId[timerNumber]);
  timersId[timerNumber] = null;
}

function calculateTime(nodeTimerPTag) {
  const minutes = parseInt(nodeTimerPTag.textContent.substring(0, 2));
  const seconds = parseInt(nodeTimerPTag.textContent.substring(3));
  return minutes * 60 * 1000 + seconds * 1000;
}

function pauseSong(songPosition) {
  timersSongs[songPosition]?.paused === false
    ? timersSongs[songPosition].pause()
    : "";
  timersSongs[songPosition] = null;
}

export function startNewTimer(
  event,
  btnClass = "main__section__btn-start",
  timerNumber = getTimer(event)
) {
  console.log(timerNumber);
  if (!event.target.classList.contains(btnClass)) return;
  //Here I use Event delegation
  function setTimer() {
    // I put function declaration here to use closure
    return setInterval(function () {
      const passedTime = Date.now() - startTime;
      showTime(timerSetTime - passedTime, nodeTimerPTag);
      if (!(passedTime >= timerSetTime)) return;

      deleteTimer(timerNumber);
      timersSongs[timerNumber].currentTime = 0;
      timersSongs[timerNumber].play();
    }, 1000);
  }

  const startTime = Date.now();
  const nodeTimerPTag = nodeTimersSection.children[timerNumber].querySelector(
    ".main__section__timer-time"
  );

  let timerSetTime = calculateTime(nodeTimerPTag); // time in miliseconds
  if (timersId[timerNumber]) {
    deleteTimer(timerNumber);
  }
  timersId[timerNumber] = setTimer();
}
