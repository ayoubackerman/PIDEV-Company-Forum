import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'app/services/application/application.service';

@Component({
  selector: 'app-update-application',
  templateUrl: './update-application.component.html',
  styleUrls: ['./update-application.component.css']
})
export class UpdateApplicationComponent {
  updateForm!: FormGroup;
  applicationId!: string | null;// Changer le type en string

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.paramMap.get('id');
  
    // Vérifier si applicationId est null avant de charger les données
    if (this.applicationId !== null) {
      this.applicationService.getApplicationByCode(this.applicationId).subscribe(application => {
        console.log(application);
        this.updateForm = this.formBuilder.group({
          contact: [application.contact, Validators.required],
          portfolio: [application.portfolio, Validators.required]
        });
      });
    } else {
      // Gérer le cas où applicationId est null, peut-être rediriger ou afficher un message d'erreur
    }
  }

  onSubmit(): void {
    // Vérifier si applicationId est null avant de tenter la mise à jour
    if (this.applicationId !== null) {
      this.applicationService.updateApplication(this.applicationId, this.updateForm.value).subscribe(() => {
        this.router.navigate(['/appList']);
      });
    } else {
      // Gérer le cas où applicationId est null
    }
  }

  isFormInitialized(): boolean {
    return !!this.updateForm;
  }
  onCancel(): void {
    this.router.navigate(['/appList']);
  }

}
