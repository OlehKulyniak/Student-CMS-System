import { sendRequest } from "../../requestMethods/javaScript/fetchRequestScript.js";
import { showErrorMsg } from "../../errorMessage/javaScript/errorMsgScript.js";

document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  let userDetails = {
    username: document.getElementById("usernameField").value,
    password: document.getElementById("passwordField").value,
  };

  sendRequest("POST", "http://localhost:8080/register", userDetails).then(
    (jsonArr) => {
      sessionStorage.setItem("user_id", jsonArr["user_id"]);
      sessionStorage.setItem("username", userDetails.username);
      window.location.replace("messages.html");
    },
    (error) => {
      showErrorMsg("", error.message);
    }
  );
});
