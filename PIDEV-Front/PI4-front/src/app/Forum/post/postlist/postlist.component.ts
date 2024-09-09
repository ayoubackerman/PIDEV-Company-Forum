import { Component } from '@angular/core';
import { CreatepostComponent } from '../../createpost/createpost/createpost.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicePostService } from 'app/services/ServiceForum/service-post.service';
import { CreatecommentComponent } from '../../createcomment/createcomment.component';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent {

width: any;
token:any;
items: any[] = [];
user_id :any ;

public profile!: KeycloakProfile;


constructor(private dialog: MatDialog,
  private postservice :ServicePostService ,
  private snackbar : MatSnackBar,
  private router :Router,
  public ks: KeycloakService

  ){}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatepostComponent, {
      data:{ id : this.user_id},
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
  

  

   async ngOnInit(){
    if (this.ks.isLoggedIn()) {
      this.profile = await this.ks.loadUserProfile();
      console.log(this.profile.id);
      this.user_id = this.profile.id;
      console.log(this.user_id);

    }

      this.getAllPosts();
      
    }

    getAllPosts() {
      this.items = [];
      this.postservice.getAllPosts().subscribe(res => {
          this.items = res.sort((a: { datepost: string | number | Date; }, b: { datepost: string | number | Date; }) => new Date(b.datepost).getTime() - new Date(a.datepost).getTime());
          console.log(this.items);
      });
  }
  

   
  
    deletePost(itemId:any){
      this.postservice.deletePost(itemId).subscribe(res=>{
        if(res && res.body){
          this.snackbar.open('Erreur', 'Close', { duration: 5000 });
          //this.router.navigateByUrl('/admin/dashboard');
        //  window.location.reload(); // or location.reload()
        }else{
          this.snackbar.open('Post deleted successfully', 'Close', { duration: 5000 });
  
         // window.location.reload(); // or location.reload()
                 this.getAllPosts();
        }
      })
    }
    updateItem(itemId: any): void {
      this.router.navigate(['/getidtocomment', itemId]);
    }

    comment(itemId: any): void {
      this.router.navigate(['comments', itemId]); // Ensure you pass the post ID here
    }
    
}
