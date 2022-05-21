///////////////////////////////////////////Below all global variables///////////////////////////////////////////
const btnAddTask = document.querySelector(".btn-add-task");
const btnDeleteTask = document.querySelector(".btn-delete-task");

const toDoElement = document.querySelector(".to-do-element");
const toDoElementsArea = document.querySelector(".to-do-elements");

const toDoDescriptionInput = document.querySelector(
  'input[id="to-do-new-task-description"]'
);
///////////////////////////////////////////Below All adEventListener///////////////////////////////////////////
btnAddTask.addEventListener("click", function () {
  const newToDo = `
  <div class="to-do-element">
    ${toDoDescriptionInput.value}<button class="btn-delete-task">delete task</button>
  </div>
  `;
  toDoElementsArea.insertAdjacentHTML("beforeend", newToDo);
});
toDoElementsArea.addEventListener("click", function (event) {
  if (!event.target.classList.contains("btn-delete-task")) return;

  event.target.closest(".to-do-element").remove();
});
