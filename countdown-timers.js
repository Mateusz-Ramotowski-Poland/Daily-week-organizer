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
export const nodeTimers = document.getElementsByClassName("timer"); // return HTML live collection
export const nodeTimersSection = document.querySelector(".timers"); // return static NodeList
const btnAddTimer = document.querySelector(".add-timer");
const btnEditTimer = document.querySelector(".btnEdit");
const btnDeleteTimer = document.querySelector(".delete-timer");
const btnPLaySong = document.querySelector(".play-song");
const btnPauseSong = document.querySelector(".pause-song");

export const songAudioKabaret = new Audio("piosenka-jest-dobra-na-wszystko.mp3");
export const songAudioBeethoven = new Audio("beethoven-5th-symphony.mp3");

export const timersSongs = [];
const timers = []; // array of intervalID, which is a numeric, non-zero value which identifies the timer created
///////////////////////////////////////////////// play songs buttons version - I will delete this section
btnPLaySong.addEventListener("click", songAudioKabaret.play.bind(songAudioKabaret));
btnPauseSong.addEventListener("click", songAudioKabaret.pause.bind(songAudioKabaret));
////////////////////////////////////////////////////////////play songs buttons end  I will delete this section
btnAddTimer.addEventListener("click", function () {
  if (!(nodeTimers.length < 3)) return;

  const emptyNodeTimer = nodeTimers[0].cloneNode(true);
  emptyNodeTimer.querySelector("p").textContent = "mm:ss";
  nodeTimersSection.append(emptyNodeTimer.cloneNode(true));
});
btnDeleteTimer.addEventListener("click", function () {
  if (!(nodeTimers.length > 1)) return;

  deleteTimer(nodeTimers.length - 1);
  nodeTimers.item(nodeTimers.length - 1).remove();
});
export function getTimer(event) {
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
function calculateTime(nodeTimerPTag){
  const minutes = parseInt(nodeTimerPTag.textContent.substring(0,2));
  const seconds = parseInt(nodeTimerPTag.textContent.substring(3));
  console.log(minutes, seconds);
  return (minutes * 60 * 1000 + seconds * 1000);
}
nodeTimersSection.addEventListener("click", function (event) {
  if (!event.target.classList.contains("btnStart")) return;
  //Here I use Event delegation
  function setTimer() {
    // I put function declaration here to use closure
    return setInterval(function () {
      const passedTime = Date.now() - startTime;
      showTime(timerSetTime - passedTime, nodeTimerPTag);
      if (!(passedTime >= timerSetTime)) return;

      deleteTimer(timerNumber);
      timersSongs[timerNumber].play();
    }, 1000);
  }

  const timerNumber = getTimer(event);
  const startTime = Date.now();
  const nodeTimerPTag = event.target
    .closest(".timer")
    .querySelector(".timer-time");
  let timerSetTime = calculateTime(nodeTimerPTag); // time in miliseconds
  showTime(timerSetTime, nodeTimerPTag);
  if (timers[timerNumber]) {
    deleteTimer(timerNumber);
  }
  timers[timerNumber] = setTimer();
});
nodeTimersSection.addEventListener("click", function (event) {
  if (!event.target.classList.contains("btnReset")) return;

  //Here I use Event delegation
  const timerNumber = getTimer(event);
  deleteTimer(timerNumber);
  event.target.closest(".timer").querySelector(".timer-time").textContent =
    "mm:ss";
});


