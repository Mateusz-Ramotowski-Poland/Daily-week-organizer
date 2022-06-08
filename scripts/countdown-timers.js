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
export const formModals = document.querySelectorAll(".main__form--modal");
export const formModalEditTimer = formModals[0];
export const formModalRestartTimer = formModals[1];
export const overlay = document.querySelector(".main__form__overlay");

export let songAudioKabaret = new Audio(
  "songs/piosenka-jest-dobra-na-wszystko.mp3"
);
checkIfDownloadingErrorAndHandleError(songAudioKabaret);
export let songAudioBeethoven = new Audio(
  "songs/beethoven-5th-symphony.mp3"
);
checkIfDownloadingErrorAndHandleError(songAudioBeethoven);

export const timersDescription = [];
const timersId = [];
export const timersSongs = [songAudioKabaret];
export const timersTimes = [
  baseTimerTime,
  baseTimerTime,
  baseTimerTime,
  baseTimerTime,
  baseTimerTime,
];
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
  timersSongs[nodeTimers.length - 1] = songAudioKabaret;
});

btnDeleteTimer.addEventListener("click", function () {
  if (!(nodeTimers.length > minNumberTimers)) return;

  deleteTimer(nodeTimers.length - 1);
  pauseSong(nodeTimers.length - 1);
  nodeTimers.item(nodeTimers.length - 1).remove();
});

nodeTimersSection.addEventListener("click", startNewTimer);

nodeTimersSection.addEventListener("click", function (event) {
  if (!event.target.classList.contains("main__section__btn-reset")) return;

  const timerNumber = getTimer(event);
  deleteTimer(timerNumber);
  pauseSong(timerNumber);
  event.target
    .closest(".main__section__timer")
    .querySelector(".main__section__timer-time").textContent =
    timersTimes[timerNumber];
});
///////////////////////////////////////////Below All function declarations///////////////////////////////////////////
function calculateTime(nodeTimerTime) {
  const minutes = parseInt(nodeTimerTime.textContent.substring(0, 2));
  const seconds = parseInt(nodeTimerTime.textContent.substring(3));
  return minutes * 60 * 1000 + seconds * 1000; // time in miliseconds
}

export function deleteTimer(timerNumber) {
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

export function pauseSong(songPosition) {
  timersSongs[songPosition]?.paused === false
    ? timersSongs[songPosition].pause()
    : "";
}

function setTimer(startTime, timerSetTime, nodeTimerTime, timerNumber) {
  return setInterval(function () {
    const passedTime = Date.now() - startTime;
    showTime(timerSetTime - passedTime, nodeTimerTime);
    if (passedTime < timerSetTime) return;

    deleteTimer(timerNumber);
    timersSongs[timerNumber].currentTime = 0; // rewind the song to the beginning, 0 seconds
    console.log(typeof songAudioKabaret.duration, songAudioKabaret.duration);
    timersSongs[timerNumber].play();

    showRestartTimerForm(timerNumber);
  }, 1000);
}

export function showTime(timerTime, nodeTimerTime) {
  const minutes = `${Math.trunc(timerTime / (60 * 1000))}`.padStart(2, "0");
  let seconds = `${Math.trunc((timerTime / 1000) % 60)}`.padStart(2, "0");
  seconds[0] === "-" ? (seconds = "00") : ""; // because of this line I don't have minus value of seconds
  nodeTimerTime.textContent = `${minutes}:${seconds}`;
}

function showRestartTimerForm(timerNumber) {
  formModalRestartTimer.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.querySelector(".main__form__restart-timer-description").textContent =
    timersDescription[timerNumber];
  document.querySelector(".main__form__restart-timer-time").textContent =
    timersTimes[timerNumber];
  document.querySelector(".main__form__btn-restart-timer").dataset.timerNumber =
    timerNumber;
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
//////////////////////////////////below my playground////////////////////////////////
const headerTag = document.querySelector("header");

function checkIfDownloadingErrorAndHandleError(downloadedSong) {
  setTimeout(function () {
    if (Number.isNaN(downloadedSong.duration)) {
      console.dir(downloadedSong);
      const startString = downloadedSong.src.indexOf("song");
      const songSrc = downloadedSong.src.substring(startString);
      const errorTag = `
      <menu class="header__menu--error-menu" data-song-src="${songSrc}">
          <p class="header__menu__error-message">Error during downloading a song ${songSrc}.</p>
          <button class="header__menu__btn-download-again">Download Again</button>
          <button class="header__menu__btn-ok">Ok</button>
      </menu>
      `;
      headerTag.insertAdjacentHTML("beforeend", errorTag);
    }
  }, 12000);
}

headerTag.addEventListener("click", function (event) {
  if (!event.target.classList.contains("header__menu__btn-download-again"))
    return;

  const menuErrorMessageTag = event.target.closest(".header__menu--error-menu");
  menuErrorMessageTag.remove();
  const songToDownloadSrc = menuErrorMessageTag.dataset.songSrc;
  if (songToDownloadSrc === "songs/beethoven-5th-symphony.mp3") {
    songAudioBeethoven = new Audio("songs/beethoven-5th-symphony.mp3");
    checkIfDownloadingErrorAndHandleError(songAudioBeethoven);
    console.log(songAudioBeethoven);
  }
  if (songToDownloadSrc === "songs/piosenka-jest-dobra-na-wszystko.mp3") {
    songAudioKabaret = new Audio("songs/piosenka-jest-dobra-na-wszystko.mp3");
    checkIfDownloadingErrorAndHandleError(songAudioKabaret);
    console.log(songAudioKabaret);
  }

});
headerTag.addEventListener("click", function (event) {
  if (!event.target.classList.contains("header__menu__btn-ok")) return;

  event.target.closest(".header__menu--error-menu").remove();
});
///////////////////////////
// To do: wyświetl tytuł piosenki w error message menu
// sprawdz działanie kodu - zasymuluj błąd. Czy jest sens tworzenia małej funckji do usunięcia error message
// refaktoryzuj kod
// 