import { sendRequest } from "../../requestMethods/javaScript/fetchRequestScript.js";
import { stompClient } from "../../navigationMain/javaScript/navMainScript.js";
import { getMessageTemplate } from "./msgTemplateScript.js";

export function sendVisitPageMsg(user_id, username, isEntered) {
  stompClient.send(
    "/app/student",
    {},
    JSON.stringify({
      user_id: user_id,
      username: username,
      isEntered: isEntered,
    })
  );
}

export async function addChatToUser(user_id, chat_id) {
  return await sendRequest(
    "POST",
    apiURL + "/addChat" + "?user_id=" + user_id,
    chat_id
  );
}

const onMessageRecieved = (message) => {
  if (
    JSON.parse(message.body).chatRoom_id !=
    sessionStorage.getItem("currChat_id")
  ) {
    document.getElementById("messageContainer").innerHTML += getMessageTemplate(
      JSON.parse(message.body).messageText,
      JSON.parse(message.body).sender_id == sessionStorage.getItem("user_id"),
      JSON.parse(message.body).senderName.split(" ")[0]
    );
  }
};

const onConnect = () => {
  stompClient.subscribe("/user/1/queue/messages", onMessageRecieved);
};

stompClient.connect({}, onConnect);

export function sendMessage(messageText, currChat_id) {
  if (messageText.trim() != "") {
    const message = {
      chat_id: currChat_id,
      sender_id: sessionStorage.getItem("user_id"),
      senderName: sessionStorage.getItem("username"),
      messageText: messageText,
    };

    stompClient.send("/app/chat", {}, JSON.stringify(message));
  }
}
