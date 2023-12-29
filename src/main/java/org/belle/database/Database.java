package org.belle.database;

import org.belle.database.models.Question;
import org.belle.database.models.QuestionType;
import org.belle.database.models.User;

import java.sql.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class Database {

    public final String dbName;
    private final Connection connection;

    public Database(String dbName) throws SQLException {
        this.dbName = dbName;
        this.connection = DriverManager.getConnection(
                String.format("jdbc:sqlite:%s.db", dbName)
        );

        this.init();
    }

    public void init() throws SQLException {
        String createUsersTableSQL = "CREATE TABLE IF NOT EXISTS users (\n"
                + "    id String PRIMARY KEY,\n"
                + "    name TEXT NOT NULL,\n"
                + "    answer TEXT,\n"
                + "    buzzer TEXT,\n"
                + "    image TEXT,\n"
                + "    points FLOAT\n"
                + ");";

        try (PreparedStatement statement = connection.prepareStatement(createUsersTableSQL)) {
            statement.executeUpdate();
        }

        String createQuestionsTableSQL = "CREATE TABLE IF NOT EXISTS questions (\n"
                + "    id INTEGER PRIMARY KEY AUTOINCREMENT,\n"
                + "    question TEXT NOT NULL,\n"
                + "    type TEXT NOT NULL,\n"
                + "    options TEXT NOT NULL,\n"
                + "    answer TEXT NOT NULL,\n"
                + "    media TEXT\n"
                + ");";

        try (PreparedStatement statement = connection.prepareStatement(createQuestionsTableSQL)) {
            statement.executeUpdate();
        }

        String createKeyValuesTableSQL = "CREATE TABLE IF NOT EXISTS keyValues (\n"
                + "    key TEXT PRIMARY KEY,\n"
                + "    value TEXT\n"
                + ");";

        try (PreparedStatement statement = connection.prepareStatement(createKeyValuesTableSQL)) {
            statement.executeUpdate();
        }
    }

    public List<User> getUsers() throws SQLException {
        String querySQL = "SELECT * FROM users;";

        ArrayList<User> users = new ArrayList<>();
        try (PreparedStatement statement = connection.prepareStatement(querySQL);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                String id = resultSet.getString("id");
                String name = resultSet.getString("name");
                String answer = resultSet.getString("answer");
                String buzzer = resultSet.getString("buzzer");
                String image = resultSet.getString("image");
                float points = resultSet.getFloat("points");

                users.add(User.builder()
                        .id(id)
                        .name(name)
                        .answer(answer)
                        .buzzer(buzzer)
                        .image(image)
                        .points(points)
                        .build());
            }
        }

        return users;
    }

    public List<Question> getQuestions() throws Exception {
        String querySQL = "SELECT * FROM questions;";

        ArrayList<Question> questions = new ArrayList<>();
        try (PreparedStatement statement = connection.prepareStatement(querySQL);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String question = resultSet.getString("question");
                QuestionType type = QuestionType.fromString(resultSet.getString("type"));
                String options = resultSet.getString("options");
                String answer = resultSet.getString("answer");
                String media = resultSet.getString("media");

                questions.add(Question.builder()
                        .id(id)
                        .question(question)
                        .type(type)
                        .options(options)
                        .answer(answer)
                        .media(media)
                        .build());
            }
        }

        return questions;
    }

    public void setKeyValue(String key, String value) throws SQLException {
        String query = "INSERT INTO keyValues (key, value)" +
                "  VALUES (?, ?) "+
                "  ON CONFLICT(key) DO UPDATE SET" +
                "    key=excluded.key," +
                "    value=excluded.value;";

        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, key);
            statement.setString(2, value);
            statement.executeUpdate();
        }
    }

    public String getKeyValue(String key) throws SQLException {
        String querySQL = "SELECT value FROM keyValues where key = ?;";

        PreparedStatement statement = connection.prepareStatement(querySQL);
        statement.setString(1, key);
        try (statement; ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                return resultSet.getString(1);
            }
        }

        return null;
    }

    public void savePlayers(Collection<User> users) throws SQLException {
        String query = "DELETE FROM users;";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.executeUpdate();
        }

        for (User user: users) {
            String insertDataSQL = "INSERT INTO users " +
                    "(id, name, answer, buzzer, image, points) " +
                    "VALUES " +
                    "(?, ?, ?, ?, ?, ?);";

            try (PreparedStatement statement = connection.prepareStatement(insertDataSQL)) {
                statement.setString(1, user.id);
                statement.setString(2, user.name);
                statement.setString(3, user.answer);
                statement.setString(4, user.buzzer);
                statement.setString(5, user.image);
                statement.setFloat(6, user.points);
                statement.executeUpdate();
            }
        }
    }

    public void saveQuestions(Collection<Question> questions) throws SQLException {
        String query = "DELETE FROM questions;";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.executeUpdate();
        }

        for (Question question: questions) {
            String insertDataSQL = "INSERT INTO questions " +
                    "(id, question, type, options, answer, media) " +
                    "VALUES " +
                    "(?, ?, ?, ?, ?, ?);";

            try (PreparedStatement statement = connection.prepareStatement(insertDataSQL)) {
                statement.setInt(1, question.id);
                statement.setString(2, question.question);
                statement.setString(3, question.type.toString());
                statement.setString(4, question.options);
                statement.setString(5, question.answer);
                statement.setString(6, question.media);
                statement.executeUpdate();
            }
        }
    }

    public void close() throws SQLException {
        this.connection.close();
    }
}
