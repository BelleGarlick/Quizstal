package org.belle.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.belle.controller.models.State;
import org.belle.database.Database;
import org.belle.database.models.Question;
import org.belle.database.models.QuestionType;
import org.belle.database.models.User;
import org.belle.database.models.ViewState;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Controller {

    // TODO Introduce a questions and users cache which less regularly reads/saves from the db instead
    private static final List<BroadcastCallback> broadcastCallbacks = new ArrayList<>();

    private static Database connection;

    public static void connect(String db) throws Exception {
        if (connection != null)
            connection.close();

        connection = new Database(db);
        PlayerManager.setConnection(connection);
        QuestionManager.setConnection(connection);
    }

    public static void addBroadcastHandler(BroadcastCallback callback) {
        Controller.broadcastCallbacks.add(callback);
    }

    private static void broadcastStateUpdates() throws Exception {
        String message = new ObjectMapper().writeValueAsString(getState());
        Controller.broadcastCallbacks.forEach(broadcastCallback -> broadcastCallback.send("state", message));
    }

    public static State getState() throws Exception {
        // TODO Move questions and users to a separate slow poll
        ViewState view = ViewState.SCORE;
        int question = -1;
        long timer = -1;
        try { view = ViewState.fromString(connection.getKeyValue("VIEW")); } catch (Exception ignored) {}
        try { question = Integer.parseInt(connection.getKeyValue("QUESTION")); } catch (Exception ignored) {}
        try { timer = Long.parseLong(connection.getKeyValue("TIMER")); } catch (Exception e) {}

        return State.builder()
                .db(connection == null ? null : connection.dbName)
                .view(view)
                .timer(timer)
                .wallpaper(connection.getKeyValue("WALLPAPER"))
                .question(question)
                .questions(QuestionManager.list())
                .users(PlayerManager.list())
                .build();
    }

    public static void createUser(String name) throws Exception {
        PlayerManager.createUser(name);
        broadcastStateUpdates();
    }

    public static void removeUser(String id) throws Exception {
        PlayerManager.removeUser(id);
        broadcastStateUpdates();
    }

    public static void newQuestion(String question, QuestionType type, String options, String answer, String media) throws Exception {
        if (type == QuestionType.TIMER)
            answer = String.valueOf(Integer.parseInt(answer));  // Try to parse as int to check it's valid

        QuestionManager.newQuestion(
                question,
                type,
                options,
                answer,
                media
        );

        broadcastStateUpdates();
    }

    public static void removeQuestion(int id) throws Exception {
        System.out.println(id);
        QuestionManager.remove(id);
        broadcastStateUpdates();
    }

    public static void setState(ViewState view, int questionId) throws Exception {
        if (view == ViewState.QUESTION) {
            for (User user: connection.getUsers())
                Controller.submitAnswer(user.id, "");

            Optional<Question> matchedQuestion = connection.getQuestions().stream().filter(x -> x.id == questionId).findFirst();
            if (matchedQuestion.isPresent()) {
                Question question = matchedQuestion.get();

                long timer = -1;
                try {
                    timer = (System.currentTimeMillis() / 1000) + Integer.parseInt(question.answer.strip());
                } catch (Exception e) {}
                connection.setKeyValue("TIMER", String.valueOf(timer));
            }
        }

        connection.setKeyValue("VIEW", view.toString());
        connection.setKeyValue("QUESTION", String.valueOf(questionId));
        broadcastStateUpdates();
    }

    public static void setUserPoints(String id, float points) throws Exception {
        PlayerManager.setPoints(id, points);
        broadcastStateUpdates();
    }

    public static void submitAnswer(String userId, String answer) throws Exception {
        PlayerManager.submitAnswer(userId, answer);
        broadcastStateUpdates();
    }

    public static void setUserImagePath(String userId, String imagePath) throws Exception {
        PlayerManager.setUserImagePath(userId, imagePath);
        broadcastStateUpdates();
    }

    public static void setBuzzerSound(String userId, String buzzerSound) throws Exception {
        PlayerManager.setBuzzerSound(userId, buzzerSound);
        broadcastStateUpdates();
    }

    public static void setWallpaper(String wallpaper) throws Exception {
        connection.setKeyValue("WALLPAPER", wallpaper);
        broadcastStateUpdates();
    }

    public interface BroadcastCallback {
        void send(String id, String message);
    }
}
