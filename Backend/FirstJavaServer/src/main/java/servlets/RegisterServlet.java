package servlets;

import model.User;
import database.UserDAO;
import service.user.UserService;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONObject;

@WebServlet(name="RegisterServlet", value="/register")
public class RegisterServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        try {
            User user = UserService.getUserFromReq(request, response);
            if(user != null) {
                UserDAO userDAO = new UserDAO();
                int registerResult = userDAO.registerUser(user.getUsername(), user.getPassword());
                if (registerResult > 0) {
                    response.setStatus(200);
                    response.getWriter().print(new JSONObject(user));
                } else if (registerResult == -10) {
                    response.setStatus(400);
                    response.getWriter().print("User " + user.getUsername() + " has account");
                } else if (registerResult == -30) {
                    response.setStatus(401);
                    response.getWriter().print("User " + user.getUsername() +
                            " has not registered in StudentCMS database");
                } else {
                    response.setStatus(401);
                    response.getWriter().print("User " + user.getUsername() + " was not register");
                }
            }
        }
        catch(Exception error) {
            response.setStatus(500);
        }
    }

}

