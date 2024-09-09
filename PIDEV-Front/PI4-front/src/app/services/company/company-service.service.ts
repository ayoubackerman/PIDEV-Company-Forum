import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {
  private apiUrl = 'http://localhost:9090/'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }

  getAllCompanies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}api/company-reviews/getAllCompanies`);
  }

  AllComp():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}Users/COMPANY`);
  }

  addCompanyReview(companyId: number, review: string): Observable<any> {
    const reviewData = { companyId, review };
    return this.http.post<any>(`${this.apiUrl}/company-reviews`, reviewData);
  }
}
