package com.example.backend.dto;


import lombok.Data;

@Data
public class Devidto {

    private Long id ;

    private String description;
    private Long quantity;

    private double price;
}
