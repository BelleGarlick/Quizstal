package org.belle.server.routes;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.belle.controller.Controller;
import org.belle.database.models.ViewState;
import org.jetbrains.annotations.NotNull;

public class SetWallpaper implements Handler {

    public static String path = "/api/admin/set-wallpaper";

    @Override
    public void handle(@NotNull Context ctx) throws Exception {
        Controller.setWallpaper(
                ctx.formParam("src")
        );
        ctx.result("ok");
    }
}
