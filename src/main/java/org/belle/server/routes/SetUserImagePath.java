package org.belle.server.routes;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.belle.controller.Controller;
import org.jetbrains.annotations.NotNull;

public class SetUserImagePath implements Handler {

    public static String path = "/api/admin/set-image-path";

    @Override
    public void handle(@NotNull Context ctx) throws Exception {
        Controller.setUserImagePath(
                ctx.formParam("userId"),
                ctx.formParam("image")
        );
        ctx.result("ok");
    }
}
