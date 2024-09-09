package com.example.backend.controller.Admin;

import com.example.backend.dto.AuctionDto;
import com.example.backend.service.admin.Auction.ServiceAuction;
import com.google.firebase.messaging.FirebaseMessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/Auction")
public class AuctionController {

    private final ServiceAuction serviceAuction;

    @PostMapping("/Add/{id}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AuctionDto> addAuction(@PathVariable Long id) throws ExecutionException, FirebaseMessagingException, InterruptedException {
        AuctionDto auctionDto1 = serviceAuction.addAuction(id);
        return ResponseEntity.status(HttpStatus.CREATED).body(auctionDto1);
    }


    @GetMapping("")
        //@PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<List<AuctionDto>> GetAll(){
        List<AuctionDto> list = serviceAuction.getAllAuction();
        return ResponseEntity.status(HttpStatus.CREATED).body(list);

    }


}
