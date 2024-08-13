package model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
@Document
public class ChatRoom {
    @Id
    private String chatRoom_id;

    private String chatName;

    public ChatRoom() {}

    public ChatRoom(String chatName) {
        this.chatName = chatName;
    }

    public ChatRoom(String chatRoom_id, String chatName) {
        this.chatRoom_id = chatRoom_id;
        this.chatName = chatName;
    }

    public String getChatRoom_id() {
        return this.chatRoom_id;
    }

    public void setChatRoom_id(String chatRoom_id) {
        this.chatRoom_id = chatRoom_id;
    }

    public String getChatName() { return this.chatName; }

    public void setChatName(String chat_name) {
        this.chatName = chat_name;
    }

}
