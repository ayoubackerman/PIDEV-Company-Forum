import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BidServiceService } from 'app/services/bid/bid-service.service';

@Component({
  selector: 'app-list-bid',
  templateUrl: './list-bid.component.html',
  styleUrls: ['./list-bid.component.css']
})
export class ListBidComponent {
  Bids: any[] = [];

  constructor(private _Bid : BidServiceService,
    private snackbar : MatSnackBar,
    private router :Router,
    ){}

    
 

    ngOnInit():void{
      this.getAllBid();
    }
    performAction(id:any){

      const BidDto = {
        // codeitem: a // Example DTO structure, replace with your actual AuctionDTO requirements
         // Add other properties as required e.g. startingBid, auctionDate etc.
         // startDate: new Date(),
         // endDate: ...
     };

     this._Bid.chageStauts(id,BidDto).subscribe({
         next: (response) => {
             // Handle response from your backend if necessary
             console.log('Auction created successfully', response);
             this.snackbar.open('Bid accepted succesfully', 'Close', { duration: 5000 });
             this.getAllBid();


             // You may want to refresh your item/auction list or navigate
             // this.router.navigate(['/path-to-auction-details', response.id]);
         },
         error: (error) => {
             // Handle any errors here
             console.error('Error creating auction', error);
             this.snackbar.open('product Already have an Auction', 'Close', { duration: 5000 });

         }
     });
    }
    

    getAllBid(){
      this.Bids=[];
      this._Bid.getBid().subscribe(res =>{
        res.forEach((element: { processedImg: string; img: string; }) => {
          element.processedImg = 'data:image/jpeg;base64,'+element.img;
          this.Bids.push(element);
          console.log("Element",element);
          
        });
      })
    }

}
