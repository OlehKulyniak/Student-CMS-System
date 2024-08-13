package controller;

import org.springframework.http.HttpStatus;
import repository.StudentRepo;
import model.User;
import model.UserInfo;
import repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class RegisterController {
    private final StudentRepo studentRepo;
    private final UserRepo userRepo;

    @Autowired
    public RegisterController(StudentRepo studentRepo, UserRepo userRepo) {
        this.studentRepo = studentRepo;
        this.userRepo = userRepo;
    }

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody User user) {
        String[] usernameSplit = user.getUsername().split(" ");
        if(usernameSplit.length < 2 ||
                         studentRepo.existsByFirstNameAndLastName(usernameSplit[0], usernameSplit[1])) {
            return ResponseEntity.status(400).body("User " + user.getUsername() +
                                                             " has not registered in StudentCMS database");
        }

        if(userRepo.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(400).body("User " + user.getUsername() + " has account");
        } else {
            User savedUser = userRepo.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(new UserInfo(savedUser.getUser_id(),
                                                                               savedUser.getUsername()));
        }
    }
}
