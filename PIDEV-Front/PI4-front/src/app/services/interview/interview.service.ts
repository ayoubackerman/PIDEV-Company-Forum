import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private BASE_URL = "http://localhost:9090/Interview"; 

  constructor(private http: HttpClient) { }


  scheduleInterview(interview: any, applicationId: string) {
    return this.http.post<any>(this.BASE_URL + "/scheduleInterview?applicationId=" + applicationId, interview);
  }
  
  getInterviews():Observable<any>{

    return this.http.get(this.BASE_URL+"/allInterviews")
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return of(null); // Vous pouvez ajuster cela en fonction de vos besoins de gestion d'erreur
  }
  
  getInterviewByCode(code: string): Observable<any> {
    const url = `${this.BASE_URL}/getInterviewByCode/${code}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
    //return this.http.get<any>(url);
  }

  
  addEventToGoogleCalendar(event: any) {
    return this.http.post(`http://localhost:9090/Calender/add-event`, event);
  }
}
