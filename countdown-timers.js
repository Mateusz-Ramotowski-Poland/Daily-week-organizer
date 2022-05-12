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
const nodeTimerClean = document.querySelectorAll(".timer"); // clean timer = without any data inside
const nodeTimersSection = document.querySelector(".timers");
const timers = []; // array of intervalID, which is a numeric, non-zero value which identifies the timer created
const songAudio = new Audio("piosenka-jest-dobra-na-wszystko.mp3");
///////////////////////////////////////////////// play songs buttons version

document.querySelector(".play-song").addEventListener("click", function () {
  songAudio.play();
});
document.querySelector(".pause-song").addEventListener("click", function () {
  songAudio.pause();
  /* songAudio.stop(); // you don't have method stop */
});

////////////////////////////////////////////////////////////play songs buttons end

document.querySelector(".add-timer").addEventListener("click", function () {
  if (nodeTimers.length < 3) {
    nodeTimersSection.append(nodeTimerClean[0].cloneNode(true));
  }
});
document.querySelector(".delete-timer").addEventListener("click", function () {
  if (nodeTimers.length > 1) {
    nodeTimers.item(nodeTimers.length - 1).remove();
    // you should also delete timers if they exist
  }
});

function showTime(time, nodeTimer) {
  const minutes = `${Math.trunc(time / 60)}`.padStart(2, "0");
  const seconds = `${time % 60}`.padStart(2, "0");
  nodeTimer.textContent = `${minutes}:${seconds}`;
}

function deleteTimer(timerNumber) {
  clearInterval(timers[timerNumber]);
  timers[timerNumber] = null;
}

document.querySelector(".timers").addEventListener("click", function (event) {
  // start buttons
  console.log(event.target);
  console.log(event.currentTarget);
  console.log(event.currentTarget.children);

  if (event.target.classList.contains("btnStart")) {
    //Here I use Event delegation
    function setTimer() {
      // I put function declaration here to use closure
      return setInterval(function () {
        time--;
        showTime(time, nodeTimer);
        if (time === 0) {
          deleteTimer(timerNumber);
          songAudio.play();
        }
      }, 1000);
    }

    let timerNumber;

    for (let i = 0; i < event.currentTarget.children.length; i++) {
      if (
        event.currentTarget.children.item(i) === event.target.closest(".timer")
      ) {
        timerNumber = i;
        console.log(event.target.closest(".timer"));
        break;
      }
    }
    const nodeTimer = event.target
      .closest(".timer")
      .querySelector(".timer-time"); // find p tag
    let time = Math.trunc(1 * timerNumber * 60); // different time for every timer; there was problem with fraction numbers (trunc fixed it)
    showTime(time, nodeTimer);
    if (timers[timerNumber]) {
      deleteTimer(timerNumber);
    }
    timers[timerNumber] = setTimer();
  }
});

document.querySelector(".timers").addEventListener("click", function (event) {
  // stop buttons
  console.log(event.target);
  console.log(event.currentTarget);
  console.log(event.currentTarget.children);

  if (event.target.classList.contains("btnReset")) {
    //Here I use Event delegation
    let timerNumber;

    for (let i = 0; i < event.currentTarget.children.length; i++) {
      if (
        event.currentTarget.children.item(i) === event.target.closest(".timer")
      ) {
        timerNumber = i;
        console.log(event.target.closest(".timer"));
        break;
      }
    }

    deleteTimer(timerNumber);
    event.target.closest(".timer").querySelector(".timer-time").textContent =
      "mm:ss";
  }
});

