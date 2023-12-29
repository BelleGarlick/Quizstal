package org.belle.database.models;

public enum ViewState {

    SCORE("SCORE"),
    QUESTION("QUESTION"),
    ANSWER("ANSWER")
    ;

    private final String text;

    ViewState(final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }

    public static ViewState fromString(String value) throws Exception {
        switch (value) {
            case "SCORE": return ViewState.SCORE;
            case "QUESTION": return ViewState.QUESTION;
            case "ANSWER": return ViewState.ANSWER;
        }

        throw new Exception("Invalid question type. Please choose: 'SCORE', 'QUESTION', 'ANSWER'");
    }
}
