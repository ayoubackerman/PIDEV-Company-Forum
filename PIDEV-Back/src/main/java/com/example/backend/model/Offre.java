package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Offre {
    @jakarta.persistence.Id
    private Long reference ;
    private String title;
    private String location;
    private String description ;
    private Date deadline ;
    private String contratType;
    private String skills ;
    private String experienceLevel ;


   @OneToMany
   private List<Application> candidatureList ;

    private boolean favorite =false;
    private LocalDateTime publicationDate;

    private int rating;

    @Transient
    public List<Integer> ratings = new ArrayList<>();

    private String user_id ;

}
