package service.user;

import model.User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jsonParser.JSONParser;

public class UserService {

    public static User getUserFromReq(HttpServletRequest request, HttpServletResponse response) {
        try {
            if (!request.getContentType().contentEquals("application/json")) {
                response.setStatus(403);
                response.getWriter().print("The incorrect content-type of HTTP request");
                return null;
            }
            User user = User.getUserFromJSON(JSONParser.getRequestJSON(request.getReader()));
            if(user == null) {
                response.setStatus(400);
                response.getWriter().print("The incorrect user JSON was received");
            }
            return user;
        }
        catch(Exception error) {
            response.setStatus(500);
            return null;
        }
    }
}
