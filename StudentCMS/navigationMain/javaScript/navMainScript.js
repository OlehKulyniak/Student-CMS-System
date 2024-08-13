window.addEventListener("load", async () => {
  if (navigator.serviceWorker) {
    try {
      await navigator.serviceWorker.register(
        "../../serviceWorkers/serviceWorker.js"
      );
    } catch (error) {
      console.log("Service worker register error");
    }
    document.getElementById("profileUsername").innerText =
      sessionStorage.getItem("username") != null
        ? sessionStorage.getItem("username")
        : "James Bond";
  }
});

let bellMessageNum = 0;

document.getElementById("bellPane").addEventListener("click", () => {
  document.getElementById("msgMenu").classList.toggle("selected");
  document.querySelectorAll(".msgPane").forEach((msgPane) => {
    msgPane.addEventListener("click", () => {
      window.location.replace("register.html");
    });
  });
  document.getElementById("bellOrangeDot").classList.remove("selected");
});

document.getElementById("profilePane").addEventListener("click", () => {
  document.getElementById("profileMenu").classList.toggle("selected");
  document
    .querySelectorAll(".profileMenuButton")
    .forEach((profileMenuButton) => {
      profileMenuButton.classList.toggle("selected");
    });
});

document.getElementById("logOutButton").addEventListener("click", () => {
  window.location.replace("register.html");
});

// document.querySelectorAll(".tabItem").forEach((tab) => {
//   tab.addEventListener("click", () => {
//     tabItems.forEach((otherTab) => {
//       otherTab.classList.remove("selected");
//     });
//     tab.classList.add("selected");
//   });
// });

// document.getElementById("studentsTab").addEventListener("click", () => {
//   document.getElementById("studentsPane").style = "display: flex";
// });

// document.querySelectorAll(".emptyTab").forEach((emptyTab) =>
//   emptyTab.addEventListener("click", () => {
//     document.getElementById("studentsPane").style = "display: none";
//   })
// );

// export let sockJS = new SockJS("http://localhost:8080/ws");

// export let stompClient = Stomp.over(sockJS);

const onMessageRecieved = (message) => {
  let messageBody = JSON.parse(message.body);
  let userChatRooms_id = JSON.parse(localStorage.getItem("userChatRooms_id"));
  if (userChatRooms_id != null) {
    for (let i = 0; i < userChatRooms_id.length; i++) {
      if (messageBody.chat_id == userChatRooms_id[i]) {
        let messageTemplate = `<div class="msgPane">
        <div class="msgProfile">
          <img
            class="msgBellProfileImage"
            src="pictures/MessageProfile.jpg"
            alt="Image cannot be displayed"
          />
          <p class="msgUsername">${messageBody.senderName.split(" ")[0]}</p>
        </div>
        <div class="msgTriangle bellMessage"></div>
        <div class="msgRect">
          <p class="msgText">${messageBody.messageText}</p>
        </div>
      </div>`;
        document.getElementById("msgMenu").innerHTML += messageTemplate;
        break;
      }
      bellMessageNum++;
      document.getElementById("bellOrangeDot").classList.add("selected");
    }
  }
};

// const onConnect = () => {
//   stompClient.subscribe("/user/1/queue/messages", onMessageRecieved);
// };

// stompClient.connect({}, onConnect);
