package com.example.backend.model;

import com.example.backend.dto.StandDto;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Setter
@Getter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Stand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double price;
    private double xPosition;
    private double yPosition;
    private boolean reserved; // Ajoutez l'attribut reserved de type boolean

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    @JsonIgnore
    private Session session;

    public StandDto getDto() {
        StandDto standdto = new StandDto();
        standdto.setId(id);
        standdto.setPriceStand(price);
        standdto.setSessionId(session.getId());
        standdto.setXPosition(xPosition);
        standdto.setYPosition(yPosition);
        standdto.setReserved(reserved); // Mapping de l'attribut réservé

        return standdto;
    }
}
