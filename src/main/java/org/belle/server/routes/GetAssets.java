package org.belle.server.routes;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.belle.server.models.AssetsResponse;
import org.jetbrains.annotations.NotNull;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class GetAssets implements Handler {

    public static String path = "/api/assets";

    public static Path contentPath = Paths.get(System.getProperty("user.dir"), "/assets");

    private final List<String> AUDIO_FILE_TYPES = List.of("mp3", "m4a");
    private final List<String> IMAGE_FILE_TYPES = List.of("png", "jpg", "jpeg");

    @Override
    public void handle(@NotNull Context ctx) throws Exception {
        List<String> files = scan(contentPath)
                .stream()
                .map(x -> contentPath.relativize(x).toString())
                .collect(Collectors.toList());

        AssetsResponse assets = AssetsResponse.builder()
                .images(files.stream()
                        .filter(x -> {
                            for (String suffix: IMAGE_FILE_TYPES) {
                                if (x.toLowerCase().endsWith(suffix))
                                    return true;
                            }
                            return false;
                        })
                        .collect(Collectors.toList()))
                .audio(files.stream()
                        .filter(x -> {
                            for (String suffix: AUDIO_FILE_TYPES) {
                                if (x.toLowerCase().endsWith(suffix))
                                    return true;
                            }
                            return false;
                        })
                        .collect(Collectors.toList()))
                .build();

        ctx.result(new ObjectMapper().writeValueAsString(assets));
    }

    private ArrayList<Path> scan(Path path) {
        ArrayList<Path> files = new ArrayList<>();

        try {
            Files.list(path)
                    .forEach(subpath -> {
                        if (Files.isDirectory(subpath))
                            files.addAll(scan(subpath));
                        else
                            files.add(subpath);
                    });
        } catch (Exception e) {
            System.out.println(e);
        }

        return files;
    }
}
