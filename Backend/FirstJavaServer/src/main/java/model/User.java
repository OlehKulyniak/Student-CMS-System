package model;

import org.json.JSONObject;

public class User {
    //private int student_id;
    private String username;
    private String password;

    public User() {}
    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
//    public int getStudent_id() {
//        return this.student_id;
//    }
//    public void setStudent_id(int student_id) {
//        this.student_id = student_id;
//    }
    public String getUsername() { return this.username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() {
        return this.password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public static User getUserFromJSON(JSONObject jsonObject) {
        if(jsonObject == null || !jsonObject.has("username") || !jsonObject.has("password")) {
            return null;
        }
        return new User(
                jsonObject.getString("username"),
                jsonObject.getString("password"));

    }
}
