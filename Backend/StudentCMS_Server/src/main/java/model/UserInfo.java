package model;

public class UserInfo {
    private String user_id;
    private String username;

    private boolean isEntered;

    public UserInfo() { }

    public UserInfo(String user_id, String username) {
        this.user_id = user_id;
        this.username = username;
    }

    public UserInfo(String user_id, String username, boolean isEntered) {
        this.user_id = user_id;
        this.username = username;
        this.isEntered = isEntered;
    }

    public String getUser_id() {
        return this.user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean getIsEntered() {
        return this.isEntered;
    }

    public void setIsEntered(boolean isEntered) {
        this.isEntered = isEntered;
    }
}
