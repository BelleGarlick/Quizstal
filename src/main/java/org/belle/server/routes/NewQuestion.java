package org.belle.server.routes;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.belle.controller.Controller;
import org.belle.database.models.QuestionType;
import org.jetbrains.annotations.NotNull;

public class NewQuestion implements Handler {

    public static String path = "/api/admin/new-question";

    @Override
    public void handle(@NotNull Context ctx) throws Exception {
        Controller.newQuestion(
                ctx.formParam("question"),
                QuestionType.fromString(ctx.formParam("type")),
                ctx.formParam("options"),
                ctx.formParam("answers"),
                ctx.formParam("media")
        );

        ctx.result("ok");
    }
}
