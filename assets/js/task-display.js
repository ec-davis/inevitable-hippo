function clearColumns() {
  columnToDoEl.text("");
  columnWIPEl.text("");
  columnDoneEl.text("");
}

// - determines the target column by status
// - generates a taskCard element
// = appends the taskCard to the target column
function appendTaskToColumn(task, updatedTaskListArray) {
  let column;
  if (task.status === STATUS.TODO) column = columnToDoEl;
  else if (task.status === STATUS.WIP) column = columnWIPEl;
  else if (task.status === STATUS.DONE) column = columnDoneEl;
  const taskCard = assembleTaskCard(task);
  const positionInColumn = column.children().length;
  task.position = positionInColumn;
  column.append(taskCard);
  updatedTaskListArray.push(task);
}

function isPastDue(dueDate) {
  return dueDate < new Date();
}

function isDueToday(dueDate) {
  const today = new Date();
  return (
    dueDate.getDate() == today.getDate() &&
    dueDate.getMonth() == today.getMonth() &&
    dueDate.getFullYear() == today.getFullYear()
  );
}

// Removes urgency classes for done tasks.
// Else sets class according to due date. Note that we check isDueToday() before isPastDue().
// This is for the case in which the due date is earlier today. In that case, we want
// the class from isDueToday(), but isPastDue() would return true if it came before isDueToday()
// Removes
function setUrgencyClass(task, element) {
  const dueDate = new Date(task.dueDate);

  if (task.status === "done")
    element
      .removeClass("alert-info")
      .removeClass("alert-warning")
      .removeClass("alert-danger");
  else if (isDueToday(dueDate)) {
    element.removeClass("alert-info").addClass("alert-warning");
  } else if (isPastDue(dueDate)) {
    element
      .removeClass("alert-info")
      .removeClass("alert-warning")
      .addClass("alert-danger");
  } else element.addClass("alert-info");
}

// creates the task card HTML element
function assembleTaskCard(task) {
  const taskCard = $(`<div id="${task.elementId}">`)
    .addClass("task-card alert draggable") //left out: card
    .attr("data-task-id", task.id);
  const cardHeader = $("<div>").addClass("card-header h4").text(task.title);
  const cardBody = $("<div>").addClass("card-body");
  const cardDescription = $("<p>").addClass("card-text").text(task.description);
  const cardDueDate = $("<p>").addClass("card-text").text(task.dueDate);
  const cardDeleteBtn = $("<button>")
    .addClass("btn btn-danger delete")
    .text("Delete")
    .attr("data-taskId", task.taskId);
  cardDeleteBtn.on("click", handleDeleteTask);

  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);
  setUrgencyClass(task, taskCard);
  taskCard.draggable({
    zIndex: 200,
    helper: "clone",
  });
  taskCard.on("drop", handleDrop);
  return taskCard;
}
