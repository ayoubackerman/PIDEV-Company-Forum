package com.example.backend.dto;


import lombok.Data;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class AuctionDto {

    private  Long itemid;
    private String name;
private String desc;
    private Long codeAuction;


    private byte[] img;
    private List<BidDto> bidDtos ;
    private boolean status;
    private LocalDate startDate;
    private LocalDate endDate;

}
