package com.example.backend.service.admin.Bid;


import com.example.backend.dto.BidDto;

import java.util.List;

public interface IServiecBid {
     List<BidDto> getAllBid();
     BidDto addBid(BidDto bidDto);


    }
