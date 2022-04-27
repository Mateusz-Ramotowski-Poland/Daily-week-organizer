"use strict";

/////////////// notes from previous projects //////////////////
// try not to use global variabes
//one function - one functionality
// I can use a fev js script instead of one
// use Babel to use your code on every browser
// use get/   verbs in function name
// use inputs instead of prompt
// in function name - write what it do not how it do
//////////////////////////////////////////////////////////////
//alert('work');  it's connected with index.html
const timers = [];

function showTime(time, nodeTimer) {
  const minutes = `${Math.trunc(time / 60)}`.padStart(2, "0");
  const seconds = `${time % 60}`.padStart(2, "0");
  nodeTimer.textContent = `${minutes}:${seconds}`;
}

document.querySelector(".timers").addEventListener("click", function (event) {
  if (event.target.classList.contains("timer")) {//Here I use Event delegation
    function setTimer() {
      return setInterval(
        function () {
          if (time === 1) {
            clearInterval(timers[timerNumber]);
            timers[timerNumber] = null;
          }
          time--;
          showTime(time, nodeTimer);
        },
        1000,
        time,
        timerNumber,
        nodeTimer
      );
    }

    let timerNumber;

    for (let i = 0; i < event.currentTarget.children.length; i++) {
      if (event.currentTarget.children.item(i) === event.target) {
        timerNumber = i;
        break;
      }
    }
    // wybierz element p wewnątrz event.target
    const nodeTimer = event.target.querySelector(".timer-time");
    let time = 1 *(timerNumber+1) * 60; // different time for every timer
    showTime(time, nodeTimer);
    if (timers[timerNumber]) {
      clearInterval(timers[timerNumber]);
      timers[timerNumber] = null;
    }
    timers[timerNumber] = setTimer();
  }
});
