import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-stepper',
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.css']
})
export class FormStepperComponent {
  stepperForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.stepperForm = this.formBuilder.group({
      personalInfo: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),
      contactInfo: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        phone: ['']
      }),
      addressInfo: this.formBuilder.group({
        street: [''],
        city: [''],
        postalCode: ['']
      })
    });
  }

  isLastStep(i: number): boolean {
    return i === Object.keys(this.stepperForm.controls).length - 1;
  }

  isFirstStep(i: number): boolean {
    return i === 0;
  }

  onSubmit() {
    // Traitement des données soumises
    console.log(this.stepperForm.value);
  }

  next(stepper: any) {
    stepper.next();
  }

  previous(stepper: any) {
    stepper.previous();
  }
}
