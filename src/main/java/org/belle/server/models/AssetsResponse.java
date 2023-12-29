package org.belle.server.models;

import lombok.Builder;

import java.util.List;

@Builder
public class AssetsResponse {

    public List<String> images;

    public List<String> audio;
}
