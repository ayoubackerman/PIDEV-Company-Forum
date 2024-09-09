package com.example.backend.Repository;

import com.example.backend.model.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BidRepository extends JpaRepository<Bid,Long> {

    @Query("select b from Bid b where b.auction.status=false")
    List<Bid> Bid();

    @Query("select b from Bid b where b.auction.codeAuction=:id order by b.date asc ")
    List<Bid> getbidbyAuctionId(Long id);
}
