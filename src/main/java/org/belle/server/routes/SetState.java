package org.belle.server.routes;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.belle.controller.Controller;
import org.belle.database.models.ViewState;
import org.jetbrains.annotations.NotNull;

public class SetState implements Handler {

    public static String path = "/api/admin/set-state";

    @Override
    public void handle(@NotNull Context ctx) throws Exception {
        int question = -1;
        try {
            question = Integer.parseInt(ctx.formParam("question"));
        } catch (Exception e) {}

        Controller.setState(
                ViewState.fromString(ctx.formParam("view")),
                question
        );
        ctx.result("ok");
    }
}
