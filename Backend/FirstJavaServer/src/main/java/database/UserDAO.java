package database;

import java.sql.*;

public class UserDAO {
    private static final String url = "jdbc:mysql://localhost:3306";
    private static final String username = "root";
    private static final String password = "Geijr12345";
    private static Connection dbConnection;

    private static final String GET_ALL = "SELECT * FROM cms.studentuser";
    private static final String REGISTER_STUDENT = "INSERT INTO cms.studentuser (username, password) VALUES(?, ?)";
    private static final String IS_REGISTERED = "SELECT * FROM cms.studentuser WHERE username=?";

    private static final String IS_IN_TABLE = "SELECT * FROM cms.student WHERE firstName=? AND lastName=?";
    private static final String LOGIN_STUDENT = "SELECT * FROM cms.studentuser WHERE username=? AND password=?";
    public UserDAO() {
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
    public int registerUser(String username, String password) {
        try {
            if(!dbConnection.isClosed()) {
                PreparedStatement preparedStatement;
                preparedStatement = dbConnection.prepareStatement(IS_REGISTERED);
                preparedStatement.setString(1, username);
                if(preparedStatement.executeQuery().next()) {
                    return -10;
                }
                String[] usernameSplit = username.split(" ");
                if(usernameSplit.length < 2) {
                    return -30;
                }
                preparedStatement = dbConnection.prepareStatement(IS_IN_TABLE);
                preparedStatement.setString(1, usernameSplit[0]);
                preparedStatement.setString(2, usernameSplit[1]);
                if(preparedStatement.executeQuery().next()) {
                    preparedStatement = dbConnection.prepareStatement(REGISTER_STUDENT);
                    preparedStatement.setString(1, username);
                    preparedStatement.setString(2, password);
                    return preparedStatement.executeUpdate();
                } else {
                    return -30;
                }
            }
        }
        catch(SQLException error) {
            error.printStackTrace();
        }
        return -1;
    }

    public boolean loginUser(String username, String password) {
        try {
            if(!dbConnection.isClosed()) {
                PreparedStatement preparedStatement;
                preparedStatement = dbConnection.prepareStatement(LOGIN_STUDENT);
                preparedStatement.setString(1, username);
                preparedStatement.setString(2, password);
                return preparedStatement.executeQuery().next();
            }
        }
        catch(SQLException error) {
            error.printStackTrace();
        }
        return false;
    }
}
