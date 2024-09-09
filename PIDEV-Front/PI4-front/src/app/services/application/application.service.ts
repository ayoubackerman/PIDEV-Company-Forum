import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  BASE_URL="http://localhost:9090/Application";
  constructor(private http : HttpClient) { }

   
  
addApplication(app:any,user_id:string,offer_id:Number):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  return this.http.post(`${this.BASE_URL}/add/${user_id}/${offer_id}`,app, httpOptions);
 
}


getApplications():Observable<any>{
  return this.http.get(this.BASE_URL+"/allApplications")
}

getApplicationByCode(code: string): Observable<any> {
  const url = `${this.BASE_URL}/getApplicationByCode/${code}`;
  return this.http.get<any>(url).pipe(
    catchError(this.handleError)
  );
  //return this.http.get<any>(url);
}

cancelApplication(appCode: string): Observable<any> {
  const url = `${this.BASE_URL}/cancelApplication/${appCode}`;
  return this.http.delete(url);
}


updateApplication(id: string, updatedData: any): Observable<any> {
  const url = `${this.BASE_URL}/${id}`;
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  return this.http.put<any>(url, updatedData, httpOptions).pipe(
    catchError(this.handleError)
  );
}

private handleError(error: any): Observable<any> {
  console.error('An error occurred:', error);
  return of(null); // Vous pouvez ajuster cela en fonction de vos besoins de gestion d'erreur
}
}
