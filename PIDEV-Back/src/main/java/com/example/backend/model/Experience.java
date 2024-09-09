package com.example.backend.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class Experience {

    private String company;
    private String jobrole;
    private String period;
    private String location;
    private List<String> responsibilites;
}
