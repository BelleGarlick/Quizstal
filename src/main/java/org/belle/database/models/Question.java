package org.belle.database.models;

import lombok.Builder;

@Builder
public class Question {

    public final int id;
    public final String question;
    public final QuestionType type;
    public final String options;
    public final String answer;
    public final String media;
}
