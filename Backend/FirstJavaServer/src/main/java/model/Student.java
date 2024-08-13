package model;

import org.json.JSONObject;
import java.time.LocalDate;
public class Student {
    private int student_id;
    private String group;
    private String firstName;
    private String lastName;
    private char gender;
    private LocalDate birthday;
    public Student() {}
    public Student(int student_id, String group, String firstName, String lastName, char gender, LocalDate birthday) {
        this.student_id = student_id;
        this.group = group;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.birthday = birthday;
    }
    public int getStudent_id() {
        return student_id;
    }
    public void setStudent_id(int student_id) {
        this.student_id = student_id;
    }
    public String getGroup() {
        return group;
    }
    public void setGroup(String group) {
        this.group = group;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public char getGender() {
        return gender;
    }
    public void setGender(char gender) {
        this.gender = gender;
    }
    public LocalDate getBirthday() {
        return birthday;
    }
    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }
    public static Student getStudFromJSON(JSONObject jsonObject) {
        if(jsonObject == null || !jsonObject.has("id") || !jsonObject.has("group") ||
           !jsonObject.has("firstName") || !jsonObject.has("lastName") ||
           !jsonObject.has("gender") || !jsonObject.has("birthday")) {
            return null;
        }
         return new Student(jsonObject.getInt("id"),
                jsonObject.getString("group"),
                jsonObject.getString("firstName"),
                jsonObject.getString("lastName"),
                jsonObject.getString("gender").charAt(0),
                LocalDate.parse(jsonObject.getString("birthday")));

    }
    public JSONObject toJSON() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", student_id);
        jsonObject.put("group", group);
        jsonObject.put("firstName", firstName);
        jsonObject.put("lastName", lastName);
        jsonObject.put("gender", String.valueOf(gender));
        jsonObject.put("birthday", birthday);
        return jsonObject;
    }
}
