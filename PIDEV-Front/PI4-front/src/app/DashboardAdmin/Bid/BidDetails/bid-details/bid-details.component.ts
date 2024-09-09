import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BidServiceService } from 'app/services/bid/bid-service.service';

@Component({
  selector: 'app-bid-details',
  templateUrl: './bid-details.component.html',
  styleUrls: ['./bid-details.component.css']
})
export class BidDetailsComponent {

  constructor(private _dialogue : MatDialogRef<BidDetailsComponent>,@Inject(MAT_DIALOG_DATA) public data: { codeAuction: any },
  private _bid:BidServiceService
  ){
  }

  Bids: any[] = [];


  ngOnInit():void{
    this.getAllBid(this.data.codeAuction);
  }
  getAllBid(codeAuction:any){
    return this._bid.getBidByAuctionId(this.data.codeAuction).subscribe((res)=>{
      this.Bids=res;
      console.log(this.Bids);
    });

  }




}
