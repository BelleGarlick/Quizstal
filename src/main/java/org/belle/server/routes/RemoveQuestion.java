package org.belle.server.routes;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.belle.controller.Controller;
import org.belle.database.models.QuestionType;
import org.jetbrains.annotations.NotNull;

public class RemoveQuestion implements Handler {

    public static String path = "/api/admin/remove-question";

    @Override
    public void handle(@NotNull Context ctx) throws Exception {
        Controller.removeQuestion(Integer.parseInt(ctx.formParam("id")));

        ctx.result("ok");
    }
}
