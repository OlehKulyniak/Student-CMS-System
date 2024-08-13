import { sendGetRequest } from "../../requestMethods/javaScript/fetchRequestScript.js";
import {
  studentsTable,
  createStudRow,
  apiURL,
  setOptionsAction,
  setMainCheckAction,
} from "./studentsScript.js";
import { showErrorMsg } from "../../errorMessage/javaScript/errorMsgScript.js";

let tableHeader = document.getElementById("tableHeader").innerHTML;

export const pageSize = 4;

let currActiveButton = document.getElementById("leftNumPagination");

let numPaginButtons = document.querySelectorAll(".numPaginButton");

document.getElementById("leftPaginButton").disabled = true;

export let studentsOnPage = 0;

export function setStudentsOnPage(newStudentsOnPage) {
  studentsOnPage = newStudentsOnPage;
}

export let currStudentId = 0;

export function setCurrStudentId(tempCurrStudentId) {
  currStudentId = tempCurrStudentId;
}

numPaginButtons.forEach((numPaginButton) => {
  numPaginButton.addEventListener("click", () => {
    numPaginButtonClick(numPaginButton);
  });
});

document.querySelectorAll(".arrowPaginButton").forEach((arrowPaginButton) => {
  arrowPaginButton.addEventListener("click", () => {
    arrowPaginButtonClick(
      arrowPaginButton.getAttribute("id") == "leftPaginButton"
        ? "leftNumPagination"
        : "rightNumPagination",
      Number(currActiveButton.innerText) +
        (arrowPaginButton.getAttribute("id") == "leftPaginButton" ? -1 : 1)
    );
  });
});

document.querySelectorAll(".edgePaginButton").forEach((edgePaginButton) => {
  edgePaginButton.addEventListener("click", () => {
    if (
      edgePaginButton.getAttribute("id") == "leftNumPagination" &&
      document.getElementById("leftPaginButton").disabled != true
    ) {
      currActiveButton.classList.remove("selected");
      edgePaginButtonClick(
        "leftNumPagination",
        Number(currActiveButton.innerText)
      );
    } else if (
      edgePaginButton.getAttribute("id") == "rightNumPagination" &&
      document.getElementById("rightPaginButton").disabled != true
    ) {
      currActiveButton.classList.remove("selected");
      edgePaginButtonClick(
        "rightNumPagination",
        Number(currActiveButton.innerText)
      );
    }
  });
});

function numPaginButtonClick(numPaginButton) {
  if (currActiveButton.innerText != numPaginButton.innerText) {
    currActiveButton.classList.remove("selected");
    document.getElementById("leftPaginButton").disabled =
      numPaginButton.innerText == 1;
    // document.getElementById("RightPaginButton").disabled =
    //   numPaginButton.innerText >= Math.ceil(currStudentNum / pageSize);

    // Можливо доробити отримання загальної кількості студентів з бази даних
    // if (numPaginButton.innerText == Math.ceil(currStudentNum / pageSize)) {
    //   getRightPaginButtons(numPaginButton.innerText).forEach(
    //     (rightPaginButton) => {
    //       rightPaginButton.disabled = true;
    //     }
    //   );
    // }
    fillNewPage(numPaginButton.innerText);
    numPaginButton.classList.add("selected");
    currActiveButton = numPaginButton;
  }
}

export function fillNewPage(currPageIndex) {
  let currPageRows = tableHeader;
  studentsOnPage = 0;
  sendGetRequest(
    apiURL + "?limit=4" + "&offset=" + 4 * Number(currPageIndex - 1)
  ).then(
    (jsonArr) => {
      jsonArr.forEach((jsonElement) => {
        currPageRows += createStudRow(
          jsonElement["id"],
          jsonElement["group"],
          jsonElement["firstName"],
          jsonElement["lastName"],
          jsonElement["gender"],
          jsonElement["birthday"]
        );
        if (currStudentId < Number(jsonElement["id"])) {
          setCurrStudentId(jsonElement["id"]);
        }
        studentsOnPage++;
      });
      studentsTable.innerHTML = currPageRows;
      studentsTable
        .querySelector("#mainCheckBox")
        .addEventListener("click", () => {
          setMainCheckAction();
        });
      studentsTable.querySelectorAll(".studentRow").forEach((studentRow) => {
        setOptionsAction(studentRow);
      });
      document.getElementById("rightPaginButton").disabled = studentsOnPage < 4;
    },
    (error) => {
      showErrorMsg(error.code, error.message);
    }
  );
}

function edgePaginButtonClick(idOfButton, nextActiveButton) {
  setNewPaginValues(
    Number(document.getElementById("leftNumPagination").innerText) +
      (idOfButton == "leftNumPagination" ? -1 : 1)
  );
  currActiveButton = getNextPaginButton(nextActiveButton);
  currActiveButton.classList.add("selected");
}

function arrowPaginButtonClick(idOfButton, nextActiveButtonNum) {
  let nextActiveButton;
  if (currActiveButton.getAttribute("id") == idOfButton) {
    setNewPaginValues(
      Number(document.getElementById("leftNumPagination").innerText) +
        (idOfButton == "leftNumPagination" ? -1 : 1)
    );
  } else {
    currActiveButton.classList.remove("selected");
    nextActiveButton = getNextPaginButton(nextActiveButtonNum);
  }
  numPaginButtonClick(nextActiveButton);
}

function getNextPaginButton(nextActiveButton) {
  for (let i = 0; i < numPaginButtons.length; i++) {
    if (numPaginButtons[i].innerText == nextActiveButton) {
      return numPaginButtons[i];
    }
  }
  return null;
}

function setNewPaginValues(leftValue) {
  numPaginButtons.forEach((numPaginButton) => {
    numPaginButton.innerText = leftValue++;
  });
}

export function setDelAttrPaginButton() {
  if (studentsOnPage < 0 && currActiveButton.innerText != 1) {
    numPaginButtonClick(
      getNextPaginButton(Number(currActiveButton.innerText) - 1)
    );
  }

  if (
    studentsOnPage < Number(currActiveButton.innerText) * pageSize &&
    currActiveButton.innerText > 3
  ) {
    currActiveButton.classList.remove("selected");
    setNewPaginValues(Number(currActiveButton.innerText) - 3);
    currActiveButton = document.getElementById("rightNumPagination");
    currActiveButton.classList.add("selected");
    document.getElementById("rightPaginButton").disabled = true;
  } else if (currStudentId < Number(currActiveButton.innerText) * pageSize) {
    fillNewPage(currActiveButton.innerText);
    document.getElementById("rightPaginButton").disabled = true;
  }
}

// function getRightPaginButtons(pageButtonValue) {
//   let paginButtons = [];
//   numPaginButtons.forEach((numPaginButton) => {
//     if (numPaginButton.innerText == pageButtonValue) {
//       paginButtons.push(numPaginButton);
//     }
//   });
//   return paginButtons;
// }

// let students = [
//   {
//     group: "KN-21",
//     name: "Jonh Smith",
//     gender: "M",
//     birthday: "11.05.2004",
//     status: true,
//   },
//   {
//     group: "KN-22",
//     name: "Ann Bond",
//     gender: "F",
//     birthday: "24.04.2004",
//     status: false,
//   },
//   {
//     group: "PZ-23",
//     name: "Kulyniak Oleh",
//     gender: "M",
//     birthday: "30.09.2005",
//     status: true,
//   },
//   {
//     group: "PZ-23",
//     name: "Vorobets Oleh",
//     gender: "M",
//     birthday: "26.02.2005",
//     status: true,
//   },
//   {
//     group: "PZ-23",
//     name: "Tarasiuk Oles",
//     gender: "M",
//     birthday: "20.05.2005",
//   },
// ];

// for (i = 0; i < 4; i++) {
//   for (j = 0; j < students.length; j++) {
//     let color =
//       Math.random >= 0.5
//         ? "background-color: #689E39;"
//         : "background-color: #D8D8D8;";
//     let template = `
//   <tr align="center">
//       <td class="CheckBoxCell">
//         <input type="checkbox" class="CheckBox" />
//         <div id="CheckMark"></div>
//       </td>
//       <td id="GroupCell">${students[j].group}</td>
//       <td id="NameCell">${students[j].name}</td>
//       <td id="GenderCell">${students[j].gender}</td>
//       <td id="BirthdayCell">${students[j].birthday}</td>
//       <td><div id="StatusMark" style="${color}"></div> </td>
//       <td>
//         <div id="OptionsPane">
//         <button id="EditButton" class="OptionButton" onclick="editButtonClick(this)">
//           <span class="material-symbols-outlined">edit</span>
//         </button>
//         <button id="DeleteButton" class="OptionButton" onclick="showDeletionPane(this)">✕</button>
//         </div>
//     </td>
//   </tr>
//   `;
//     if (currStudent < pageSize * Number(currActiveButton.innerText)) {
//       studentsTable.innerHTML += template;
//     }
//     studentsArr[currStudent] = template;
//     currStudent++;
//     document.getElementById("RightPaginButton").disabled =
//       currActiveButton.innerText >= currStudent / pageSize;
//   }
// }
