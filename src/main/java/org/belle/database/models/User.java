package org.belle.database.models;

import lombok.Builder;

@Builder
public class User {

    public final String id;
    public final String name;
    public String buzzer;
    public String image;
    public String answer;
    public float points;
}
