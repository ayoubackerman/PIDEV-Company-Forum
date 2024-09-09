package com.example.backend.dto;

import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class BidDto {
    private Long codeBid;
    private String idUser;
    private String name;
    private Long idAuction;
    private String nameitem;
    private byte[] img;

    private double amount; // Bid amount

    private LocalDate date;

}
