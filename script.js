// Add event listener to the add task button
const addBtn = document.getElementById("task-add-btn");
addBtn.addEventListener("click", function () {
	const task = document.getElementById("task-input-area").value;
	if (task === "New Task" || task === "") return;
	addTask(task);
	document.getElementById("task-input-area").value = "New Task";
});

// Add event listener to the task input area
const taskInputArea = document.getElementById("task-input-area");
taskInputArea.addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		const task = document.getElementById("task-input-area").value;
		if (task === "New Task" || task === "") return;
		addTask(task);
		document.getElementById("task-input-area").value = "New Task";
	}
});

// Add task in the DOM
function addTaskToDom(tasks) {
	tasks.forEach((task) => {
		const newTask = document.createElement("li");
		newTask.innerHTML = `<input type="checkbox" class="task-checkbox" data-id='${
			task._id
		}' data-description='${task.task.description}' ${
			task.task.done ? "checked" : ""
		}>
       <span class="task-description ${task.task.done ? "completed" : ""}">${
			task.task.description
		}</span>
       <i data-id='${task._id}' class="fas fa-trash-alt"></i>`;
		newTask
			.querySelector(".fa-trash-alt")
			.addEventListener("click", removeTask);
		newTask
			.querySelector(".task-checkbox")
			.addEventListener("click", taskCompleted);
		document.getElementById("task-list").appendChild(newTask);
	});
}

//Task completed / not completed update.
function taskCompleted(event) {
	let task = event.target.parentNode.querySelector(".task-description");
	task.classList.toggle("completed");
	let taskDescription = event.target.getAttribute("data-description");
	let taskId = event.target.getAttribute("data-id");
	let done = event.target.checked; // true if checked, false if not
	getTaskUpdate(taskId, taskDescription, done);
}

//Delete task from the DOM
function removeTask(event) {
	const taskId = event.target.dataset.id;
	event.target.parentNode.remove();
	deleteTask(taskId);
}

// Clear input area after focus event
document
	.getElementById("task-input-area")
	.addEventListener("focus", function () {
		if (this.value === "New Task") {
			this.value = "";
		}
	});
