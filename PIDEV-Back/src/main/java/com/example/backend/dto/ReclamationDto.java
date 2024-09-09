package com.example.backend.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ReclamationDto {
    private Long codeReclamation ;
    private String status ;
    private String description ;
    private String type ;
    private Date date ;



}
