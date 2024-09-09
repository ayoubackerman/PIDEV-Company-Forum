import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServiceCommentService } from 'app/services/Comment/service-comment.service';


@Component({
  selector: 'app-listecomment',
  templateUrl: './listecomment.component.html',
  styleUrls: ['./listecomment.component.css']
})
export class ListecommentComponent {


  width: any;
  token:any;
  items: any[] = [];
  
  constructor(private dialog: MatDialog,
    private commentservice :ServiceCommentService ,
    private snackbar : MatSnackBar,
    private router :Router
    ){}
  /*
    openDialog(): void {
      const dialogRef = this.dialog.open(CreatepostComponent, {
        width: '500px',
       
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // You can handle any result or action after the dialog is closed
      });
    }
    openDialog2(): void {
      const dialogRef = this.dialog.open(CreatecommentComponent, {
        width: '500px',
       
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // You can handle any result or action after the dialog is closed
      });
    }
    */
  
  
      ngOnInit():void{
        this.getAllComments();
        
      }
  
      getAllComments(){
        this.items=[];
        this.commentservice.getAllComments().subscribe(res =>{
         
          this.items=res;
        })
      }
  
      performAction(id:any){

        const BidDto = {
          // codeitem: a // Example DTO structure, replace with your actual AuctionDTO requirements
           // Add other properties as required e.g. startingBid, auctionDate etc.
           // startDate: new Date(),
           // endDate: ...
       };
  
       this.commentservice.chageStauts(id,BidDto).subscribe({
           next: (response) => {
               // Handle response from your backend if necessary
               console.log('Auction created successfully', response);
               this.snackbar.open('Bid accepted succesfully', 'Close', { duration: 5000 });
               this.getAllComments();
  
  
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
    
     /* deleteItem(itemId:any){
        this.postservice.deleteItemById(itemId).subscribe(res=>{
          if(res && res.body){
            this.snackbar.open('Erreur', 'Close', { duration: 5000 });
            //this.router.navigateByUrl('/admin/dashboard');
          //  window.location.reload(); // or location.reload()
          }else{
            this.snackbar.open('Reclamation deleted successfully', 'Close', { duration: 5000 });
    
           // window.location.reload(); // or location.reload()
                   this.getAllItems();
          }
        })
      }*/
}
