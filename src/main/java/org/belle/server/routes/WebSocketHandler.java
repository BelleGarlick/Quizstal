package org.belle.server.routes;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.javalin.websocket.WsConfig;
import io.javalin.websocket.WsContext;
import org.belle.controller.Controller;
import org.belle.server.models.WebSocketRequest;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Consumer;

public class WebSocketHandler implements Consumer<WsConfig> {

    public static String path = "/ws";

    private static final Map<WsContext, Integer> clients = new ConcurrentHashMap<>();

    public WebSocketHandler() {
        Controller.addBroadcastHandler((id, message) -> {
            broadcast("{\"id\": \""+id+"\", \"data\": "+message+"}");
        });
    }

    @Override
    public void accept(WsConfig wsConfig) {
        wsConfig.onConnect(ctx -> clients.put(ctx, 0));
        wsConfig.onClose(clients::remove);
        wsConfig.onMessage(ctx -> {
            String rawMessage = ctx.message();
            WebSocketRequest req = new ObjectMapper().readValue(rawMessage, WebSocketRequest.class);

            switch (req.id) {
                case "ping": break;
                case "playAudio":
                case "stopAllAudio": {broadcast(rawMessage); break;}
                default: {
                    System.out.println("Unknown sockets request: " + req.id);
                }
            }

        });
    }

    private void broadcast(String message) {
        clients.keySet().forEach(socket -> socket.send(message));
    }
}
