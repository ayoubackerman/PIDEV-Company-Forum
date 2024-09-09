package com.example.backend.dto;

import lombok.Data;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class PushNotificationRequest {
    private String title;
    private String body;
    private String imageUrl;
    private String deviceToken;
    private Map<String, String> data = new HashMap<>();
}
