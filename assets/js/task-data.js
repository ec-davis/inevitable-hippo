// DATA
const STORED_NEXT_ID_NAME = "nextId";
const STORED_TASKS_NAME = "STORED_TASKS";

const STATUS = {
  TODO: "to-do",
  WIP: "in-progress",
  DONE: "done",
};

// FUNCTIONS

///////////////////////////
// TASK ID Functions

// ordinary GETTER
function getStoredNextId() {
  return Number(localStorage.getItem(STORED_NEXT_ID_NAME));
}
// ordinary SETTER
function setStoredNextId(nextId) {
  localStorage.setItem(STORED_NEXT_ID_NAME, nextId);
}

// If taskID exists in LocalStorage: returns it
// Else: initializes taskId to 1
// Returns: taskId
function initStoredNextID() {
  let storedNextID = getStoredNextId();

  if (null == storedNextID) {
    console.log(
      "initStoredNextID() found stored nextId was null. Initializing to 1"
    );
    setStoredNextId(1);
    return 1;
  } else {
    console.log(
      `initStoredNextID() found stored nextId ${storedNextID}, no need to initialize.`
    );
    return storedNextID;
  }
}

// gets nextTaskID and returns it. Increments the stored nextId
function getNextTaskId() {
  const nextTaskId = initStoredNextID();
  setStoredNextId(nextTaskId + 1);
  return nextTaskId;
}

///////////////////
// STORED TASKS

// GETTER
function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem(STORED_TASKS_NAME));
}
// SETTER
function setTasksInStorage(taskArray) {
  localStorage.setItem(STORED_TASKS_NAME, JSON.stringify(taskArray));
}

// creates a const structure that is ready for rendering as a Task Card and for storage
function initTaskObject(title, dueDate, description, status) {
  const newTaskId = getNextTaskId();

  const task = {
    taskId: newTaskId,
    elementId: `task-${newTaskId}`,
    title: title,
    dueDate: dueDate,
    description: description,
    status: status,
  };
  return task;
}

// stores a const of task data. If it is the first task to be stored, initializes the array of tasks in storage
function storeTask(task) {
  let storedTasksArray = getTasksFromStorage();
  if (null == storedTasksArray) storedTasksArray = [];
  storedTasksArray.push(task);
  setTasksInStorage(storedTasksArray);
}

// initializes a task object and stores it
function addTask() {
  const task = initTaskObject(
    taskTitleInput.val(),
    taskDueDateInput.val(),
    taskDescriptionInput.val(),
    taskStatusInput.val()
  );
  storeTask(task);
  setStoredTaskStatus(6, STATUS.DONE);
}

/////////////////////////
// TASK Status

// finds a task in storage and updates its status
function setStoredTaskStatus(taskId, status) {
  const storedTasks = getTasksFromStorage();
  for (task of storedTasks) {
    if (task.taskId === taskId) {
      task.status = status;
      break;
    }
  }
  setTasksInStorage(storedTasks);
}