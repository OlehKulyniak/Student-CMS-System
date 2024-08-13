package servlets;

import model.User;
import database.UserDAO;
import service.user.UserService;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONObject;


@WebServlet(name="LoginServlet", value="/login")
public class LoginServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        try {
            User user = UserService.getUserFromReq(request, response);
            if(user != null) {
                UserDAO userDAO = new UserDAO();
                if (userDAO.loginUser(user.getUsername(), user.getPassword())) {
                    response.setStatus(200);
                    response.getWriter().print(new JSONObject(user));
                } else {
                    response.setStatus(400);
                    response.getWriter().print("User " + user.getUsername() + " was not found");
                }
            }
        }
        catch(Exception error) {
            response.setStatus(500);
        }
    }

}
