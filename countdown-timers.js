"use strict";
// now I write it in js. After I can rewrite it in react and TS - idea

/////////////// notes from previous projects //////////////////
// try not to use global variabes
//one function - one functionality
// I can use a fev js script instead of one
// use Babel to use your code on every browser
// use get/   verbs in function name
// use inputs instead of prompt
// in function name - write what it do not how it do
///////////////////////////////////////////////////////////////
const nodeTimers = document.getElementsByClassName("timer"); // return HTML live collection
const nodeTimer = document.querySelector(".timer"); // used to add new timer
const nodeTimersSection = document.querySelector(".timers");
const btnAddTimer = document.querySelector(".add-timer");
const btnDeleteTimer = document.querySelector(".delete-timer");

const songAudio = new Audio("piosenka-jest-dobra-na-wszystko.mp3");

const timers = []; // array of intervalID, which is a numeric, non-zero value which identifies the timer created
///////////////////////////////////////////////// play songs buttons version - I will delete this section
document.querySelector(".play-song").addEventListener("click", function () {
  songAudio.play();
});
document.querySelector(".pause-song").addEventListener("click", function () {
  songAudio.pause();
  /* songAudio.stop(); // you don't have method stop */
});
////////////////////////////////////////////////////////////play songs buttons end  I will delete this section
btnAddTimer.addEventListener("click", function () {
  if (nodeTimers.length >= 3) return;

  nodeTimersSection.append(nodeTimer.cloneNode(true));
});
btnDeleteTimer.addEventListener("click", function () {
  if (nodeTimers.length <= 1) return;

  nodeTimers.item(nodeTimers.length - 1).remove();
  deleteTimer();
});
function getTimer(event) {
  for (let i = 0; i < event.currentTarget.children.length; i++) {
    if (event.currentTarget.children.item(i) === event.target.closest(".timer"))
      return i; // timerNumber
  }
}
function showTime(time, nodeTimer) {
  const minutes = `${Math.trunc(time / (60 * 1000))}`.padStart(2, "0");
  const seconds = `${Math.trunc((time / 1000) % 60)}`.padStart(2, "0");
  nodeTimer.textContent = `${minutes}:${seconds}`;
}
function deleteTimer(timerNumber) {
  clearInterval(timers[timerNumber]);
  timers[timerNumber] = null;
}
document.querySelector(".timers").addEventListener("click", function (event) {
  if (!event.target.classList.contains("btnStart")) return;
  //Here I use Event delegation
  function setTimer() {
    // I put function declaration here to use closure
    return setInterval(function () {
      const passedTime = Date.now() - startTime;
      showTime(time - passedTime, nodeTimer);
      if (!(passedTime >= time)) return;

      deleteTimer(timerNumber);
      songAudio.play();
    }, 1000);
  }

  const timerNumber = getTimer(event);
  const startTime = Date.now();
  const nodeTimer = event.target.closest(".timer").querySelector(".timer-time"); // find p tag
  let time = Math.trunc(20 * timerNumber * 60 * 1000); // time in ms; there was problem with fraction numbers (trunc fixed it)
  showTime(time, nodeTimer);
  if (timers[timerNumber]) {
    deleteTimer(timerNumber);
  }
  timers[timerNumber] = setTimer();
});
document.querySelector(".timers").addEventListener("click", function (event) {
  if (!event.target.classList.contains("btnReset")) return;

  //Here I use Event delegation
  const timerNumber = getTimer(event);
  deleteTimer(timerNumber);
  event.target.closest(".timer").querySelector(".timer-time").textContent =
    "mm:ss";
});
