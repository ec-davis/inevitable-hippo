function initTaskObject(title, dueDate, description, status) {
  //   const newTaskId = generateTaskId();

  const newTask = {
    //taskId: newTaskId,
    // elementId: `task-${newTaskId}`,
    title: title,
    dueDate: dueDate,
    description: description,
    status: status,
  };
  return newTask;
}
