package ch.cas.html5.multicardgame.messaging;

import ch.cas.html5.multicardgame.control.GameControlService;
import ch.cas.html5.multicardgame.messages.GameMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@Transactional
public class WebSocketController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private GameControlService gameControlService;
    public void setGameControlService(GameControlService gameControlService){ this.gameControlService = gameControlService; }

    public WebSocketController(GameControlService gameControlService, SimpMessagingTemplate simpMessagingTemplate) {
        this.gameControlService = gameControlService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }


    public void sendToUser(String playgroundId, String userId, GameMessage msg) {
        String dest = "/queue/" + playgroundId + "/" + userId;
        simpMessagingTemplate.convertAndSend(dest, msg);
//        System.out.println("Message sent to: " + dest);
    }

    @MessageMapping("/{gameId}/{playerId}")
    public void handleMessage(@DestinationVariable String gameId, @DestinationVariable String playerId, @RequestBody GameMessage gameMessage) {
        System.out.println("Message received: " + gameMessage.getCommand() + " - from: " + gameId + "/" + playerId);
        gameControlService.handleMessage(gameMessage, gameId, playerId);
    }

}

