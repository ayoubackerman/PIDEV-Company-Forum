
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReclamationService } from 'app/services/ServiceReclamation/reclamation.service';

@Component({
  selector: 'app-reclamation-services',
  templateUrl: './reclamation-services.component.html',
  styleUrls: ['./reclamation-services.component.css']
})
export class ReclamationServicesComponent {

  private urlDuTableauDeBord: string = "http://localhost:3303/";

  items: any[] = [];

  constructor(private adminservice : ReclamationService,
    private snackbar : MatSnackBar,
    private router :Router
    ){}

    ngOnInit():void{
      this.getAllItems();
      
    }

    getAllItems(){
      this.items=[];
      this.adminservice.getItem().subscribe(res =>{
       
        this.items=res;
      })
    }

   
  
    deleteItem(itemId:any){
      this.adminservice.deleteItemById(itemId).subscribe(res=>{
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
    }

    updateItem(itemId: any): void {
      this.router.navigate(['/updatereclamation', itemId]);
    }
    openPowerBIDashboard() {
      window.open(this.urlDuTableauDeBord, '_blank');
    }
}
