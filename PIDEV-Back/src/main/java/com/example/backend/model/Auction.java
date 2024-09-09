package com.example.backend.model;


import com.example.backend.dto.AuctionDto;
import com.example.backend.dto.BidDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Auction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeAuction;

    @OneToOne
    private Items item; // Item being auctioned

    @OneToMany(mappedBy = "auction")
    private List<Bid> bids = new ArrayList<>(); // Collection of bids for this auction

    private boolean status;

    private LocalDate startDate;
    private LocalDate endDate;


    public AuctionDto getDto() {
        AuctionDto auctionDto = new AuctionDto();
        auctionDto.setCodeAuction(codeAuction);
        auctionDto.setName(item.getName());
        auctionDto.setDesc(item.getDescription());
        auctionDto.setImg(item.getImg());
        auctionDto.setItemid(item.getCodeItem());
        List<BidDto> bidDtos = bids.stream().map(bid -> {
            BidDto bidDto = new BidDto();
            bidDto.setCodeBid(bid.getCodeBid());
            bidDto.setIdUser(bid.getUser().getId()); // Assuming your User entity has an ID field
            bidDto.setName(bid.getUser().getPhoneNumber()); // Assuming your User entity has a name field
            bidDto.setIdAuction(bid.getAuction().getCodeAuction());
            bidDto.setAmount(bid.getAmount());
            return bidDto;
        }).collect(Collectors.toList());
auctionDto.setStatus(status);
        auctionDto.setBidDtos(bidDtos);
        auctionDto.setStartDate(startDate);
        auctionDto.setEndDate(endDate);
        return auctionDto;
    }

}
