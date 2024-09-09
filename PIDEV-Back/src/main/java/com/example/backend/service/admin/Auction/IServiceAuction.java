package com.example.backend.service.admin.Auction;


import com.example.backend.dto.AuctionDto;
import com.google.firebase.messaging.FirebaseMessagingException;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface IServiceAuction {
    public List<AuctionDto> getAllAuction();
        public AuctionDto addAuction(Long id) throws ExecutionException, FirebaseMessagingException, InterruptedException, FirebaseMessagingException;



    }
