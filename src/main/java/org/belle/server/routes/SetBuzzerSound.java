package org.belle.server.routes;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.belle.controller.Controller;
import org.jetbrains.annotations.NotNull;

public class SetBuzzerSound implements Handler {

    public static String path = "/api/admin/set-buzzer";

    @Override
    public void handle(@NotNull Context ctx) throws Exception {
        Controller.setBuzzerSound(
                ctx.formParam("userId"),
                ctx.formParam("buzzer")
        );
        ctx.result("ok");
    }
}
