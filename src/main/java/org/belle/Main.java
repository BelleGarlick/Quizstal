package org.belle;

import org.belle.controller.Controller;
import org.belle.server.Server;

public class Main {

    public static void main(String[] args) throws Exception {
        Controller.connect("tm");

        new Server()
                .start();
    }
}