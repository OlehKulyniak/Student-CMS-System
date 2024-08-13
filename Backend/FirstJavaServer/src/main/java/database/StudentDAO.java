package database;

import model.Student;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.List;
import java.util.ArrayList;

public class StudentDAO {
    private static final String url = "jdbc:mysql://localhost:3306";
    private static final String username = "root";
    private static final String password = "Geijr12345";
    private static Connection dbConnection;

    private static final String GET_ALL = "SELECT * FROM cms.student";
    private static final String IS_IN_TABLE = "SELECT * FROM cms.student WHERE stud_group = ? AND first_name = ? " +
                                              " AND last_name = ? AND gender = ? AND birthday = ?";
    private static final String GET_STUDENT_PAGE = "SELECT * FROM cms.student LIMIT ? OFFSET ?";
    private static final String ADD_STUDENT = "INSERT INTO cms.student (stud_group, first_name, last_name, gender, birthday)" +
                                              "VALUES(?, ?, ?, ?, ?)";
    private static final String EDIT_STUDENT = "UPDATE cms.student SET stud_group = ?, first_name = ?, last_name = ?," +
                                               "gender = ?, birthday = ? WHERE student_id = ?";
    private static final String DELETE_STUDENT = "DELETE FROM cms.student WHERE student_id = ?";
    public StudentDAO() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            dbConnection = DriverManager.getConnection(url, username, password);
        }
        catch(Exception error) {
            error.printStackTrace();
        }
    }
    public Connection getDBConnection() {
        return dbConnection;
    }
    public List<Student> getStudents(int limit, int offset) {
        try {
            if(!dbConnection.isClosed()) {
                PreparedStatement preparedStatement;
                if(limit > 0) {
                    preparedStatement = dbConnection.prepareStatement(GET_STUDENT_PAGE);
                    preparedStatement.setInt(1, limit);
                    preparedStatement.setInt(2, offset);
                } else {
                    preparedStatement = dbConnection.prepareStatement(GET_ALL);
                }
                ResultSet resultSet = preparedStatement.executeQuery();
                List<Student> studentsList = new ArrayList<>();
                while(resultSet.next()) {
                    studentsList.add(new Student(resultSet.getInt(1),
                                                 resultSet.getString(2),
                                                 resultSet.getString(3),
                                                 resultSet.getString(4),
                                                 resultSet.getString(5).charAt(0),
                                                 resultSet.getDate(6).toLocalDate()));
                }
                return studentsList;
            }
        }
        catch(SQLException error) {
            error.printStackTrace();
        }
        return null;
    }
    public int addNewStudent(Student student) {
        try {
            PreparedStatement preparedStatement = dbConnection.prepareStatement(IS_IN_TABLE);
            fillFullStatement(preparedStatement, student);
//            preparedStatement.setString(1, student.getGroup());
//            preparedStatement.setString(2, student.getFirstName());
//            preparedStatement.setString(3, student.getLastName());
//            preparedStatement.setString(4, String.valueOf(student.getGender()));
//            preparedStatement.setDate(5, Date.valueOf(student.getBirthday()));

            if(preparedStatement.executeQuery().next()) {
                return -10;
            }
            if(!dbConnection.isClosed()) {
                preparedStatement = dbConnection.prepareStatement(ADD_STUDENT);
                fillFullStatement(preparedStatement, student);
//                preparedStatement.setString(1, student.getGroup());
//                preparedStatement.setString(2, student.getFirstName());
//                preparedStatement.setString(3, student.getLastName());
//                preparedStatement.setString(4, String.valueOf(student.getGender()));
//                preparedStatement.setDate(5, Date.valueOf(student.getBirthday().toString()));
                return preparedStatement.executeUpdate();
            }
        }
        catch(SQLException error) {
            error.printStackTrace();
        }
        return -1;
    }
    public int editStudent(Student student) {
        try {
            if(!dbConnection.isClosed()) {
                PreparedStatement preparedStatement = dbConnection.prepareStatement(EDIT_STUDENT);
                preparedStatement.setString(1, student.getGroup());
                preparedStatement.setString(2, student.getFirstName());
                preparedStatement.setString(3, student.getLastName());
                preparedStatement.setString(4, String.valueOf(student.getGender()));
                preparedStatement.setDate(5, Date.valueOf(student.getBirthday().toString()));
                preparedStatement.setInt(6, student.getStudent_id());

                return preparedStatement.executeUpdate();
            }
        }
        catch(SQLException error) {
            error.printStackTrace();
        }
        return -1;
    }
    public int deleteStudent(int id) {
        try {
            if(id < 0) {
                return -2;
            }
            if(!dbConnection.isClosed()) {
                PreparedStatement preparedStatement = dbConnection.prepareStatement(DELETE_STUDENT);
                preparedStatement.setInt(1, id);

                return preparedStatement.executeUpdate();
            }
        }
        catch(SQLException error) {
            error.printStackTrace();
        }
        return -1;
    }

    public void fillFullStatement(PreparedStatement preparedStatement, Student student) throws SQLException {
        preparedStatement.setString(1, student.getGroup());
        preparedStatement.setString(2, student.getFirstName());
        preparedStatement.setString(3, student.getLastName());
        preparedStatement.setString(4, String.valueOf(student.getGender()));
        preparedStatement.setDate(5, Date.valueOf(student.getBirthday()));
    }
}
