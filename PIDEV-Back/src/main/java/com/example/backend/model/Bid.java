package com.example.backend.model;

import com.example.backend.dto.BidDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.keycloak.representations.idm.UserRepresentation;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeBid;

    @ManyToOne
    private User user; // User who placed the bid

    @ManyToOne
    private Auction auction; // Auction for which the bid is placed

    private double amount; // Bid amount

    private LocalDate date;


    public BidDto getDto() {
        BidDto bidDto = new BidDto();
        bidDto.setCodeBid(this.codeBid);
        bidDto.setIdUser(this.user.getId()); // Assuming there is getId method in User class
        bidDto.setName(this.user.getPhoneNumber()); // Assuming there is getName method in User class
        bidDto.setIdAuction(this.auction.getCodeAuction()); // Assuming there is getCodeAuction method in Auction class
        bidDto.setAmount(this.amount);
        bidDto.setNameitem(this.auction.getItem().getName());
        bidDto.setImg(this.auction.getDto().getImg());
        bidDto.setDate(this.date);

        return bidDto;
    }

}
