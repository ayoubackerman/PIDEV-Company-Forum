import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-info-modal',
  templateUrl: './user-info-modal.component.html',
  styleUrls: ['./user-info-modal.component.css']
})
export class UserInfoModalComponent {
  public firstFormGroup!: FormGroup;
  public currentStep = 0;
  public steps = [
    { label: 'Account Details' },
    { label: 'Personal Details' },
    { label: 'Payment Details' }
  ];
  public countries: Array<string> = ['Country 1', 'Country 2', 'Country 3'];

  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<UserInfoModalComponent>) {}

  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      accountDetails: this.fb.group({
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }),
      personalDetails: this.fb.group({
        fullName: ['', Validators.required],
        country: ['', Validators.required]
      }),
      paymentDetails: this.fb.group({
        cardNumber: ['', Validators.required],
        cvc: ['', [Validators.required, Validators.minLength(3)]]
      })
    });
  }

  next(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prev(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submitForm(): void {
    console.log(this.firstFormGroup.value);
    // Send this data to your backend or handle it as needed
    this.dialogRef.close(this.firstFormGroup.value);  // Close the modal and optionally pass the form data
  }
}
