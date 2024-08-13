package model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
@Document
public class User {
    @Id
    private String user_id;
    private String username;
    private String password;

    private List<String> chatRooms;

    public User() {
        chatRooms = new ArrayList<>();
    }
    public User(String username, String password) {
        this.username = username;
        this.password = password;
        chatRooms = new ArrayList<>();
    }

    public String getUser_id() {
        return this.user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }
    public String getUsername() { return this.username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() {
        return this.password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public List<String> getChatRooms() {
        return this.chatRooms;
    }
    public void setChatRooms(List<String> chatRooms) {
        this.chatRooms = chatRooms;
    }

}
