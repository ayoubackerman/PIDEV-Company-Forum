import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})
export class CustomFormComponent {
  form: FormGroup;
  role: string;

  constructor(
    public dialogRef: MatDialogRef<CustomFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.role = data.role;

    // Define form controls and validators based on role
    this.form = this.fb.group({
      // Common fields
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    // Additional fields/validators based on specific roles
    switch (this.role) {
      case 'STUDENT':
        this.form.addControl('studentId', this.fb.control('', Validators.required));
        break;
      case 'TEACHER':
        this.form.addControl('subject', this.fb.control('', Validators.required));
        break;
      case 'COMPANY':
        this.form.addControl('companyName', this.fb.control('', Validators.required));
        this.form.addControl('position', this.fb.control('', Validators.required));
        break;
      // Add more roles as required
    }
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value);
      this.dialogRef.close(this.form.value); // Close with form data
    } else {
      console.warn('Invalid form submission');
    }
  }

  onCancel() {
    this.dialogRef.close(); // Close without any data
  }

}
