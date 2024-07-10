function clearColumns() {
  columnTodoEl.text("");
  columnWIPEl.text("");
  columnDoneEl.text("");
}

// - determines the target column by status
// - generates a taskCard element
// = appends the taskCard to the target column
function appendTaskToColumn(task, updatedTaskListArray) {
  let column;
  if (task.status === STATUS.TODO) column = columnTodoEl;
  else if (task.status === STATUS.WIP) column = columnWIPEl;
  else if (task.status === STATUS.DONE) column = columnDoneEl;
  const taskCard = assembleTaskCard(task);
  const positionInColumn = column.children().length;
  task.position = positionInColumn;
  column.append(taskCard);
  updatedTaskListArray.push(task);
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
  //setUrgencyClass(task, taskCard);
  taskCard
    .draggable({
      zIndex: 200,
      helper: "clone",
    })
    .droppable();
  taskCard.on("drop", handleDrop);
  return taskCard;
}
