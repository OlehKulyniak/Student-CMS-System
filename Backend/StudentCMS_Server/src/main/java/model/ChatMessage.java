package model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document
public class ChatMessage {
    @Id
    private String message_id;
    private String chatRoom_id;
    private String sender_id;

    private String senderName;

    private String messageText;

//    private Date timestamp;
//
//    private MessageStatus status;

    public ChatMessage() {

    }
    public ChatMessage(String message_id, String chatRoom_id, String sender_id,
                       String senderName, String messageText) {
        this.message_id = message_id;
        this.chatRoom_id = chatRoom_id;
        this.sender_id = sender_id;
        this.senderName = senderName;
        this.messageText = messageText;
    }

    public String getChat_id() {
        return this.chatRoom_id;
    }

    public void setChat_id(String chatRoom_id) {
        this.chatRoom_id = chatRoom_id;
    }

    public String getSender_id() {
        return this.sender_id;
    }

    public void setSender_id(String sender_id) {
        this.sender_id = sender_id;
    }

    public String getMessageText() {
        return this.messageText;
    }

    public String getSenderName() {
        return this.senderName;
    }

//    public Date getTimestamp() {
//        return this.timestamp;
//    }


}
