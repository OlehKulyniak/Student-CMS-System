package controller;

import model.ChatMessage;
import model.UserInfo;
import repository.ChatMessageRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("message")
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    private final ChatMessageRepo chatMessageRepo;

    @Autowired
    ChatController(SimpMessagingTemplate messagingTemplate, ChatMessageRepo chatMessageRepo) {
        this.messagingTemplate = messagingTemplate;
        this.chatMessageRepo = chatMessageRepo;
    }

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) {
        chatMessageRepo.save(chatMessage);
        messagingTemplate.convertAndSendToUser(String.valueOf(1),
                                      "/queue/messages",
                                                chatMessage);
    }


    @MessageMapping("/student")
    public void processStudent(@Payload UserInfo studentMessage) {
        messagingTemplate.convertAndSendToUser(String.valueOf(1),
                "/queue/students",
                studentMessage);
    }

}
