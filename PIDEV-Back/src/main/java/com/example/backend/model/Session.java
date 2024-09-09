package com.example.backend.model;


import com.example.backend.dto.SessionDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] flyer ;
    private String date ;
    private String location ;
    private String duration ;

    @OneToMany(mappedBy = "session")
    private Set<Stand> stands;
    public SessionDto getDto(){
        SessionDto sessionDto =new SessionDto();
        sessionDto.setId(id);
        sessionDto.setFlyer(flyer);
        sessionDto.setDate(date);
        sessionDto.setDuration(duration);
        sessionDto.setLocation(location);

        return sessionDto;
    }
}
