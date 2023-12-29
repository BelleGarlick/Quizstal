package org.belle.server.routes;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.belle.controller.Controller;
import org.jetbrains.annotations.NotNull;

public class RemoveUser implements Handler {

    public static String path = "/api/admin/remove-user";

    @Override
    public void handle(@NotNull Context ctx) throws Exception {
        Controller.removeUser(
                ctx.formParam("id")
        );
        ctx.result("ok");
    }
}
