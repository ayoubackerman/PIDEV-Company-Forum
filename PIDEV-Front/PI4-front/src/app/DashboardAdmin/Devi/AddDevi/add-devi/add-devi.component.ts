import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeviService } from 'app/services/devi/devi.service';

@Component({
  selector: 'app-add-devi',
  templateUrl: './add-devi.component.html',
  styleUrls: ['./add-devi.component.css']
})
export class AddDeviComponent {
  
  deviForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private _devi: DeviService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document

  ) {}

  ngOnInit(): void {
    this.deviForm = this.fb.group({
      description: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      price: [null, [Validators.required]]
        });
  }

  reload() {
    this.document.location.reload();
  }
  addItem(): void {
    if (this.deviForm.invalid) {
      for (const i in this.deviForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.deviForm.controls, i)) {
          this.deviForm.controls[i].markAsDirty();
          this.deviForm.controls[i].updateValueAndValidity();
        }
      } 
    } else {
      const formData: FormData = new FormData();
      formData.append('description', this.deviForm.get('description')!.value);
      formData.append('quantity', this.deviForm.get('quantity')!.value);
      formData.append('price', this.deviForm.get('price')!.value);

      this._devi.addDevi(formData).subscribe((res) => {
        if (res.id !== null) {
          this.snackbar.open('item added successfully', 'Close', { duration: 5000 });
          //this.router.navigateByUrl('/Items');
          this.reload();
        } else {
          console.log(res);
          this.snackbar.open(res.message, 'Close', { duration: 5000, panelClass: 'error-snackbar' });
        }
      });
    }
  }

}
