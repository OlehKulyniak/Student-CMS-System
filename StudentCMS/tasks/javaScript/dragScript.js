import { sendRequest } from "../../requestMethods/javaScript/fetchRequestScript.js";
import { getTaskJSON, getTaskContainerById } from "./tasksScript.js";

let dragElement = null;

// document.querySelectorAll(".taskPane").forEach((taskPane) => {
//   taskPane.addEventListener("dragstart", (event) => {
//     dragElement = event.target;
//   });
// });

export function allowDragTask(event) {
  dragElement = event.target;
}

const targets = document.querySelectorAll(".tasksContainer");

targets.forEach((target) => {
  target.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  target.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.className === "tasksContainer") {
      const taskJSON = getTaskJSON(
        dragElement.querySelector("#taskId").innerText,
        getTaskContainerById(event.target.id),
        dragElement.querySelector("#taskTitle").innerText,
        dragElement.querySelector("#taskDate").innerText,
        dragElement.querySelector("#taskDescription").innerText,
        sessionStorage.getItem("user_id")
      );
      let currId = dragElement.querySelector("#taskId").innerText;

      sendRequest(
        "PUT",
        "http://localhost:8080/api/v1/tasks/" + currId,
        taskJSON
      );

      // sendRequest(
      //   "PUT",
      //   "http://localhost:8080/api/v1/tasks/" +
      //     dragElement.querySelector("#taskId").innerText,
      //   taskJSON
      // );

      dragElement.parentNode.removeChild(dragElement);
      event.target.appendChild(dragElement);
    }
  });
});
