package org.belle.server.routes;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.belle.controller.Controller;
import org.belle.database.models.User;
import org.jetbrains.annotations.NotNull;

public class AddUser implements Handler {

    public static String path = "/api/admin/add-user";

    @Override
    public void handle(@NotNull Context ctx) throws Exception {
        Controller.createUser(ctx.formParam("name"));

        ctx.result("ok");
    }
}
