// DEPENDENCIES
// Task Creation Modal elements
const addTaskModal = $("#addTaskModal");
const addTaskBtnEl = $("#add-task-btn");
const saveTaskBtn = $("#saveTaskBtn");
const taskTitleInput = $("#taskTitleInput");
const taskDueDateInput = $("#taskDueDateInput");
const taskDescriptionInput = $("#taskDescriptionInput");

// columns
const columnToDoEl = $("#to-do-cards");
const columnWIPEl = $("#in-progress-cards");
const columnDoneEl = $("#done-cards");

function configureElements() {
  columnToDoEl.droppable({
    accept: ".draggable",
    drop: handleDrop,
  });
  columnWIPEl.droppable({
    accept: ".draggable",
    drop: handleDrop,
  });
  columnDoneEl.droppable({
    accept: ".draggable",
    drop: handleDrop,
  });
}

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  clearColumns();

  const taskListArray = getTasksFromStorage();
  const newTaskListArray = [];
  for (task of taskListArray) {
    appendTaskToColumn(task, newTaskListArray);
  }
  setTasksInStorage(newTaskListArray);
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  addTask();
  addTaskModal.modal("hide");
  clearInputFields();
  renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const cardToDelete = event.target;
  const id = cardToDelete.dataset.taskid;
  deleteTaskFromStorageById(id);
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const droppedCard = ui.draggable;
  const dropTarget = this;
  const taskData = getTaskFromStorageById(droppedCard[0].id);
  deleteTaskFromStorageById(droppedCard[0].id);

  const targetStatus = getTargetColumnStatus(dropTarget.id);
  taskData.status = targetStatus;
  storeTask(taskData);
  event.stopPropagation();
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  saveTaskBtn.on("click", handleAddTask);
  taskDueDateInput.datepicker({
    changeMonth: true,
    changeYear: true,
  });
  configureElements();
  renderTaskList();
});
