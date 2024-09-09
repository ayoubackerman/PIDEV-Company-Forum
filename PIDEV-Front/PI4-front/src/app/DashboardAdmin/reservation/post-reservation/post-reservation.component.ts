import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { ReservationServiceService } from 'app/services/reservation/reservation-service.service';

@Component({
  selector: 'app-post-reservation',
  templateUrl: './post-reservation.component.html',
  styleUrls: ['./post-reservation.component.css']
})
export class PostReservationComponent {
  
    id!: number;

  selectedPack: any;
  email: any;

  ReservationForm!: FormGroup;
  listStand :any[] = [];
  packList :any[] = [];
  exposant: number = 0; 



  constructor(
    private actR: ActivatedRoute,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private adminService: ReservationServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = Number(this.actR.snapshot.paramMap.get('id'));

    this.ReservationForm = this.fb.group({
     // packtype: [null, [Validators.required]],
      packList: [null, [Validators.required]],
      email: [null, [Validators.required]],
      sessionLocation: [null, [Validators.required]],
        });
        this.getAllstand();
        this.getAllsession();

  }

  getAllstand(): void {
    this.adminService.getAllstand().subscribe(res => {
      this.listStand = res;
    });
  }
 

  getAllsession(): void {
    this.adminService.getPack().subscribe(res => {
      this.packList = res;
    });
  }



  addItem(): void {
    
   if (this.ReservationForm.invalid) {
      for (const i in this.ReservationForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.ReservationForm.controls, i)) {
          this.ReservationForm.controls[i].markAsDirty();
          this.ReservationForm.controls[i].updateValueAndValidity();
        }
      }
    } else {
      const formData: FormData = new FormData();
      formData.append('name', this.ReservationForm.get('packtype')!.value);
      formData.append('email' , this.ReservationForm.get('email')!.value);
      formData.append('description', this.ReservationForm.get('standNum')!.value);
      formData.append('quantity', this.ReservationForm.get('sessionLocation')!.value);
      this.adminService.addItem(formData).subscribe((res) => {
        if (res.id !== null) {
          console.log(formData);

          this.snackbar.open('item added successfully', 'Close', { duration: 5000 });
          this.router.navigateByUrl('/reservation');
        } else {
          console.log(res);
          this.snackbar.open(res.message, 'Close', { duration: 5000, panelClass: 'error-snackbar' });
        }
      });
    }
  }

  stand(){
    const idsessions = this.id; // Assuming you want to use 'id' as 'idsessions'
    const idpack = this.selectedPack?.id; // Assuming selectedPack has an 'id' property
console.log(this.email);
    if (idsessions && idpack) {
      this.router.navigate([`standss/${idsessions}/${idpack}/${this.email}`]);
    }
  }
}
