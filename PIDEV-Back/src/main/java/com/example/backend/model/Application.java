package com.example.backend.model;


import com.example.backend.Enum.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Application {
    @Id
    private Long applicationCode;

    private String contact;
    private String portfolio;
    private String lettre;
    private String cv;
    private Status status ;
    private Date date;
    private String user_id ;
    @ManyToOne
    private Offre offre ;

    @OneToOne
    private Interview interview ;


}
