// GET request for the initial list of tasks.
async function getTasks() {
  try {
    const response = await fetch("http://localhost:3000", {
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    addTaskToDom(data);
  } catch (error) {
    console.log(error);
  }
}

getTasks();


// POST request for a new task.
async function addTask(task) {
  try {
    const newTask = {description: task, done: false};
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify({ task: newTask }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    addTaskToDom([data]);
  } catch (error) {
    console.log(error);
  }
}

//PUT request, updates the done: property.
async function getTaskUpdate(taskId,taskDescription, done,) {
  try {
    console.log(taskId, done);
    const response = await fetch(`http://localhost:3000/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: {description: taskDescription, done: done }})
    });
    if (!response.ok) {
      throw new Error(`Failed to update task: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}



// DELETE request to remove a task.
async function deleteTask(taskId) {
  try {
    const response = await fetch(`http://localhost:3000/${taskId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      throw new Error(`Failed to delete task: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}

