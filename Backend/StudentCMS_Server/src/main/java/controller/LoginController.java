package controller;

import model.User;
import model.UserInfo;
import repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class LoginController {
    private final UserRepo userRepo;

    @Autowired
    public LoginController(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody User user) {
        String user_id = userRepo.findUser_idByUsernameAndPassword(user.getUsername(), user.getPassword());
        if(user_id != null) {
            return ResponseEntity.status(200).body(new UserInfo(getObject_id(user_id), user.getUsername()));
        } else {
            return ResponseEntity.status(400).body("User " + user.getUsername() + " was not found");
        }
    }

    public String getObject_id(String jsonElem_id) {
        JSONObject jsonObject = new JSONObject(jsonElem_id);
        return jsonObject.getJSONObject("_id").getString("$oid");

    }
}
