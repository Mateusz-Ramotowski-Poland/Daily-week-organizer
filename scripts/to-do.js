import { ToDoKeyLocalStorage } from "./config.js";
///////////////////////////////////////////Below all global variables///////////////////////////////////////////
const btnAddTask = document.querySelector(".btn-add-task");

const toDoElementsArea = document.querySelector(".to-do-elements");

const toDoDescriptionInput = document.querySelector(
  'input[id="to-do-new-task-description"]'
);

const tasks = [];

const savedLocalStorage = JSON.parse(localStorage.getItem(ToDoKeyLocalStorage));
///////////////////////////////////////////Below All adEventListener///////////////////////////////////////////
if (savedLocalStorage) {
  savedLocalStorage.forEach(function (toDo) {
    displayToDo(toDo);
  });
}

btnAddTask.addEventListener("click", function (event) {
  event.preventDefault(); // I don't reload a page after submiting the form, because of this

  if (!toDoDescriptionInput.checkValidity()) {
    //using Constraint validation API
    toDoDescriptionInput.reportValidity();
    return;
  }
  displayToDo(toDoDescriptionInput.value);
  localStorage.setItem(ToDoKeyLocalStorage, JSON.stringify(tasks));
});
toDoElementsArea.addEventListener("click", function (event) {
  if (!event.target.classList.contains("btn-delete-task")) return;

  let deleteNumber;
  //identife children number
/*   const deleteNumber = Array.from(event.currentTarget.children).findIndex(function(child){
    return child === event.target;
  }); */
  /* const deleteNumber = Array.from(event.currentTarget.children).findIndex(child => child === event.target); */
 for(let i=0; i<event.currentTarget.children.length; i++){
  if(event.currentTarget.children[i] === event.target){
    deleteNumber = i;
    break;
  } 
 }
  console.log(deleteNumber);
  console.log(tasks);
  tasks.splice(deleteNumber,1);
  console.log(tasks);
  localStorage.setItem(ToDoKeyLocalStorage, JSON.stringify(tasks));

/*   console.log(event.currentTarget);
  console.log(typeof event.currentTarget.children, event.currentTarget.children);
  console.log(event.target);
  console.log(tasks); */
  event.target.closest(".to-do-element").remove();

});
///////////////////////////////////////////Below All function declarations///////////////////////////////////////////
function displayToDo(TodoDescription) {
  const newToDo = `
  <div class="to-do-element">
    ${TodoDescription}<button class="btn-delete-task">delete task</button>
  </div>
  `;
  tasks.push(TodoDescription);
  toDoElementsArea.insertAdjacentHTML("beforeend", newToDo);
}
