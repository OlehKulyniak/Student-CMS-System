package repository;

import model.ChatMessage;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ChatMessageRepo extends MongoRepository<ChatMessage, String> {
    @Query(value="{'chatRoom_id': ?0}")
    List<ChatMessage> findByChatRoom_id(String chatRoom_id);
}
