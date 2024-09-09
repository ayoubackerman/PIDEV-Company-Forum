package com.example.backend.model;

import com.example.backend.dto.ReservationDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Setter
@Getter
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

     private Long exposant ;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "pack_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Pack pack;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "session_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Session session;
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "stand_id",referencedColumnName = "id")
    private Stand stand ;
    private double price ;
    private String email ;

    public ReservationDto getDto(){
        ReservationDto reservationdto =new ReservationDto();
        reservationdto.setId(id);
        reservationdto.setSessionId(session.getId());
        //reservationdto.setSessionLocation(session.getLocation());
        reservationdto.setPack(pack.getId());
       // reservationdto.setPackPrice(pack.getPricePack());
        reservationdto.setStandNum(stand.getId());
        //reservationdto.setStandPrice(stand.getPrice());
         reservationdto.setExposant(exposant);
         reservationdto.setEmail(email);
         reservationdto.setPrice(price);
        //reservationdto.setPrice(price);
        return reservationdto;
    }



}
