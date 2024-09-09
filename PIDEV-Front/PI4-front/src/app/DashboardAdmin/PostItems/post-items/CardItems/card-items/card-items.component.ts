import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminServiceService } from 'app/services/admin/admin-service.service';
import { AuctionService } from 'app/services/auction/auction.service';
import { PostItemsComponent } from '../../post-items.component';
import { UpdateItemComponent } from 'app/DashboardAdmin/updateItems/update-item/update-item.component';

@Component({
  selector: 'app-card-items',
  templateUrl: './card-items.component.html',
  styleUrls: ['./card-items.component.css']
})
export class CardItemsComponent {
  items: any[] = [];

  constructor(private adminservice : AdminServiceService,
    private snackbar : MatSnackBar,
    private router :Router,
    private auction:AuctionService,
    private _dialogue : MatDialog

    ){}


    openUpdate(codeItem: any){
      this._dialogue.open(UpdateItemComponent,{
        data: { codeItem: codeItem }
    });
    }
    openAddItem(){
      this._dialogue.open(PostItemsComponent);
    }
    ngOnInit():void{
      this.getAllItems();
    }

    createAuction(a: any) {
      // You might need some default values or fetching data for your auctionDto
      const auctionDto = {
         // codeitem: a // Example DTO structure, replace with your actual AuctionDTO requirements
          // Add other properties as required e.g. startingBid, auctionDate etc.
          // startDate: new Date(),
          // endDate: ...
      };
      console.log(auctionDto);

      this.auction.addItem(a,auctionDto).subscribe({
          next: (response) => {
              // Handle response from your backend if necessary
              console.log('Auction created successfully', response);
              this.snackbar.open('Auction added successfully', 'Close', { duration: 5000 });

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

    getAllItems(){
      this.items=[];
      this.adminservice.getItem().subscribe(res =>{
        res.forEach((element: { processedImg: string; byteImg: string; }) => {
          element.processedImg = 'data:image/jpeg;base64,'+element.byteImg;
          this.items.push(element);
          console.log(element);
          
        });
      })
    }
    deleteItem(itemId:any){
      this.adminservice.deleteItemById(itemId).subscribe(res=>{
        if(res && res.body){
          this.snackbar.open('Erreur', 'Close', { duration: 5000 });
          //this.router.navigateByUrl('/admin/dashboard');
        //  window.location.reload(); // or location.reload()
        }else{
          this.snackbar.open('item deleted successfully', 'Close', { duration: 5000 });
  
         // window.location.reload(); // or location.reload()
                 this.getAllItems();
        }
      })
    }

}
