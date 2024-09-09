import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakrestapiService } from 'app/services/KeycloakApi/keycloakrestapi.service';
import { KeycloakService } from "keycloak-angular";
import { KeycloakProfile } from "keycloak-js";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title = 'pidev-app-angular';
  public profile!: KeycloakProfile;
  roles: any[] = [];

  constructor(private keycloakApi: KeycloakrestapiService, public ks: KeycloakService, private route: Router) { }
  async ngOnInit() {


    if (this.ks.isLoggedIn()) {
      this.profile = await this.ks.loadUserProfile();
      console.log(this.profile);
     // this.getRolesUser1();

    }

  }

  isMenuOpen = false;


  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  public onToggleSidenav = () => {

  }

  async handleLogin() {
    await this.ks.login({ 
      redirectUri: window.location.origin
    })
  }

  handleLogout() {
    this.ks.logout(window.location.origin);
  }


  manageAccout(): void {
    if (this.ks.isLoggedIn()) {
      const url = this.ks.getKeycloakInstance().createAccountUrl();
      window.location.href = url;
    } else {
      console.warn("User not logged in");

    }
  }
/*
  async getRolesUser1() {
    if (await this.ks.isLoggedIn()) {
      let username = this.profile.username;
      this.keycloakApi.getUserRoles(username!).subscribe(
        userroles => {
          this.roles = userroles;
          console.log('Fetched roles:', this.roles);
        },
        error => {
          console.error('Failed to fetch roles', error);
        }
      );
    } else {
      console.log('Not logged in, cannot fetch roles.');
    }
  }
  */

}
