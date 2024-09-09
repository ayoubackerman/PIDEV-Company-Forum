package com.example.backend.dto;

import lombok.Data;
import org.springframework.data.jpa.repository.Query;

@Data
public class StandDto {
    private Long id ;
    private Double priceStand;
    private Long sessionId;
    private double xPosition;
    private double yPosition;
    private boolean reserved ;
}
