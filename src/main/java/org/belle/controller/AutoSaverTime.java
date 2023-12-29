package org.belle.controller;

import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class AutoSaverTime {

    public AutoSaverTime(AutoSaveTimerCallback callback) {
        Executors.newScheduledThreadPool(1)
                .scheduleAtFixedRate(callback::run, 10, 10, TimeUnit.SECONDS);
    }

    interface AutoSaveTimerCallback {
        public abstract void run();
    }
}
