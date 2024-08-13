import {
  sendGetRequest,
  sendRequest,
} from "../../requestMethods/javaScript/fetchRequestScript.js";
import { allowDragTask } from "./dragScript.js";

document.getElementById("tfDateField").min = new Date()
  .toISOString()
  .split("T")[0];

window.addEventListener("load", () => {
  sendGetRequest(
    "http://localhost:8080/api/v1/tasks/user/" +
      sessionStorage.getItem("user_id")
  ).then((tasks) => {
    for (let i = 0; i < tasks.length; i++) {
      const currTask = tasks[i];
      addTaskToBoard(
        getTaskContainer(currTask.board),
        currTask.id,
        currTask.title,
        currTask.endDate,
        currTask.description
      );
    }
  });
});

document.querySelectorAll(".addTaskButton").forEach((addTaskButton) => {
  addTaskButton.addEventListener("click", () => {
    document.getElementById("mainTaskFormTitle").innerText = "Add task";
    document.getElementById("taskFormSubmit").innerText = "Add";

    if (addTaskButton.id === "doneAddTaskButton") {
      document.getElementById("tfBoardSelect").value = "Done";
    } else if (addTaskButton.id === "inProcessAddTaskButton") {
      document.getElementById("tfBoardSelect").value = "InProcess";
    } else {
      document.getElementById("tfBoardSelect").value = "ToDo";
    }

    document.getElementById("mainTaskFormPane").classList.add("active");
  });
});

document.querySelectorAll(".taskFormCloseButton").forEach((tsCloseButton) => {
  tsCloseButton.addEventListener("click", () => {
    clearTaskForm(
      document.getElementById("tfNameField"),
      document.getElementById("tfDateField"),
      document.getElementById("tfDescArea")
    );
    document.getElementById("mainTaskFormPane").classList.remove("active");
  });
});

let currTask;

document.getElementById("mainTaskForm").addEventListener("submit", (event) => {
  event.preventDefault();
  let taskBoardName = document.getElementById("tfBoardSelect").value;
  let taskContainer = getTaskContainer(taskBoardName);
  let taskNameField = document.getElementById("tfNameField");
  let taskDateField = document.getElementById("tfDateField");
  let taskDescArea = document.getElementById("tfDescArea");

  const taskJSON = getTaskJSON(
    currTask != null ? currTask.querySelector("#taskId").innerText : null,
    taskBoardName,
    taskNameField.value,
    taskDateField.value,
    taskDescArea.value,
    sessionStorage.getItem("user_id")
  );

  if (document.getElementById("taskFormSubmit").innerText === "Add") {
    let taskId;
    sendRequest("POST", "http://localhost:8080/api/v1/tasks", taskJSON).then(
      (task) => {
        taskId = task.id;
      }
    );

    addTaskToBoard(
      taskContainer,
      taskId,
      taskNameField.value,
      taskDateField.value,
      taskDescArea.value
    );
    clearTaskForm(taskNameField, taskDateField, taskDescArea);
  } else {
    sendRequest(
      "PUT",
      "http://localhost:8080/api/v1/tasks/" +
        currTask.querySelector("#taskId").innerText,
      taskJSON
    );

    const currContainer = currTask.parentNode.id;
    if (!currContainer.toLowerCase().includes(taskBoardName.toLowerCase())) {
      currTask.parentNode.removeChild(currTask);
      taskContainer.appendChild(currTask);
    }
    editTaskAtBoard(
      currTask,
      0,
      taskNameField.value,
      taskDateField.value,
      taskDescArea.value
    );
    clearTaskForm(taskNameField, taskDateField, taskDescArea);
  }
  document.getElementById("mainTaskFormPane").classList.remove("active");
});

export function getTaskJSON(id, board, title, endDate, description, user_id) {
  return {
    id: id,
    board: board,
    title: title,
    endDate: endDate,
    description: description,
    user_id: user_id,
  };
}

function getTaskContainer(taskBoardName) {
  if (taskBoardName === "Done") {
    return document.getElementById("doneContainer");
  } else if (taskBoardName === "InProcess") {
    return document.getElementById("inProcessContainer");
  } else {
    return document.getElementById("toDoContainer");
  }
}

export function getTaskContainerById(taskContainerId) {
  taskContainerId = taskContainerId.substring(0, 4);
  if (taskContainerId === "inPr") {
    taskContainerId = "inProcess";
  }
  return (
    taskContainerId.charAt(0).toUpperCase() +
    taskContainerId.substring(1, taskContainerId.length)
  );
}

function fillTaskForm(
  taskPane,
  board,
  tfBoardSelect,
  tfNameField,
  tfDateField,
  tfDescArea
) {
  tfBoardSelect.value = board;
  tfNameField.value = taskPane.querySelector("#taskTitle").innerText;
  tfDateField.value = taskPane
    .querySelector("#taskDate")
    .innerText.split(".")
    .reverse()
    .join("-");
  tfDescArea.value = taskPane.querySelector("#taskDescription").innerText;
}

function clearTaskForm(tfNameField, tfDateField, tfDescArea) {
  tfNameField.value = "";
  tfDateField.value = "";
  tfDescArea.value = "";
}

function addTaskToBoard(board, taskId, taskTitle, taskDate, taskDescription) {
  let taskPane = document.createElement("div");
  taskPane.classList.add("taskPane");
  taskPane.setAttribute("draggable", "true");
  taskPane.innerHTML = getTaskTemplate(
    taskId,
    taskTitle,
    taskDate.split("-").reverse().join("."),
    taskDescription
  );

  taskPane.addEventListener("click", (event) => {
    currTask = event.target;
    document.getElementById("mainTaskFormTitle").innerText =
      currTask.querySelector("#taskTitle").innerText;
    document.getElementById("taskFormSubmit").innerText = "Edit";
    let currContainer = getTaskContainerById(taskPane.parentNode.id);

    fillTaskForm(
      taskPane,
      currContainer,
      document.getElementById("tfBoardSelect"),
      document.getElementById("tfNameField"),
      document.getElementById("tfDateField"),
      document.getElementById("tfDescArea")
    );
    document.getElementById("mainTaskFormPane").classList.add("active");
  });

  taskPane.addEventListener("dragstart", (event) => {
    allowDragTask(event);
  });

  board.appendChild(taskPane);
  //board.innerHTML += taskTemplate;
}

function editTaskAtBoard(
  taskPane,
  taskId,
  taskTitle,
  taskDate,
  taskDescription
) {
  taskPane.querySelector("#taskId").innerText = taskId;
  taskPane.querySelector("#taskTitle").innerText = taskTitle;
  taskPane.querySelector("#taskDate").innerText = taskDate
    .split("-")
    .reverse()
    .join(".");
  taskPane.querySelector("#taskDescription").innerText = taskDescription;
}

function getTaskTemplate(taskId, taskTitle, taskDate, taskDescription) {
  // return `<div class="taskPane">
  return `
      <p id="taskId" class="taskTextHidden">${taskId}</p>
      <p id="taskTitle" class="taskText ptrEventsNone">${taskTitle}</p>
      <p id="taskDate" class="taskText ptrEventsNone">${taskDate}</p>
      <p id="taskDescription" class="taskTextHidden">${taskDescription}</p>`;
  //</div>`;
}
