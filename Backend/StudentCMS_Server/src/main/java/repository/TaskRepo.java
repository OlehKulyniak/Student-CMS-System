package repository;

import model.Task;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;
import java.util.Optional;

public interface TaskRepo extends MongoRepository<Task, String> {

    @Query(value = "{_id: ?0}")
    Optional<Task> findTaskById(String id);

    @Query(value = "{user_id: ?0}")
    List<Task> findAllByUser_id(String user_id);

    @Query(value = "{_id: ?0}")
    Task updateTaskById(String id, Task task);

//    List<Task> findAll();
}
