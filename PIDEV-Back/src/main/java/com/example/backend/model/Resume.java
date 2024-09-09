package com.example.backend.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Map;
@Getter @Setter
public class Resume {
    private Header header;
    private ArrayList<Education> education;
    private ArrayList<Experience> experience;
    private Map<String, String> skills;
    private ArrayList<Project> projects;
    private String KeycloakUseId ;
}
