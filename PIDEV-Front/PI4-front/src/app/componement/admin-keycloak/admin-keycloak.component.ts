import { Component } from '@angular/core';
import { KeycloakrestapiService } from 'app/services/KeycloakApi/keycloakrestapi.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-admin-keycloak',
  templateUrl: './admin-keycloak.component.html',
  styleUrls: ['./admin-keycloak.component.css']
})
export class AdminKeycloakComponent {

constructor( 
  private ks :KeycloakService,
  private keycloakadmin: KeycloakrestapiService){}
  ngOnInit(){
    console.log(this.ks.getToken());
this.keycloakadmin.getAllUsers().subscribe((data)=>{
  try{
    
console.log("Data received", data);
  }
catch(err) { console.error('Error in getting users ', err)};
})
}






}
