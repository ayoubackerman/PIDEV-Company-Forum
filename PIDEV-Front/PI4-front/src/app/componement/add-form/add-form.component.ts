import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OffreService } from 'app/services/offre/offre.service';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { OfferCardComponent } from '../offer-card/offer-card.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

enum ExperienceLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}
enum ContratType {
  CDI = 'CDI',
  CDD = 'CDD',
  Stage = 'Stage',
  Freelance = 'Freelance'
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
  providers: [OffreService]
})
export class AddFormComponent implements OnInit {
  experienceLevels = Object.values(ExperienceLevel);
  contratTypes = Object.values(ContratType);
  offreForm!: FormGroup;
  OfferArray: any[] = [];
  user_id :any ;
  public profile!: KeycloakProfile;

  constructor(private offreservice: OffreService, 
    private http: HttpClient, private fb: FormBuilder ,
    public dialogRef: MatDialogRef<OfferCardComponent>,@Inject(MAT_DIALOG_DATA) public data: { id: any },
    private ks:KeycloakService ) { }

  async ngOnInit(){
    if (this.ks.isLoggedIn()) {
      this.profile = await this.ks.loadUserProfile();
      console.log(this.profile.id);
    }
    this.offreForm = this.fb.group({
      reference: [null, [Validators.required]],
      title: [null, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]], 
      location: [null, [Validators.required]],
      description: [null, [Validators.required]],
      deadline: [null, [Validators.required]],
      contratType: [null, [Validators.required]],
      skills: [null, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]], 
      experienceLevel: [null, [Validators.required]],
      favorite: false

    });
  }


  addItem(): void {
    if (this.ks.isLoggedIn()) {
      let user_id = this.profile.id;
      console.log(user_id)
    if (this.offreForm.invalid) {
      this.offreForm.markAllAsTouched();
    } else {
      
      this.offreservice.addOffre(this.offreForm.value,this.data.id).subscribe(
        (res: any) => {
          if (res['id'] !== null) {
            this.offreForm.reset();
            this.getAllOffres();
          } else {
            console.log(res);
          }
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout de l\'offre :', error);
        }
      );
    }
  }
}
  
  getAllOffres(): void {
    this.offreservice.getAllOffres().subscribe(
      (res: any) => {
        this.OfferArray = res;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des offres :', error);
      }
    );
  }
  


  cancelAdd(): void {
    window.location.href = '/offercard';
  }
  
}