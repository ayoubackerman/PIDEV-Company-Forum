import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL ='http://localhost:9090/Reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  constructor(private http: HttpClient) {}

  addItem(reclamationDto: any, user_id:string): Observable<any> {
    return this.http.post(`${BASE_URL}/add/${user_id}`, reclamationDto);
  }


  getItem(): Observable<any> {
    return this.http.get(BASE_URL);
  }

  getItemById(idItem: any): Observable<any> {
    return this.http.get(`${BASE_URL}/${idItem}`);
  }

  deleteItemById(idItem: any): Observable<any> {
    return this.http.delete(`${BASE_URL}/delete/${idItem}`);
  }

  updateItem(reclamationDto: any): Observable<any> {
    return this.http.put(`${BASE_URL}/update`, reclamationDto);
  }
}
