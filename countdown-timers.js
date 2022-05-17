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
const nodeTimersSection = document.querySelector(".timers"); // return static NodeList
const btnAddTimer = document.querySelector(".add-timer");
const btnDeleteTimer = document.querySelector(".delete-timer");
const btnPLaySong = document.querySelector(".play-song");
const btnPauseSong = document.querySelector(".pause-song");

const songAudio = new Audio("piosenka-jest-dobra-na-wszystko.mp3");

const timers = []; // array of intervalID, which is a numeric, non-zero value which identifies the timer created
///////////////////////////////////////////////// play songs buttons version - I will delete this section
btnPLaySong.addEventListener("click", songAudio.play.bind(songAudio));
btnPauseSong.addEventListener("click", songAudio.pause.bind(songAudio));
////////////////////////////////////////////////////////////play songs buttons end  I will delete this section
btnAddTimer.addEventListener("click", function () {
  if (!(nodeTimers.length < 3)) return;

  nodeTimersSection.append(nodeTimers[0].cloneNode(true));
});
btnDeleteTimer.addEventListener("click", function () {
  if (!(nodeTimers.length > 1)) return;

  deleteTimer(nodeTimers.length - 1);
  nodeTimers.item(nodeTimers.length - 1).remove();
});
function getTimer(event) {
  for (const [index, timer] of Object.entries(event.currentTarget.children)) {
    if (timer === event.target.closest(".timer")) return index;
  }
}
function showTime(timerTime, nodeTimerPTag) {
  const minutes = `${Math.trunc(timerTime / (60 * 1000))}`.padStart(2, "0");
  const seconds = `${Math.trunc((timerTime / 1000) % 60)}`.padStart(2, "0");
  nodeTimerPTag.textContent = `${minutes}:${seconds}`;
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
      showTime(timerSetTime - passedTime, nodeTimerPTag);
      if (!(passedTime >= timerSetTime)) return;

      deleteTimer(timerNumber);
      songAudio.play();
    }, 1000);
  }

  const timerNumber = getTimer(event);
  const startTime = Date.now();
  const nodeTimerPTag = event.target.closest(".timer").querySelector(".timer-time"); 
  let timerSetTime = Math.trunc(20 * parseInt(timerNumber) * 60 * 1000); // time in ms; there was problem with fraction numbers (trunc fixed it)
  showTime(timerSetTime, nodeTimerPTag);
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
