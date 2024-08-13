package repository;

import model.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends MongoRepository<User, String> {
    boolean existsByUsername(String username);

    @Query(value="{_id: ?0}")
    String findUserChatsByUser_id(String user_id);


    @Query(value="{username: ?0, password: ?1}", fields="{_id:  1}")
    String findUser_idByUsernameAndPassword(String username, String password);

//    @Query(value="{_id: ?0}", fields="{chatRooms: 1}")
//    List<String> findChatRoomsByChat_id(String chat_id);


//    @Query(value="")
//    void updateUserByChatRooms(ChatRoom chatRoom)

    @Query(value="{chatRooms: ?0}")
    List<User> findUsersByChatRooms(String chat_id);

}
