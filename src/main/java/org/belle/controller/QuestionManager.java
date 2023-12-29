package org.belle.controller;

import org.belle.database.Database;
import org.belle.database.models.Question;
import org.belle.database.models.QuestionType;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class QuestionManager {

    private static Database connection;

    private static final Map<Integer, Question> questions = new ConcurrentHashMap<>();

    private static final AutoSaverTime autoSaver = new AutoSaverTime(QuestionManager::save);

    public static void setConnection(Database connection) throws Exception {
        questions.clear();
        QuestionManager.connection = connection;
        connection.getQuestions().forEach(question -> questions.put(question.id, question));
    }

    public static void newQuestion(String name, QuestionType type, String options, String answer, String media) {
        int id = 0;
        for (Question question: questions.values())
            id = Math.max(question.id, id);

        questions.put(id, Question.builder()
                .id(id + 1)
                .question(name)
                .type(type)
                .options(options)
                .answer(answer)
                .media(media)
                .build());
    }

    private static void save() {
        if (connection == null)
            return;

        try {
            connection.saveQuestions(QuestionManager.questions.values());
        } catch (SQLException e) {
            System.out.println(e);
        }
    }

    public static List<Question> list() {
        return new ArrayList<>(QuestionManager.questions.values());
    }

    public static void remove(int id) {
        QuestionManager.questions.remove(id);
    }
}
