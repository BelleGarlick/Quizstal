package org.belle.database.models;

public enum QuestionType {

    TEXT("TEXT"),
    BUZZER("BUZZER"),
    MULTI_CHOICE("MULTI_CHOICE"),
    TIMER("TIMER")
    ;

    private final String text;

    QuestionType(final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }

    public static QuestionType fromString(String value) throws Exception {
        switch (value) {
            case "TEXT": return QuestionType.TEXT;
            case "BUZZER": return QuestionType.BUZZER;
            case "MULTI_CHOICE": return QuestionType.MULTI_CHOICE;
            case "TIMER": return QuestionType.TIMER;
        }

        throw new Exception("Invalid question type. Please choose: 'TEXT', 'TIMER', 'MULTI_CHOICE', 'BUZZER'");
    }
}
