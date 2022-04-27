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

function setTimer(time, timerNumber, nodeTimer){
    setInterval(function (time, timerNumber, nodeTimer) {
        if (time === 0) {
          clearInterval(timers[timerNumber]);
        }
        time--;
        showTime(time, nodeTimer)
      }, 1000, time, timerNumber, nodeTimer);
}

function showTime(time, nodeTimer){
    const minutes = `${Math.trunc(time / 60)}`.padStart(2, '0');
    const seconds = `${time % 60}`.padStart(2, '0');
    nodeTimer.textContent = `${minutes}:${seconds}`;
}

document.querySelector(".timers").addEventListener("click", function (event) {
  console.log("timer");
  console.dir(event.target);
  if (event.target.classList.contains("timer")) { //Here I use Event delegation
    let timerNumber;

    for (let i = 0; i < event.currentTarget.children.length; i++) {
      if (event.currentTarget.children.item(i) === event.target) {
        timerNumber = i;
        break;
      }
    }
    // wybierz element p wewnątrz event.target
    const nodeTimer = event.target.querySelector(".timer-time");
    let time = 0.2 * 60; // 1 minutes
    showTime(time, nodeTimer)
    if (timers[timerNumber]){
        clearInterval(timers[timerNumber]);
    }else{
        timers[timerNumber] = setTimer(time, timerNumber, nodeTimer);
    }
  }
});
