import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DMService {
  

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://127.0.0.1:8000/v1/v1';  // Base URL for API
  

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'API_KEY': 'key'  // Replace 'key' with the actual API key
    });
  }

  domainModel(data: { niveau_etude: number, competences: string[] }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/domaine_model`, data, { headers: this.getHeaders() });
  }
  

  sentimentModel(text: string): Observable<any> {
    const payload = { review: text };  // Ensure 'review' is the expected key
    return this.http.post<any>(`${this.apiUrl}/sentiment_model`, payload, { headers: this.getHeaders() });
  }

  private url = 'http://localhost:5000/predict';  



  predictSentiment(text: string): Observable<any> {
    return this.http.post<any>(this.url, {text: text});
  }
}
  

