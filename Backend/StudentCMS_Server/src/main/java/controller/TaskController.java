package controller;

import model.Task;
import repository.TaskRepo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class TaskController {

    private final TaskRepo taskRepo;

    @GetMapping("/api/v1/tasks/{id}")
    public ResponseEntity<Object> getTask(@PathVariable String id) {
        Task task = taskRepo.findById(id).orElse(null);
        return ResponseEntity.ok(task);
    }

    @GetMapping("/api/v1/tasks/user/{user_id}")
    public ResponseEntity<Object> getTasks(@PathVariable String user_id) {
        List<Task> tasks = taskRepo.findAllByUser_id(user_id);
        return ResponseEntity.status(HttpStatus.OK).body(tasks);
    }

    @PostMapping("/api/v1/tasks")
    public ResponseEntity<Object> saveTask(@RequestBody Task task) {
        return ResponseEntity.status(HttpStatus.CREATED).body(taskRepo.save(task));
    }

    @PutMapping("/api/v1/tasks/{id}")
    public ResponseEntity<Object> updateTask(@PathVariable String id, @RequestBody Task task) {
        if(taskRepo.findTaskById(id).isPresent()) {
            Task updatedTask = taskRepo.save(task);
            return ResponseEntity.status(HttpStatus.OK).body(updatedTask);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Task with id = " + id + "doesn't exist");
    }

}
