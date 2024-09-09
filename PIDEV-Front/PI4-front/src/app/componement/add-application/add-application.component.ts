import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'app/services/application/application.service';
import { KeycloakService } from "keycloak-angular";
import { KeycloakProfile } from "keycloak-js";

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.css']
})
export class AddApplicationComponent {
  public profile!: KeycloakProfile;


  applicationForm!: FormGroup;


  constructor(private applicationService: ApplicationService,
    private http: HttpClient, public ks: KeycloakService, private fb: FormBuilder, private router: Router , private ac : ActivatedRoute) { }

  async ngOnInit() {

    if (this.ks.isLoggedIn()) {
      this.profile = await this.ks.loadUserProfile();
      console.log(this.profile.id);
    }
    this.applicationForm = this.fb.group({
      contact: ['', [Validators.required, Validators.email]],
      portfolio: ['', [Validators.required, Validators.pattern('https?://.+')]],

    });
  }


  addApplication(): void {
    const offre_id = this.ac.snapshot.paramMap.get('reference');
    
    if (this.ks.isLoggedIn()) {
      let user_id = this.profile.id;
      console.log(user_id)
      if (this.applicationForm.value){
        this.applicationService.addApplication(this.applicationForm.value, user_id as string ,1 ).subscribe(
          (response) => {
            console.log(response);
            console.log('App créée avec succès !', response);
            this.router.navigate(['/appList']);
          },
          (error) => {
            console.error('Erreur lors de la création de la App : ', error);
          }

        )
      }
    }
  }
  cancelAdd(): void {
    window.location.href = '/appList';
  }

}
