package org.belle.server.routes;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.belle.controller.Controller;
import org.jetbrains.annotations.NotNull;

public class SubmitAnswer implements Handler {

    public static String path = "/api/submit-answer";

    @Override
    public void handle(@NotNull Context ctx) throws Exception {
        Controller.submitAnswer(
                ctx.formParam("userId"),
                ctx.formParam("answer")
        );
        ctx.result("ok");
    }
}
