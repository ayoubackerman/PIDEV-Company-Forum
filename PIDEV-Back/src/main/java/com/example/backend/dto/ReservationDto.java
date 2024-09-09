package com.example.backend.dto;

import lombok.Data;

@Data
public class ReservationDto {
    private Long id ;
    private Long pack ;
    private Long standNum ;
    private Long sessionId ;
    private Long exposant;
    private String email ;
    private Double price ;
}
