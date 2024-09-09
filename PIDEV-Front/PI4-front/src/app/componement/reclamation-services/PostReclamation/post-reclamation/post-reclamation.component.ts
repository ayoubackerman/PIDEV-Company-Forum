import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReclamationService } from 'app/services/ServiceReclamation/reclamation.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-post-reclamation',
  templateUrl: './post-reclamation.component.html',
  styleUrls: ['./post-reclamation.component.css']
})
export class PostReclamationComponent implements OnInit {
  itemForm!: FormGroup;
  public profile!: KeycloakProfile;
  
  types = [
    {value: 'Inappropriate Content', viewValue: 'Inappropriate Content'},
    {value: 'Technical Issues', viewValue: 'Technical Issues'},
    {value: 'Harassment or Abuse', viewValue: 'Harassment or Abuse'},
    {value: 'Moderation Error', viewValue: 'Moderation Error'},
    {value: 'Outdated Content', viewValue: 'Outdated Content'}
  ];

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private reclamationService: ReclamationService,
    private router: Router,
    public ks: KeycloakService  ) {}
 
  async ngOnInit(): Promise<void> {
    this.initializeForm();
    if (this.ks.isLoggedIn()) {
      this.profile = await this.ks.loadUserProfile();
      console.log(this.profile.id);
    }
  }

  initializeForm(): void {
    this.itemForm = this.fb.group({

      description: [null, [Validators.required]],
      type: [null, [Validators.required]]
    });
  }

  addItem(): void {
    if (this.ks.isLoggedIn()) {
      let user_id = this.profile.id;
      console.log(user_id)
    if (this.itemForm.valid) {
      
      const commentPayload = {
        description: this.itemForm.value.description,
        type: this.itemForm.value.type
        
      };
      
      // Call the service method to add the item
      this.reclamationService.addItem(commentPayload, user_id as string).subscribe(
        (res) => {
          if (res.id !== null) {
            // If the item is added successfully, show success message and navigate
            this.snackbar.open('Item added successfully', 'Close', { duration: 5000 });
            this.router.navigateByUrl('/reclamation');
          } else {
            // If the server returns an error, show error message
            this.snackbar.open('Failed to add item', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
          }
        },
        (error) => {
          // If there is an error during the HTTP request, show error message
          console.error('Error:', error);
          this.snackbar.open('An error occurred you have 0 reclamation', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
        }
      );
    } else {
      // Mark all form fields as touched to display error messages
      this.itemForm.markAllAsTouched();
    }
  }
}}
