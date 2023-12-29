package org.belle.server.routes;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.belle.controller.Controller;
import org.jetbrains.annotations.NotNull;

public class GetState implements Handler {

    public static String path = "/api/get-state";

    @Override
    public void handle(@NotNull Context ctx) throws Exception {
        ctx.result(new ObjectMapper().writeValueAsString(Controller.getState()));
    }
}
