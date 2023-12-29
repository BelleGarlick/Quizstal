package org.belle.controller.models;

import lombok.Builder;
import org.belle.database.models.Question;
import org.belle.database.models.User;
import org.belle.database.models.ViewState;

import java.util.List;

@Builder
public class State {

    public final String db;
    public final ViewState view;
    public final String wallpaper;
    public final int question;
    public final long timer;
    public final List<User> users;
    public final List<Question> questions;
}
