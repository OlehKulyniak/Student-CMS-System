import {
  sendGetRequest,
  sendRequest,
} from "../../requestMethods/javaScript/fetchRequestScript.js";
import {
  sendVisitPageMsg,
  addChatToUser,
  sendMessage,
} from "./msgMethodScript.js";
import {
  getMessageTemplate,
  getChatRoomTemplate,
  getChatMemberTemplate,
  getNewChatMemberTemplate,
} from "./msgTemplateScript.js";
import { showErrorMsg } from "../../errorMessage/javaScript/errorMsgScript.js";

window.addEventListener("load", async () => {
  let userChatRooms_id = "21d@";
  await sendGetRequest(
    apiURL + "/getChats_id?user_id=" + sessionStorage.getItem("user_id")
  )
    .then((userChats_id) => {
      userChatRooms_id = userChats_id.chatRooms;
      localStorage.setItem(
        "userChatRooms_id",
        JSON.stringify(userChatRooms_id)
      );
      return userChats_id;
    })
    .catch((error) => {
      showErrorMsg(error.code, error.message);
    });

  let userChatRooms;
  await sendGetRequest(apiURL + "/getChats?chats_id=" + userChatRooms_id).then(
    (chatRooms) => {
      userChatRooms = chatRooms.chatRooms;
      return chatRooms;
    }
  );

  let chatRoomUsers;
  for (let i = 0; i < userChatRooms.length; i++) {
    await sendGetRequest(
      apiURL + "/getChatUsers?chat_id=" + userChatRooms[i].chatRoom_id
    ).then((chatUsers) => {
      chatRoomUsers = chatUsers;
      return chatUsers;
    });

    document.getElementById("membersContainer").innerHTML = "";

    let chatMembersTemplate = "";
    chatRoomUsers.forEach((chatRoomUser) => {
      chatMembersTemplate += getChatMemberTemplate(
        chatRoomUser.user_id,
        chatRoomUser.username
      );
    });

    document.getElementById("roomContainer").innerHTML += getChatRoomTemplate(
      userChatRooms[i].chatRoom_id,
      userChatRooms[i].chatName,
      chatMembersTemplate
    );
  }

  document.querySelectorAll(".chatRoom").forEach((chatRoom) => {
    chatRoom.addEventListener("click", () => {
      selectChatRoom(chatRoom);
    });
  });

  sendVisitPageMsg(
    sessionStorage.getItem("user_id"),
    sessionStorage.getItem("username"),
    true
  );

  //Повідомлення до сервера про вхід на сторінку чату
});

window.addEventListener("beforeunload", () => {
  sendVisitPageMsg(
    sessionStorage.getItem("user_id"),
    sessionStorage.getItem("username"),
    false
  );
});

// Повідомлення до сервера про вихід зі сторінки чату

let apiURL = "http://localhost:8080";

let currChat_id = 1;

document.getElementById("createChatButton").addEventListener("click", () => {
  document.getElementById("newChatRoomPane").classList.add("selected");
});

document.querySelectorAll(".chatRoom").forEach((chatRoom) => {
  chatRoom.addEventListener("click", () => {
    document.getElementById("messageContainer").innerHTML = "";
    document.getElementById("membersContainer").innerHTML = "";
    selectChatRoom(chatRoom);
  });
});

async function selectChatRoom(chatRoom) {
  document.querySelectorAll(".chatRoom").forEach((otherChatRoom) => {
    otherChatRoom.classList.remove("selected");
  });

  currChat_id = chatRoom.querySelector("#chat_id").innerText;
  sessionStorage.setItem("currChat_id", currChat_id);

  let chatRoomMessages;
  await sendGetRequest(apiURL + "/getMessages?chat_id=" + currChat_id).then(
    (chatMessages) => {
      chatRoomMessages = chatMessages;
      return chatMessages;
    }
  );

  chatRoom.classList.add("selected");
  chatRoomMessages.forEach((chatRoomMessage) => {
    document.getElementById("messageContainer").innerHTML += getMessageTemplate(
      chatRoomMessage.messageText,
      chatRoomMessage.sender_id == sessionStorage.getItem("user_id"),
      chatRoomMessage.senderName.split(" ")[0]
    );
  });

  document.getElementById("currChatRoomTitle").innerText =
    "Chat room " + chatRoom.querySelector("#chatName").innerHTML;

  chatRoom
    .querySelector("#chatMembersCont")
    .querySelectorAll(".chatMemberPane")
    .forEach((chatMemberPane) => {
      document.querySelector("#membersContainer").innerHTML +=
        chatMemberPane.outerHTML;
    });
}

document
  .getElementById("createChatForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    let chatRoom;
    await sendRequest(
      "POST",
      apiURL + "/saveChat",
      document.getElementById("chatNameField").value
    ).then((response) => {
      chatRoom = {
        chatRoom_id: response.chatRoom_id,
        chatName: response.chatName,
      };
      return response;
    });

    addChatToUser(sessionStorage.getItem("user_id"), chatRoom.chatRoom_id)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        showErrorMsg(error.code, error.message);
      });

    document.getElementById("roomContainer").innerHTML += getChatRoomTemplate(
      chatRoom.chatRoom_id,
      chatRoom.chatName
    );
    document.getElementById("chatNameField").value = "";
    document.getElementById("newChatRoomPane").classList.remove("selected");

    // Неефективна реалізація, можливо змінити
    document.querySelectorAll(".chatRoom").forEach((chatRoom) => {
      chatRoom.addEventListener("click", () => {
        selectChatRoom(chatRoom);
      });
    });
  });

document.getElementById("newCRCloseButton").addEventListener("click", () => {
  document.getElementById("newChatRoomPane").classList.remove("selected");
});

document
  .getElementById("addMemberButton")
  .addEventListener("click", async () => {
    let userInfoArr;
    await sendGetRequest(apiURL + "/getUsers").then((userDetails) => {
      userInfoArr = userDetails;
    });

    document.getElementById("newMembersContainer").innerHTML = "";

    userInfoArr.forEach((userInfo) => {
      if (userInfo.user_id != sessionStorage.getItem("user_id")) {
        document.getElementById("newMembersContainer").innerHTML +=
          getNewChatMemberTemplate(userInfo.user_id, userInfo.username);
      }
    });

    document.querySelectorAll(".newMemberPane").forEach((newMemberPane) => {
      newMemberPane.setAttribute("onclick", newMemberPaneClick(newMemberPane));
    });
    document.getElementById("addMembersPane").classList.add("selected");
  });

document
  .getElementById("newMembersCloseButton")
  .addEventListener("click", () => {
    document.getElementById("addMembersPane").classList.remove("selected");
  });

function newMemberPaneClick(newMemberPane) {
  newMemberPane.addEventListener("click", () => {
    newMemberPane.classList.toggle("selected");
  });
}

document
  .getElementById("addMembersSubmit")
  .addEventListener("click", async () => {
    let selectedUsers = document
      .getElementById("newMembersContainer")
      .querySelectorAll(".newMemberPane.selected");

    let chatMemberTemplate;

    let chatMembersCont = document
      .querySelector(".chatRoom.selected")
      .querySelector("#chatMembersCont");
    selectedUsers.forEach(async (selectedUser) => {
      addChatToUser(
        selectedUser.querySelector("#currNewMember_id").innerText,
        currChat_id
      ).then((updateResult) => {
        return updateResult;
      });

      chatMemberTemplate = getChatMemberTemplate(
        selectedUser.querySelector("#currNewMember_id").innerText,
        selectedUser.querySelector("#currNewMemberUsername").innerText
      );

      document.getElementById("membersContainer").innerHTML +=
        chatMemberTemplate;

      chatMembersCont.innerHTML += chatMemberTemplate;
    });

    document.getElementById("addMembersPane").classList.remove("selected");
  });

document.getElementById("sendMsgForm").addEventListener("submit", (event) => {
  event.preventDefault();

  sendMessage(document.getElementById("newMsgField").value, currChat_id);
  document.getElementById("newMsgField").value = "";
});
