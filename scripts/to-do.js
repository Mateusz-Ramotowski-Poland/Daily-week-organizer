import { ToDoLocalStorageKey } from "./config.js";
///////////////////////////////////////////Below all global variables///////////////////////////////////////////
const btnAddTask = document.querySelector(".main__section__btn-add-task");

const toDoElementsArea = document.querySelector(".main__section__to-do-elements");
const btnsDeleteTask = document.getElementsByClassName('main__section__btn-delete-task'); // return HTML live collection

const toDoDescriptionInput = document.querySelector(
  'input[id="to-do-new-task-description"]'
);

const tasks = [];

const savedLocalStorage = JSON.parse(localStorage.getItem(ToDoLocalStorageKey)); //Here I got an aray of strings
///////////////////////////////////////////Below All init operations///////////////////////////////////////////
if (savedLocalStorage) {
  savedLocalStorage.forEach(function (toDo) {
    displayToDo(toDo); // In this function I also save toDo to tasks array
  });
}
///////////////////////////////////////////Below All adEventListener///////////////////////////////////////////
btnAddTask.addEventListener("click", function (event) {
  event.preventDefault(); // I don't reload a page after submiting the form and also don't get validation messages, because of this

  if (!toDoDescriptionInput.checkValidity()) {  
    //using Constraint validation API
    toDoDescriptionInput.reportValidity();
    return;
  }
  displayToDo(toDoDescriptionInput.value); // In this function I also save toDoDescriptionInput.value to tasks array
  localStorage.setItem(ToDoLocalStorageKey, JSON.stringify(tasks));
});

toDoElementsArea.addEventListener("click", function (event) {
  if (!event.target.classList.contains("main__section__btn-delete-task")) return;

  let deleteNumber;
 for(let i=0; i<btnsDeleteTask.length; i++){
  if(btnsDeleteTask[i] === event.target){
    deleteNumber = i;
    break;
  } 
 }
  tasks.splice(deleteNumber,1);
  localStorage.setItem(ToDoLocalStorageKey, JSON.stringify(tasks));
  event.target.closest(".main__section__to-do-element").remove();
});
///////////////////////////////////////////Below All function declarations///////////////////////////////////////////
function displayToDo(TodoDescription) {
  const newToDo = `
  <div class="main__section__to-do-element">
    ${TodoDescription}<button class="main__section__btn-delete-task">delete task</button>
  </div>
  `;
  tasks.push(TodoDescription);
  toDoElementsArea.insertAdjacentHTML("beforeend", newToDo);
}
