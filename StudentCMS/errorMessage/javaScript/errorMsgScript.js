export function showErrorMsg(errorCode, errorMessage) {
  if (errorCode == undefined) {
    errorCode = 503;
  }
  if (errorMessage == "Failed to fetch") {
    errorMessage = "Web server connection error";
  }
  document.getElementById("errorMsgStatus").innerText = "Error " + errorCode;
  document.getElementById("errorMsgInfo").innerText =
    errorMessage.length > 0 ? errorMessage : "The unknown web server error";
  document.getElementById("errorMsgPane").classList.add("selected");
}

document.querySelectorAll(".errorMsgButton").forEach((errorMsgButton) => {
  errorMsgButton.addEventListener("click", () => {
    document.getElementById("errorMsgPane").classList.remove("selected");
  });
});
