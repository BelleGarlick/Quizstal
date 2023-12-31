package org.belle.controller.models;

import lombok.Builder;
import org.belle.database.models.Question;
import org.belle.database.models.User;
import org.belle.database.models.ViewState;

import java.util.List;

@Builder
public class State {

    public String db;
    public ViewState view;
    public String wallpaper;
    public int question;
    public long timer;
    public List<User> users;
    public List<Question> questions;
}
