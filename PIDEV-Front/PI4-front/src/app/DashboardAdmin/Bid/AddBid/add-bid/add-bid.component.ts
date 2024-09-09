import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BidServiceService } from 'app/services/bid/bid-service.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-add-bid',
  templateUrl: './add-bid.component.html',
  styleUrls: ['./add-bid.component.css']
})
export class AddBidComponent {
  BifForm!: FormGroup;
  userid!: string;
  public profile!: KeycloakProfile;


  constructor(
    private bidService: BidServiceService,
    private fb: FormBuilder,
    public ks: KeycloakService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<AddBidComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { codeAuction: any }
  ) {
    console.log(this.data); // Logging the passed data
  } 

  async ngOnInit() {
    if (await this.ks.isLoggedIn()) {
      this.profile = await this.ks.loadUserProfile();
      this.userid = this.profile.id ?? ''; // Safe assignment with fallback
      this.initializeForm(); // Initialize the form after the user data is loaded
    }
  }

  initializeForm() {
    this.BifForm = this.fb.group({
      idUser: [this.userid, Validators.required], // Using the loaded userid
      idAuction: [this.data.codeAuction, Validators.required],
      amount: ['', Validators.required]
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onFormSubmit() {
    console.log(this.BifForm.value);
    if (this.BifForm.valid) {
      console.log(this.userid);
      const formData = new FormData();
      formData.append('idUser', this.userid);
      formData.append('idAuction', this.data.codeAuction);
      formData.append('amount', this.BifForm.get('amount')!.value);
      console.log(formData);

      this.bidService.addBid(formData).subscribe({
        next: (response) => {
          console.log('Bid created successfully', response);
          this.snackbar.open('Your bid added successfully', 'Close', { duration: 5000 });
        },
        error: (error) => {
          console.error('Error creating bid', error);
          this.snackbar.open('Error while placing bid', 'Close', { duration: 5000 });
        }
      });
    }
  }
}
