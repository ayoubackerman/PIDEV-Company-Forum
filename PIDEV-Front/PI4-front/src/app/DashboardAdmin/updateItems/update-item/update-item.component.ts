import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from 'app/services/admin/admin-service.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent {
  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private adminService: AdminServiceService,
    private location: Location ,
    private router: Router,
    private activatedroute:ActivatedRoute,
    private _dialogue : MatDialogRef<UpdateItemComponent>,@Inject(MAT_DIALOG_DATA) public data: { codeItem: any } 
     ) {console.log(data.codeItem);}
  itemId = this.data.codeItem; 
  itemForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage : string |null= null ;
  imgChanged = false;


 
  ngOnInit(): void {
this.getItemById();

    this.itemForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      quantity: [null, [Validators.required]]
        });
  }

  getItemById(){
    console.log(this.itemId);
    this.adminService.getItemById(this.itemId).subscribe(res=>{
      this.itemForm.patchValue(res);
      this.existingImage = `data:image/jpeg;base64,`+ res.byteImg;
     } )
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged =true;
    this.existingImage = null;
  }

  previewImage(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile as Blob);
  }
  reloadPage() {
    location.reload();
  }

  UpdateItem(): void {
    if (this.itemForm.invalid) {
      for (const i in this.itemForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.itemForm.controls, i)) {
          this.itemForm.controls[i].markAsDirty();
          this.itemForm.controls[i].updateValueAndValidity();
        }
      }
    } else {
      const formData: FormData = new FormData();

      if(this.imgChanged && this.selectedFile){
        formData.append('img', this.selectedFile as Blob);
      }
      formData.append('name', this.itemForm.get('name')!.value);
      formData.append('description', this.itemForm.get('description')!.value);
      formData.append('quantity', this.itemForm.get('quantity')!.value);

      this.adminService.updateItem(this.itemId,formData).subscribe((res) => {
        if (res.id !== null) {
          this.snackbar.open('item added successfully', 'Close', { duration: 5000 });
        //  this.router.navigateByUrl('/Items');
        this.reloadPage();
        } else {
          console.log(res);
          this.snackbar.open(res.message, 'Close', { duration: 5000, panelClass: 'error-snackbar' });
        }
      });
    }
  }

}

