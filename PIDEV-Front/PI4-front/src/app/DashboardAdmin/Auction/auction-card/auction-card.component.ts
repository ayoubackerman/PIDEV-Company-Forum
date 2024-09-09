import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminServiceService } from 'app/services/admin/admin-service.service';
import { AuctionService } from 'app/services/auction/auction.service';
import { AddBidComponent } from '../../Bid/AddBid/add-bid/add-bid.component';
import { BidDetailsComponent } from '../../Bid/BidDetails/bid-details/bid-details.component';

@Component({
  selector: 'app-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.css']
})
export class AuctionCardComponent {

  auctions: any[] = [];

  constructor(private adminservice : AdminServiceService,
    private snackbar : MatSnackBar,
    private router :Router,
    private auction:AuctionService,
    private _dialogue : MatDialog
    ){}

    ngOnInit():void{
      this.getAllAuction();
    }
    openAddBid(auctionId: any){
      this._dialogue.open(AddBidComponent,{
        data: { codeAuction: auctionId }
    });
    }

    openBidDetails(auctionId: any){
      this._dialogue.open(BidDetailsComponent,{
        data: { codeAuction: auctionId }
    });
    }
  
    getAllAuction(){
      this.auctions=[];

      this.auction.getAuction().subscribe(res =>{
        res.forEach((element: { processedImg: string; img: string; }) => {
          element.processedImg = 'data:image/jpeg;base64,'+element.img;
          this.auctions.push(element);
          console.log(this.auctions);
          
        });        
      })
    }

}
