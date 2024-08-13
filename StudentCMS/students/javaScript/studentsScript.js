import { sendRequest } from "../../requestMethods/javaScript/fetchRequestScript.js";
import {
  fillNewPage,
  studentsOnPage,
  setStudentsOnPage,
  currStudentId,
  setCurrStudentId,
  setDelAttrPaginButton,
} from "./paginationScript.js";
import { addStudent, editStudent, editButtonClick } from "./studFormScript.js";
import { showErrorMsg } from "../../errorMessage/javaScript/errorMsgScript.js";
//import { stompClient } from "../../navigationMain/javaScript/navMainScript.js";

export let studentsTable = document.getElementById("studentsTable");

window.addEventListener("load", () => {
  fillNewPage("1");
  // Додати збереження статусів користувачів у localStorage
});

export const apiURL = "http://localhost:8085/student-servlet";

document.getElementById("addPlusButton").addEventListener("click", () => {
  document.getElementById("formType").innerText = "Add student";
  document.getElementById("groupSelect").selectedIndex = 0;
  document.getElementById("firstNameField").value = "";
  document.getElementById("lastNameField").value = "";
  document.getElementById("genderSelect").selectedIndex = 0;
  document.getElementById("birthdayField").value = "";
  document.getElementById("formStudentPane").classList.add("selected");
});

export function createStudRow(
  id,
  group,
  firstName,
  lastName,
  gender,
  birthday
) {
  let color = "#D8D8D8";
  let template = `
  <tr class="studentRow" align="center">
      <td class="checkBoxCell">
        <input type="checkbox" class="studCheckBox" />
        <div id="checkMark" class="studCheckMark"></div>
      </td>
      <td id="idCell" class="studHiddenCell">${id}</td>
      <td id="groupCell">${group}</td>
      <td id="nameCell">${firstName + " " + lastName}</td>
      <td id="genderCell">${gender[0]}</td>
      <td id="birthdayCell">${birthday.split("-").reverse().join(".")}</td>
      <td id="statusCell"><div id="statusMark" class="studStatusMark" style="background-color: ${color}"></div> </td>
      <td id="optionsCell">
        <div id="optionsPane" class="studOptionsPane">
        <button id="editButton" class="optionButton">
          <span class="material-symbols-outlined">edit</span>
        </button>
        <button id="deleteButton" class="optionButton">✕</button>
    </td>
  </tr>
  `;
  return template;
}

document.getElementById("studentForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (document.getElementById("formType").innerText == "Edit student") {
    editStudent(currRow);
  } else {
    setCurrStudentId(currStudentId + 1);
    addStudent(
      currStudentId,
      document.getElementById("groupSelect").value,
      document.getElementById("firstNameField").value,
      document.getElementById("lastNameField").value,
      document.getElementById("genderSelect").value,
      document.getElementById("birthdayField").value,
      studentsOnPage
    );
    setStudentsOnPage(studentsOnPage + 1);
    // let filledPages = Math.ceil(currStudentNum / pageSize);
    // if (currActiveButton.innerText < filledPages) {
    //   getRightPaginButtons(currActiveButton.innerText).forEach(
    //     (rightPaginButton) => {
    //       rightPaginButton.disabled =
    //         rightPaginButton <= Math.ceil(filledPages);
    //     }
    //   );
    // }
  }
  document.getElementById("formStudentPane").classList.remove("selected");
});

let currRow;

function showDeletionPane(button) {
  let delPane = document.getElementById("delPane");
  currRow = button.parentNode.parentNode.parentNode;
  delPane.querySelector("#delInfo").innerHTML =
    "Are you sure you want to delete user " +
    currRow.querySelector("#nameCell").innerText +
    "?";
  delPane.classList.add("selected");
}

document.getElementById("okDelButton").addEventListener("click", () => {
  document.getElementById("delPane").classList.remove("selected");
  const currDelStudent = {
    id: currRow.querySelector("#idCell").innerText,
    group: currRow.querySelector("#groupCell").innerText,
    firstName: currRow.querySelector("#nameCell").innerText.split(" ")[0],
    lastName: currRow.querySelector("#nameCell").innerText.split(" ")[1],
    gender: currRow.querySelector("#genderCell").innerText,
    birthday: currRow
      .querySelector("#birthdayCell")
      .innerText.split(".")
      .reverse()
      .join("-"),
  };
  console.log(JSON.stringify(currDelStudent));
  sendRequest("DELETE", apiURL, currDelStudent).then(
    (resolve) => {
      currRow.remove();
    },
    (error) => {
      showErrorMsg(error.code, error.message);
    }
  );

  setStudentsOnPage(studentsOnPage - 1);

  setDelAttrPaginButton();
  //studentsArr.splice(currRow.rowIndex - 1, 1);
  //fillNewPage(currActiveButton.innerText);
  // if (
  //   currStudent <= (Number(currActiveButton.innerText) - 1) * pageSize &&
  //   currActiveButton.innerText != 1
  // ) {
  //   numPaginButtonClick(
  //     getNextPaginButton(Number(currActiveButton.innerText) - 1)
  //   );
  // }
  // if (
  //   currStudent <= Number(currActiveButton.innerText) * pageSize &&
  //   currActiveButton.innerText > 3
  // ) {
  //   currActiveButton.classList.remove("Active");
  //   setNewPaginValues(Number(currActiveButton.innerText) - 3);
  //   currActiveButton = document.getElementById("RightNumPagination");
  //   currActiveButton.classList.add("Active");
  //   document.getElementById("RightPaginButton").disabled = true;
  // }
});

document
  .querySelectorAll(".closeDelStudButton")
  .forEach((closeDelStudButton) => {
    closeDelStudButton.addEventListener("click", () => {
      document.getElementById("delPane").classList.remove("selected");
    });
  });

document
  .querySelectorAll(".closeStudFormButton")
  .forEach((closeStudFormButton) => {
    closeStudFormButton.addEventListener("click", () => {
      document.getElementById("formStudentPane").classList.remove("selected");
    });
  });

document.querySelectorAll(".errorMsgButton").forEach((errorMsgButton) => {
  errorMsgButton.addEventListener("click", () => {
    document.getElementById("errorMsgPane").style = "display: none;";
  });
});

const onUserEntered = (message) => {
  let allRows = studentsTable.querySelectorAll(".studentRow");
  allRows.forEach((row) => {
    if (
      row.querySelector("#nameCell").innerText ==
      JSON.parse(message.body).username
    ) {
      row.querySelector("#statusCell").querySelector("#statusMark").style =
        "background-color: " +
        (JSON.parse(message.body).isEntered ? "#689E39" : "#D8D8D8");
    }
  });
};

export function setOptionsAction(studentRow) {
  let optionsPane = studentRow
    .querySelector("#optionsCell")
    .querySelector("#optionsPane");

  optionsPane
    .querySelector("#editButton")
    .addEventListener("click", (event) => {
      currRow = event.currentTarget.parentNode.parentNode.parentNode;
      editButtonClick(currRow);
    });

  optionsPane
    .querySelector("#deleteButton")
    .addEventListener("click", (event) => {
      showDeletionPane(event.currentTarget);
    });
}

export function setMainCheckAction() {
  let mainCheckBox = document.getElementById("mainCheckBox");
  document.querySelectorAll(".studCheckBox").forEach((studCheckBox) => {
    studCheckBox.checked = mainCheckBox.checked;
  });
}

const onConnect = () => {
  stompClient.subscribe("/user/1/queue/students", onUserEntered);
};

stompClient.connect({}, onConnect);
