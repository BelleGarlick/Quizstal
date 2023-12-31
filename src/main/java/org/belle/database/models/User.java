package org.belle.database.models;

import lombok.Builder;

@Builder
public class User {

    public String id;
    public String name;
    public String buzzer;
    public String image;
    public String answer;
    public float points;
}
