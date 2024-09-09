import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { KeycloakrestapiService } from 'app/services/KeycloakApi/keycloakrestapi.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  constructor(private route: ActivatedRoute, private userService: KeycloakrestapiService, public ks: KeycloakService) { }
  user = {} as KeycloakProfile;
  errorMessage!: string;
  public profile!: KeycloakProfile;
  userid!: string;

  async ngOnInit() {

    if (this.ks.isLoggedIn()) {
      this.profile = await this.ks.loadUserProfile();

    
       this.userid!=this.profile.id;
        this.userService.getUserById(this.profile.id!).subscribe(
          user => (this.user = user),
          error => (this.errorMessage = error.message)
        );
      
    }
    
  }

  onSubmit(): void {
    this.userService.updateUser(this.profile.id as any, this.user).subscribe(
      () => console.log('User updated successfully'),
      error => (this.errorMessage = error.message)
    );
  }
}
