import { ToDoLocalStorageKey } from "./config.js";
///////////////////////////////////////////Below all global variables///////////////////////////////////////////
const btnAddTask = document.querySelector(".main__section__btn-add-task");
const btnsDeleteTask = document.getElementsByClassName(
  "main__section__btn-delete-task"
); // return HTML live collection
const toDoDescriptionInput = document.querySelector(
  'input[id="to-do-new-task-description"]'
);
const toDoElementsArea = document.querySelector(
  ".main__section__to-do-elements"
);

const toDoTasks = JSON.parse(localStorage.getItem(ToDoLocalStorageKey));
///////////////////////////////////////////Below All init operations///////////////////////////////////////////
if (toDoTasks) {
  toDoTasks.forEach(function (toDo) {
    displayToDo(toDo);
  });
}
///////////////////////////////////////////Below All adEventListener///////////////////////////////////////////
btnAddTask.addEventListener("click", function (event) {
  event.preventDefault(); // I don't reload a page after submiting the form and also don't get validation messages, because of this

  if (!toDoDescriptionInput.checkValidity()) {
    toDoDescriptionInput.reportValidity();
    return;
  }
  displayToDo(toDoDescriptionInput.value);
  toDoTasks.push(toDoDescriptionInput.value);
  localStorage.setItem(ToDoLocalStorageKey, JSON.stringify(toDoTasks));
});

toDoElementsArea.addEventListener("click", function (event) {
  if (!event.target.classList.contains("main__section__btn-delete-task"))
    return;

  let deleteNumber;
  for (let i = 0; i < btnsDeleteTask.length; i++) {
    if (btnsDeleteTask[i] === event.target) {
      deleteNumber = i;
      break;
    }
  }
  toDoTasks.splice(deleteNumber, 1);
  localStorage.setItem(ToDoLocalStorageKey, JSON.stringify(toDoTasks));
  event.target.closest(".main__section__to-do-element").remove();
});
///////////////////////////////////////////Below All function declarations///////////////////////////////////////////
function displayToDo(todoDescription) {
  const newToDo = `
  <div class="main__section__to-do-element">
    ${todoDescription}<button class="main__section__btn-delete-task">delete task</button>
  </div>
  `;
  toDoElementsArea.insertAdjacentHTML("beforeend", newToDo);
}
