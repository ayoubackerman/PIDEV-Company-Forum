package com.example.backend.service.admin.Auction;

import com.example.backend.Repository.AuctionRepository;
import com.example.backend.Repository.ItemsRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Repository.fcmTokenRepository;
import com.example.backend.dto.AuctionDto;
import com.example.backend.dto.PushNotificationRequest;
import com.example.backend.model.Auction;
import com.example.backend.model.Items;
import com.example.backend.model.fcmToken;
import com.example.backend.service.admin.notification.NotificationService;
import com.google.firebase.messaging.FirebaseMessagingException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class ServiceAuction implements IServiceAuction{

    @Autowired
    AuctionRepository auctionRepository;
    @Autowired
    ItemsRepository itemsRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    fcmTokenRepository fcm;

    private final NotificationService notificationService;




    public List<AuctionDto> getAllAuction(){
        List<Auction> auctions = auctionRepository.findAll();
        return auctions.stream().map(Auction::getDto).collect(Collectors.toList());
    }

  /*  public AuctionDto addAuction(AuctionDto auctionDto){
        log.info("sq"+auctionDto);
        Items items = itemsRepository.findById(auctionDto.getItemid()).get();
        log.info("sq"+items);
        Auction auction = new Auction();
              //  auction.setCodeAuction(auctionDto.getCodeAuction());
                auction.setItem(items);
                if (auctionDto.getBidDtos() != null) {
                    List<Bid> bids = auctionDto.getBidDtos().stream().map(bidDto -> {
                        Bid bid = new Bid();
                        bid.setCodeBid(bidDto.getCodeBid()); // Assuming that the bid has already been generated; usually, we don't set this for new bids

                        // Fetch the user by their ID and set it to the bid
                        User user = userRepository.findById(bidDto.getIdUser()).orElseThrow(
                                () -> new NullPointerException("User with ID " + bidDto.getIdUser() + " not found")
                        );
                        bid.setUser(user);

                        bid.setAuction(auction); // Set the current Auction as the auction for this bid
                        bid.setAmount(bidDto.getAmount()); // Set the amount from the BidDto to the Bid

                        return bid;
                    }).collect(Collectors.toList());
                    auction.setBids(bids);
                }

                return auctionRepository.save(auction).getDto();
            }*/
  public AuctionDto addAuction(Long id) throws ExecutionException, InterruptedException, FirebaseMessagingException {
      Items items = itemsRepository.findById(id).get();
      log.info("sq"+items);
      Auction auction = new Auction();
      auction.setItem(items);
      auction.setStartDate(LocalDate.now());
      auction.setEndDate(LocalDate.now().plusDays(3));

      Auction createdAuction = auctionRepository.save(auction);
      AuctionDto createdAuctionDto = createdAuction.getDto();

        List<fcmToken> tokenList = fcm.findAll();

        List<PushNotificationRequest> list=new ArrayList<PushNotificationRequest>();

        for (fcmToken token : tokenList) {
      PushNotificationRequest request = new PushNotificationRequest();
      request.setTitle("New Auction");
      request.setBody("Go check new Auction is set");
      request.setImageUrl("https://i.ibb.co/K64VWWH/Logo-ESPRIT-Ariana.jpg");
      request.setDeviceToken(token.getToken());
      list.add(request);}
      for (PushNotificationRequest req:list
           ) {
          notificationService.sendNotificationToDevice(req);

      }

      return createdAuctionDto;
  }








}