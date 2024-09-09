import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

const BASE_URL = "http://localhost:9090/api/admin/Stand"; // Correction de l'URL de base

@Injectable({
  providedIn: 'root'
})
export class StandServiceService {

  constructor(private http: HttpClient) { }

  getStandsBySession(sessionId: any): Observable<any[]> {
    return this.http.get<any[]>(BASE_URL + `/stands/session/${sessionId}`); // Correction de la construction de l'URL
  }
  getStands(): Observable<any[]> {
    return this.http.get<any[]>(BASE_URL) // Correction de l'URL
      .pipe(
        catchError(this.handleError)
      );
  }
  
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error.message || 'Server error');
  }

  chageStauts( id : any,Bid:any){
    return this.http.put(BASE_URL+`/Edit/${id}`,Bid)
  }
}
