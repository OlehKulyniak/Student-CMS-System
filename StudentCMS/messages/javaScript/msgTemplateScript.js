export function getMessageTemplate(messageText, isOwnMessage, username = null) {
  if (isOwnMessage) {
    return `<div class="messagePane ownMessage">
      <div class="messageContentPane">
        <div class="msgRectangle ownMessage">
          <p class="messageText">
              ${messageText}
          </p>
        </div>
        <div class="msgTriangle ownMessage"></div> 
      </div>
      <div class="msgProfileInfoPane">
        <img
          src="pictures/MessageProfile.jpg"
          class="msgProfileImage"
        />
        <p class="msgProfileName ownMessage"}>Me</p>
      </div>
    </div>`;
  } else {
    return `<div class="messagePane receivedMessage">
      <div class="msgProfileInfoPane">
        <img
          src="pictures/MessageProfile.jpg"
          class="msgProfileImage"
        />
        <p class="msgProfileName">${username}</p>
      </div>
      <div class="messageContentPane">
        <div class="msgTriangle"></div>
        <div class="msgRectangle">
          <p class="messageText">
            ${messageText}
          </p>
        </div>
      </div>
    </div>`;
  }
}

export function getChatRoomTemplate(chat_id, chatName, chatMembers = null) {
  return `<div class="chatRoom">
    <img id="chatImage" src="pictures/ProfilePicture.jpg" class="chatRoomImage"
    />
    <p id="chatName" class="chatRoomName">${chatName}</p>
    <p id="chat_id" class="elementIdHidden">${chat_id}</p>
    <div id="chatMembersCont" class="elementIdHidden">${
      chatMembers != null ? chatMembers : null
    }</div>
  </div>`;
}

export function getChatMemberTemplate(user_id, username) {
  return `<div id="currChatMember" class="chatMemberPane">
    <img src="pictures/MessageProfile.jpg" class="chatMemberImage" />
    <p id="currMemberUsername" class="chatMemberUsername">
      ${username}</p>
    <p id="currMember_id" class="elementIdHidden">
      ${user_id}</p>
  </div>`;
}

export function getNewChatMemberTemplate(user_id, username) {
  return `<div id="currNewMemberPane" class="newMemberPane">
    <img src="pictures/MessageProfile.jpg" class="newMemberImage" />
    <p id="currNewMemberUsername" class="newMemberUsername">${username}</p>
    <p id="currNewMember_id" class="elementIdHidden">${user_id}</p>
  </div>`;
}
