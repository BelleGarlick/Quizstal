package org.belle.server;

import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;
import io.javalin.plugin.bundled.CorsPluginConfig;
import org.belle.server.routes.*;

import java.nio.file.Files;
import java.nio.file.Paths;

public class Server {

    private static final int PORT = 7070;

    public void start() {
        String currentWorkingDirectory = System.getProperty("user.dir");
        String relativePath = "/quizstal-fe/dist";
        String feDataPath = Paths.get(currentWorkingDirectory, relativePath).toString();

        Javalin.create(config -> {
            config.plugins.enableCors(cors -> cors.add(CorsPluginConfig::anyHost));
            config.staticFiles.add(feDataPath, Location.EXTERNAL);
            config.staticFiles.add(GetAssets.contentPath.toString(), Location.EXTERNAL);
        })
                .get("/", ctx -> ctx.html(Files.readString(Paths.get(feDataPath + "/index.html"))))
                .get("/user", ctx -> ctx.html(Files.readString(Paths.get(feDataPath + "/index.html"))))
                .get("/admin", ctx -> ctx.html(Files.readString(Paths.get(feDataPath + "/index.html"))))
                .get(GetState.path, new GetState())
                .post(AddUser.path, new AddUser())
                .post(RemoveUser.path, new RemoveUser())
                .post(SetUserPoints.path, new SetUserPoints())
                .post(NewQuestion.path, new NewQuestion())
                .post(RemoveQuestion.path, new RemoveQuestion())
                .post(SetState.path, new SetState())
                .post(SetBuzzerSound.path, new SetBuzzerSound())
                .post(SetUserImagePath.path, new SetUserImagePath())
                .post(SubmitAnswer.path, new SubmitAnswer())
                .get(GetAssets.path, new GetAssets())
                .post(SetWallpaper.path, new SetWallpaper())
                .post(LoadDb.path, new LoadDb())
                .ws(WebSocketHandler.path, new WebSocketHandler())
                .start(PORT);
    }
}
