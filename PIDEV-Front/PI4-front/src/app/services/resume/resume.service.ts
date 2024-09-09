import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private apiUrl = 'http://localhost:9090/api'; 
  

  constructor(private http: HttpClient) { }

  postResume(resumeData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/resume`, resumeData);
  }

  getResume(filename: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/resumef?filename=${filename}`);
  }
}
