import { sendRequest } from "../../requestMethods/javaScript/fetchRequestScript.js";
import { createStudRow, setOptionsAction, apiURL } from "./studentsScript.js";
import { showErrorMsg } from "../../errorMessage/javaScript/errorMsgScript.js";

export function addStudent(
  currStudentId,
  group,
  firstName,
  lastName,
  gender,
  birthday,
  studentsOnPage = 0
) {
  // document.getElementById("RightPaginButton").disabled =
  //   Number(currActiveButton.innerText) >= currStudent / pageSize;

  const newStudent = getStudFormInfo(0);
  console.log(JSON.stringify(newStudent));
  sendRequest("POST", apiURL, newStudent).then(
    () => {
      if (studentsOnPage < 4) {
        template = createStudRow(
          currStudentId,
          group,
          firstName,
          lastName,
          gender,
          birthday
        );
        studentsTable.innerHTML += template;

        // Неефективна реалізація, можливо поміняти
        studentsTable.querySelectorAll(".studentRow").forEach((studentRow) => {
          setOptionsAction(studentRow);
        });
      }
    },
    (error) => {
      showErrorMsg(error.code, error.message);
    }
  );
}

function getStudFormInfo(studentId) {
  const newStudent = {
    id: studentId,
    group: document.getElementById("groupSelect").value,
    firstName: document.getElementById("firstNameField").value,
    lastName: document.getElementById("lastNameField").value,
    gender: document.getElementById("genderSelect").value,
    birthday: document.getElementById("birthdayField").value,
  };
  return newStudent;
}

export function editButtonClick(currRow) {
  document.getElementById("formType").innerText = "Edit student";
  document.getElementById("groupSelect").value =
    currRow.querySelector("#groupCell").innerText;
  document.getElementById("firstNameField").value = currRow
    .querySelector("#nameCell")
    .innerText.split(" ")[0];
  document.getElementById("lastNameField").value = currRow
    .querySelector("#nameCell")
    .innerText.split(" ")[1];
  document.getElementById("genderSelect").value =
    currRow.querySelector("#genderCell").innerText;
  document.getElementById("birthdayField").value = currRow
    .querySelector("#birthdayCell")
    .innerText.split(".")
    .reverse()
    .join("-");
  document.getElementById("formStudentPane").classList.add("selected");
}

function fillStudForEdit(currRow) {
  currRow.querySelector("#groupCell").innerText =
    document.getElementById("groupSelect").value;
  currRow.querySelector("#nameCell").innerText =
    document.getElementById("firstNameField").value +
    " " +
    document.getElementById("lastNameField").value;
  currRow.querySelector("#genderCell").innerText =
    document.getElementById("genderSelect").value;
  currRow.querySelector("#birthdayCell").innerText = document
    .getElementById("birthdayField")
    .value.split("-")
    .reverse()
    .join(".");
}

export function editStudent(currRow) {
  const editedStudent = getStudFormInfo(
    currRow.querySelector("#idCell").innerText
  );
  console.log(JSON.stringify(editedStudent));
  sendRequest("PUT", apiURL, editedStudent).then(
    () => {
      fillStudForEdit(currRow);
    },
    (error) => {
      showErrorMsg(error.code, error.message);
    }
  );
}
