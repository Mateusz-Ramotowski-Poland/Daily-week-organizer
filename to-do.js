const btnAddTask = document.querySelector('.btn-add-task');
const btnDeleteTask = document.querySelector('.btn-delete-task');
//below only for testing, after development delete these lines
const addTaskArea = document.querySelector('.add-task-area');         
////////////////////////////////////////////////////////////////////
addTaskArea.addEventListener('click', function(event){
    console.log(event.target);
    console.log(!event.target.classList.contains('.btn-add-task'));
   if (!event.target.classList.contains('btn-add-task')) return;
    addTaskArea.append(btnAddTask.cloneNode(true));
})