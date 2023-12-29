package org.belle.server.routes;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.belle.controller.Controller;
import org.jetbrains.annotations.NotNull;

public class LoadDb implements Handler {

    public static String path = "/api/admin/load-db";

    @Override
    public void handle(@NotNull Context ctx) throws Exception {
        Controller.connect(
                ctx.formParam("db")
        );
        ctx.result("ok");
    }
}
