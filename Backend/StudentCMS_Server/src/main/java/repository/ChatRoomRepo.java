package repository;

import model.ChatRoom;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomRepo extends MongoRepository<ChatRoom, String> {

    @Query(value="{_id: ?0}")
    ChatRoom findRoomByChatRoom_id(String chatRoom_id);

    @Query(value="{_id: {$in : ?0 }}")
    List<ChatRoom> findChatRoomsWithId(List<String> userChats_id);

}
