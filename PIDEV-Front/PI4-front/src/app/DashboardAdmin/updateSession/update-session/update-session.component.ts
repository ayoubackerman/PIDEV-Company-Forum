import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/Session/admin-service.service';

@Component({
  selector: 'app-update-session',
  templateUrl: './update-session.component.html',
  styleUrls: ['./update-session.component.css']
})
export class UpdateSessionComponent {

  itemId = this.activatedroute.snapshot.params['id']; 
  stepOneForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage : string |null= null ;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private adminService: AdminServiceService,
    private router: Router,
    private activatedroute:ActivatedRoute
  ) {}
  ngOnInit(): void {


    this.stepOneForm = this.fb.group({
      duration: [null, [Validators.required]],
      location: [null, [Validators.required]],
      Flyer: [null, [Validators.required]]
        });
  }

  getItemById(){
    this.adminService.getItemById(this.itemId).subscribe(res=>{
      this.stepOneForm.patchValue(res);
      this.existingImage = `data:image/jpeg;base64,`+ res.byteImg;
     } )
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

  addItem(): void {
    if (this.stepOneForm.invalid) {
      for (const i in this.stepOneForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.stepOneForm.controls, i)) {
          this.stepOneForm.controls[i].markAsDirty();
          this.stepOneForm.controls[i].updateValueAndValidity();
        }
      }
    } else {
      const formData: FormData = new FormData();
      formData.append('flyer', this.selectedFile as Blob);
      formData.append('duration', this.stepOneForm.get('duration')!.value);
      formData.append('location', this.stepOneForm.get('location')!.value);

      this.adminService.addItem(formData).subscribe((res) => {
        if (res.id !== null) {
          this.snackbar.open('item added successfully', 'Close', { duration: 5000 });
          this.router.navigateByUrl('/dashboard/admin/list');
        } else {
          console.log(res);
          this.snackbar.open(res.message, 'Close', { duration: 5000, panelClass: 'error-snackbar' });
        }
      });
    }
  }

}

