import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeviService } from 'app/services/devi/devi.service';
//import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { AddDeviComponent } from '../../AddDevi/add-devi/add-devi.component';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-devi-list',
  templateUrl: './devi-list.component.html',
  styleUrls: ['./devi-list.component.css']
})
export class DeviListComponent {
  Devis: any[] = [];

  constructor(private _Devi : DeviService,
    private snackbar : MatSnackBar,
    private router :Router,
    private http : HttpClient,
    private _dialogue : MatDialog

    ){}


    openAddItem(){
      this._dialogue.open(AddDeviComponent);
    }
    

     downloadPdf(): void {
       this.http.get('http://localhost:9090/api/devis/pdf', { responseType: 'blob' })
         .subscribe(blob => {
           saveAs(blob, "devis.pdf"); // This will trigger the file download in the user's browser
         }, error => {
         // Handle any errors here
           console.error('Download error:', error);
         });
     }
 

    ngOnInit():void{
      this.getAllDevi();
    }


    getAllDevi(){
      this._Devi.getDevi().subscribe(res =>{
        this.Devis= res;
       
      })
    }
    deleteItem(deviId:any){
      this._Devi.deleteDeviById(deviId).subscribe(res=>{
        if(res && res.body){
          this.snackbar.open('Erreur', 'Close', { duration: 5000 });
          //this.router.navigateByUrl('/admin/dashboard');
        //  window.location.reload(); // or location.reload()
        }else{
          this.snackbar.open('item deleted successfully', 'Close', { duration: 5000 });
  
         // window.location.reload(); // or location.reload()
                 this.getAllDevi();
        }
      })
    }

}
