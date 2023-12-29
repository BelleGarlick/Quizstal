package org.belle.server.routes;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.belle.controller.Controller;
import org.jetbrains.annotations.NotNull;

public class SetUserPoints implements Handler {

    public static String path = "/api/admin/set-points";

    @Override
    public void handle(@NotNull Context ctx) throws Exception {
        Controller.setUserPoints(
                ctx.formParam("id"),
                Float.parseFloat(ctx.formParam("points"))
        );
        ctx.result("ok");
    }
}
