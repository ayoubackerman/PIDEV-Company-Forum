package com.example.backend.model;

import com.example.backend.dto.ReclamationDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Reclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeReclamation;
    private String description;
    private String status;
    private String type;
    private Date date;

    private String user_id ;

    public ReclamationDto getDto(){
        ReclamationDto productDto =new ReclamationDto();
        productDto.setType(type);
        productDto.setStatus(status);
        productDto.setDescription(description);
        productDto.setDate(date);

        return productDto;
    }


}
