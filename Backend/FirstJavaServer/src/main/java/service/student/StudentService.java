package service.student;

import model.Student;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONObject;

import java.time.LocalDate;
import java.util.Arrays;

public class StudentService {

    private static final String[] groupArr = { "KN-21", "KN-22", "PZ-23" };
    private static final char[] genderArr = { 'M', 'F', 'O' };

    public static boolean isCorrectStudent(Student student) {
        return student != null &&
                isCorrectGroup(student.getGroup()) &&
                isCorrectName(student.getFirstName()) &&
                isCorrectName(student.getLastName()) &&
                isCorrectGender(student.getGender()) &&
                isCorrectBirthday(student.getBirthday());
    }
    public static boolean isCorrectName(String firstName) {
        return firstName.length() >= 2 && firstName.length() <= 30 &&
                firstName.replaceAll("[A-Z][a-z]*(-[A-Z][a-z]*)*", "").isEmpty();
    }
    public static boolean isCorrectGender(char gender) {
        for(char currGender : genderArr) {
            if(currGender == gender) {
                return true;
            }
        }
        return false;
    }
    public static boolean isCorrectBirthday(LocalDate birthday) {
        return birthday.isAfter(LocalDate.parse("1954-12-31")) &&
                birthday.isBefore(LocalDate.parse("2011-01-01"));
    }
    public static void setDefErrorMsg(HttpServletResponse response) {
        try {
            response.setStatus(500);
            response.getWriter().print("Internal server error");
        }
        catch(Exception error) {
            response.setStatus(500);
            error.printStackTrace();
        }
    }

    public static boolean isCorrectGroup(String group) {
        return Arrays.asList(groupArr).contains(group);
    }

    // Виконувати append на частину повідомлення про помилку в певному полі
    public static String getErrorMessage(JSONObject studentJSON) {
        StringBuilder msgBuild = new StringBuilder("The incorrect ");
        if(!isCorrectGroup(studentJSON.getString("group"))) {
            msgBuild.append("group field, ");
        }
        if(!isCorrectName(studentJSON.getString("firstName"))) {
            msgBuild.append("first name field, ");
        }
        if(!isCorrectName(studentJSON.getString("lastName"))) {
            msgBuild.append("last name field, ");
        }
        if(!isCorrectGender(studentJSON.getString("gender").charAt(0))) {
            msgBuild.append("gender field, ");
        }
        if(!isCorrectBirthday(LocalDate.parse(studentJSON.getString("birthday")))) {
            msgBuild.append("birthday field, ");
        }
        return msgBuild.substring(0, msgBuild.length() - 2);
    }
}
