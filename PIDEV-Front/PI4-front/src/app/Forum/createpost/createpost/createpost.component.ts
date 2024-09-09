import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServicePostService } from 'app/services/ServiceForum/service-post.service';
import { PostlistComponent } from '../../post/postlist/postlist.component';
import { KeycloakService } from "keycloak-angular";
import { KeycloakProfile } from "keycloak-js";

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent {
  public profile!: KeycloakProfile;
  container: any;
  overlayWrapper: any;


  itemForm!: FormGroup;
  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null = null;




  closeDialog(): void {
    this.dialogRef.close();
  }
  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private adminService: ServicePostService,
    private router: Router,
    public dialogRef: MatDialogRef<PostlistComponent>,@Inject(MAT_DIALOG_DATA) public data: { id: any },
    public ks: KeycloakService,
  ) {console.log(data.id); }
  async ngOnInit() {
    if (this.ks.isLoggedIn()) {
      this.profile = await this.ks.loadUserProfile();
      console.log(this.profile.id);
    }

    this.itemForm = this.fb.group({
      description: [null, [Validators.required]],
      title: [null, [Validators.required]],
      author: [null, [Validators.required]],

    });
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile as Blob);
  }
  addpost(): void {
    if (this.ks.isLoggedIn()) {
      let user_id = this.profile.id;
      console.log(user_id)
    if (this.itemForm.invalid) {
      for (const i in this.itemForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.itemForm.controls, i)) {
          this.itemForm.controls[i].markAsDirty();
          this.itemForm.controls[i].updateValueAndValidity();
        }
      }
    } else {
      const formData: FormData = new FormData();
      const img: File = this.selectedFile;
      formData.append('imagepost', img);
      formData.append('title', this.itemForm.get('title')!.value);
      formData.append('description', this.itemForm.get('description')!.value);
      formData.append('author', this.itemForm.get('author')!.value);
      formData.forEach((value, key) => {
        console.log(key + ': ' + value);
      });
      this.adminService.addPost(formData,this.data.id).subscribe((res) => {
        if (res.id !== null) {
          this.snackbar.open('Post added successfully', 'Close', { duration: 5000 });
          window.location.reload();
          this.router.navigateByUrl('/post');
        } else {
          console.log(res);
          this.snackbar.open(res.message, 'Close', { duration: 5000, panelClass: 'error-snackbar' });
        }
      });
    }
}
  }


}



