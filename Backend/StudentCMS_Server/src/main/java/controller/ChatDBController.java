package controller;


import model.ChatMessage;
import model.ChatRoom;
import model.User;
import model.UserInfo;
import repository.ChatMessageRepo;
import repository.ChatRoomRepo;
import repository.UserRepo;
import repository.UserTemplateRepo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.HttpStatus;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
public class ChatDBController {
    ChatMessageRepo chatMessageRepo;

    ChatRoomRepo chatRoomRepo;

    UserRepo userRepo;


    @Autowired
    ChatDBController(ChatMessageRepo chatMessageRepo, ChatRoomRepo chatRoomRepo,
                     UserRepo userRepo) {
        this.chatMessageRepo = chatMessageRepo;
        this.chatRoomRepo = chatRoomRepo;
        this.userRepo = userRepo;
    }

    @PostMapping("/saveMessage")
    public ResponseEntity<Object> saveMessage(@RequestBody ChatMessage chatMessage) {
        return ResponseEntity.status(HttpStatus.CREATED).body(chatMessageRepo.save(chatMessage));
    }

    @GetMapping("/getMessages")
    public ResponseEntity<Object> getMessages(@RequestParam("chat_id") String chatRoom_id) {
        return ResponseEntity.status(200).body(chatMessageRepo.findByChatRoom_id(chatRoom_id));
    }

    @PostMapping("/saveChat")
    public ResponseEntity<ChatRoom> saveChat(@RequestBody ChatRoom chatRoom) {
        return new ResponseEntity<>(chatRoomRepo.save(chatRoom), HttpStatus.OK);
    }

    @PostMapping("/addChat")
    public ResponseEntity<Object> addChatRoom(@RequestParam("user_id") String user_id,
                                      @RequestBody String chatRoom_id) {
        UserTemplateRepo userTemplateRepo = new UserTemplateRepo();
        return ResponseEntity.status(200).body(userTemplateRepo.addNewChatRoom(user_id, chatRoom_id));
    }

    @GetMapping("/getChats")
    public ResponseEntity<Object> getUserChatRooms(@RequestParam("chats_id") List<String> userListChats_id) {
        JSONArray jsonArray = new JSONArray(chatRoomRepo.findChatRoomsWithId(userListChats_id));
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("chatRooms", jsonArray);
        return ResponseEntity.status(200).body(jsonObject.toString());
    }

    @GetMapping("/getChat")
    public ResponseEntity<Object> getChatRoom(@RequestParam("chat_id") String chat_id) {
        return ResponseEntity.status(200).body(chatRoomRepo.findRoomByChatRoom_id(chat_id));
    }

    @GetMapping("/getChatUsers")
    public ResponseEntity<Object> getChatRoomUsers(@RequestParam("chat_id") String chat_id) {
        return ResponseEntity.status(200).body(userRepo.findUsersByChatRooms(chat_id));
    }

    @GetMapping("/getChats_id")
    public ResponseEntity<Object> getUser(@RequestParam("user_id") String user_id) {
        return ResponseEntity.status(200).body(userRepo.findUserChatsByUser_id(user_id));
    }

    @GetMapping("/getUsers")
    public ResponseEntity<Object> getUsers() {
        List<UserInfo> userInfoList = new ArrayList<>();
        for(User user : userRepo.findAll()) {
            userInfoList.add(new UserInfo(user.getUser_id(), user.getUsername()));
        }
        return ResponseEntity.status(200).body(userInfoList);
    }
}
