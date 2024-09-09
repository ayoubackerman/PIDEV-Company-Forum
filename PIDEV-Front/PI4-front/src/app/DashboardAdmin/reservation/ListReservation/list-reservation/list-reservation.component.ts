import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ReservationServiceService } from 'app/services/reservation/reservation-service.service';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css']
})
export class ListReservationComponent {

  items: any[] = [];

  constructor(private adminservice : ReservationServiceService,
    private snackbar : MatSnackBar,
    private router :Router,
    ){}

    ngOnInit():void{
      this.getAllReservations();
    }

    
    getAllReservations(){
      this.items=[];
      this.adminservice.getItem().subscribe(ress =>{
    this.items=ress;
      })
    }
    deleteItem(itemId:any){
      this.adminservice.deleteItemById(itemId).subscribe(ress=>{
        if(ress && ress.body){
          this.snackbar.open('Erreur', 'Close', { duration: 5000 });
          //this.router.²gateByUrl('/admin/dashboard');
        //  window.location.reload(); // or location.reload()
        }else{
          this.snackbar.open('item deleted successfully', 'Close', { duration: 5000 });
  
         // window.location.reload(); // or location.reload()
                 this.getAllReservations();
        }
      })
    }



}
