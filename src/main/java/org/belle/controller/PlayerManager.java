package org.belle.controller;

import org.belle.database.Database;
import org.belle.database.models.User;
import org.belle.utils.RandomStringGenerator;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class PlayerManager {

    private static Database connection;

    private static final Map<String, User> players = new ConcurrentHashMap<>();

    private static final AutoSaverTime autoSaver = new AutoSaverTime(PlayerManager::save);

    public static void setConnection(Database connection) throws SQLException {
        players.clear();
        PlayerManager.connection = connection;
        connection.getUsers().forEach(player -> players.put(player.id, player));
    }

    public static void createUser(String name) {
        String id = RandomStringGenerator.generateRandomString(24);
        players.put(id, User.builder()
                .id(id)
                .name(name)
                .points(0)
                .build());
    }

    private static void onGetPlayer(String userId, OnGetPlayerCallback callback) {
        User user = players.get(userId);
        if (user != null)
            callback.callback(user);
    }

    public static void submitAnswer(String userId, String answer) {
        onGetPlayer(userId, user -> user.answer = answer);
    }

    public static void setUserImagePath(String userId, String imagePath) {
        onGetPlayer(userId, user -> user.image = imagePath);
    }

    public static void setBuzzerSound(String userId, String buzzer) {
        onGetPlayer(userId, user -> user.buzzer = buzzer);
    }

    public static void setPoints(String userId, float points) {
        onGetPlayer(userId, user -> user.points = points);
    }

    public static void removeUser(String id) {
        PlayerManager.players.remove(id);
    }

    private static void save() {
        if (connection == null)
            return;

        try {
            connection.savePlayers(PlayerManager.players.values());
        } catch (SQLException e) {
            System.out.println(e);
        }
    }

    public static List<User> list() {
        return new ArrayList<>(players.values());
    }

    private interface OnGetPlayerCallback {
        void callback(User player);
    }
}
