package com.example.backend.controller.Admin;

import com.example.backend.dto.BidDto;
import com.example.backend.service.admin.Bid.ServiceBid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/Bid")
public class BidController {

    private final ServiceBid serviceBid;

    @PostMapping("/Add")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BidDto> addBid(@ModelAttribute BidDto bidDto) {
        BidDto bidDto1 = serviceBid.addBid(bidDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(bidDto1);
    }

    @PutMapping("/Edit/{id}")
    public void EditStatus(@PathVariable Long id){
        serviceBid.acceptBid(id);
    }

    @GetMapping("")
        //@PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<List<BidDto>> GetAll(){
        List<BidDto> list = serviceBid.getAllBid();
        return ResponseEntity.status(HttpStatus.CREATED).body(list);

    }
    @GetMapping("/getByAuctioid/{id}")
        //@PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<List<BidDto>> getByAuctioid(@PathVariable Long id){
        List<BidDto> list = serviceBid.getBidByAuction(id);
        return ResponseEntity.status(HttpStatus.CREATED).body(list);

    }

}
