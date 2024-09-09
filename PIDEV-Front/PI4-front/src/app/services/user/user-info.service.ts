import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
const BASE_URL = "http://localhost:9090/" 
@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private keycloakService: KeycloakService ,
    private http: HttpClient) { }

    getUser(id: string) {
      return this.http.get<any>(BASE_URL+`user/${id}`); 
    }

    addUser(user:any) {
      return this.http.post<any>(BASE_URL+ "user/add-info",user);
    }
  
    // updateUser(id: string, user: any) {
    //   return this.http.put<any>(`/api/users/${id}`, user);
    // }
  getRoles(){
return this.http.get<any>(BASE_URL+"rolesName");
}
  
}
