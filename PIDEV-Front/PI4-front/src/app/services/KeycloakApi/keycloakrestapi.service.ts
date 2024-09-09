import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { Observable } from 'rxjs';
const BASE_URL = "http://localhost:9090/" 
@Injectable({
  providedIn: 'root'
})
export class KeycloakrestapiService {

  constructor(private http: HttpClient) { }


  getAllUsers(){
    return this.http.get(BASE_URL + "liste-users");
  }
  getAllRolesByNames(){
    return this.http.get(BASE_URL +"liste-RolesNames");
  }

  AddRoleToUser(roleName: string, username: string){
    const roleData = { roleName, username };
    return this.http.post(BASE_URL + "add-role-to-user",roleData);
  }


  getUserRoles(username: string){
    return this.http.get<string[]>(BASE_URL+"users/roles/"+username) ;
  }


  DeleteRoleFromUser(username: string,roleName:string){
    return this.http.delete<string[]>(BASE_URL+username +"/roles/"+roleName) ;
  }


  updateUser(userId: string, user: KeycloakProfile): Observable<void> {
    const url = `${BASE_URL}users/${userId}`;
    return this.http.put<void>(url, user);
  }

  getUserById(id: string): Observable<any> {
    const url = `${BASE_URL}users/${id}`;
    return this.http.get<any>(url);
  }

}
