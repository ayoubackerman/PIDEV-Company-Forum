package com.example.backend.service.admin.Bid;

import com.example.backend.Repository.AuctionRepository;
import com.example.backend.Repository.BidRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.dto.BidDto;
import com.example.backend.model.Auction;
import com.example.backend.model.Bid;
import com.example.backend.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ServiceBid implements IServiecBid{

    @Autowired
    AuctionRepository auctionRepository;
    @Autowired
    BidRepository bidRepository;
    @Autowired
    UserRepository userRepository;

    public List<BidDto> getAllBid(){
        List<Bid> bids = bidRepository.Bid();
        return bids.stream().map(Bid::getDto).collect(Collectors.toList());
    }
    public BidDto addBid(BidDto bidDto){
        log.info("aa"+ bidDto);
        Bid bid = new Bid();
        User u = userRepository.findById(bidDto.getIdUser()).get();
        bid.setUser(u);
        log.info("user"+u);
        Auction a = auctionRepository.findById(bidDto.getIdAuction()).get();
        bid.setAuction(a);
        log.info("Auction"+a);
        bid.setDate(LocalDate.now());

        bid.setAmount(bidDto.getAmount());
        return bidRepository.save(bid).getDto();
    }

   public List<BidDto> getBidByAuction(Long id ){
        List<Bid> l = bidRepository.getbidbyAuctionId(id);
        return l.stream().map(Bid::getDto).collect(Collectors.toList());
    }

    public void acceptBid(Long id){
        Bid b = bidRepository.findById(id).get();
        Auction a = auctionRepository.findById(b.getAuction().getCodeAuction()).get();
        a.setStatus(true);
        auctionRepository.save(a);
        b.setAuction(a);
        bidRepository.save(b);

    }
}
