import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Inject } from '@angular/core';
import { Offre } from 'app/models/offre';
import { OffreService } from 'app/services/offre/offre.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  
  offre: Offre = {
    reference: '',
    title: '',
    location: '',
    description: '',
    deadline: new Date(),
    contratType: '',
    skills: '',
    experienceLevel: '',
    favorite: false ,
    publicationDate: new Date(),
    rating: 0,
    ratings: []

  };  
  reference: any;
  elapsedTime: string = '';

  constructor(
    private route: ActivatedRoute,
    private offreService: OffreService,
    private router: Router,
    private dialogRef: MatDialogRef<EditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {}

  ngOnInit(): void {
    if (this.data && this.data.offre) {
      this.offre = this.data.offre;
      this.calculateElapsedTime();
    } else {
      console.error('Data not received properly.');
    }
  }

  
  loadOfferDetails(reference: string): void {
    this.offreService.getOffre(reference).subscribe(
      (offre: Offre) => {
        this.offre = offre;
      },
      (error) => {
        console.error('Error retrieving offer details : ', error);
      }
    );
  }
  
  updateOffre(): void {
    if (this.isFormValid()) {
      this.offreService.updateOffre(this.offre.reference, this.offre).subscribe(
        (data: any) => {
          console.log('Offer updated successfully', data);
          location.reload();
        },
        (error) => {
          console.error('Error updating the offer:', error);
        }
      );
    } else {
      console.error('Invalid form. Please check the fields.');
    }
  }
  
  
  
  
  isFormValid(): boolean {
    return !!(
      this.offre &&
      this.offre.reference &&
      this.offre.title &&
      this.offre.location &&
      this.offre.description &&
      this.offre.deadline &&
      this.offre.contratType &&
      this.offre.skills &&
      this.offre.experienceLevel
    );
  }
  
  cancelEdit(): void {
    this.dialogRef.close('cancel');
  }
  calculateElapsedTime(): void {
    this.offreService.calculateElapsedTime(this.offre.reference).subscribe(
      (elapsedTime: string) => {
        this.elapsedTime = elapsedTime;
      },
      (error) => {
        console.error('Error calculating elapsed time:', error);
      }
    );
  }
}
