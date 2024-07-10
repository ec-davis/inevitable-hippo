// DEPENDENCIES
// Task Creation Modal elements
const addTaskModal = $("#addTaskModal");
const addTaskBtnEl = $("#add-task-btn");
const saveTaskBtn = $("#saveTaskBtn");
const taskTitleInput = $("#taskTitleInput");
const taskDueDateInput = $("#taskDueDateInput");
const taskDescriptionInput = $("#taskDescriptionInput");
const taskStatusInput = $("#taskStatusInput");

// columns
const columnTodoEl = $("#todo-cards");
const columnWIPEl = $("#in-progress-cards");
const columnDoneEl = $("#done-cards");

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

  addTaskModal.modal("hide");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  saveTaskBtn.on("click", handleAddTask);
  renderTaskList();
});
