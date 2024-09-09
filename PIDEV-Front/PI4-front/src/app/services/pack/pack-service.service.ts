import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:9090";

@Injectable({
  providedIn: 'root'
})
export class PackServiceService {
  

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }; 
  getItem(): Observable<any> {
    return this.http.get(BASE_URL + "/api/admin/Pack",this.httpOptions);
  }

  getItemById(idItem: any): Observable<any> {
    return this.http.get(BASE_URL + `/api/admin/Pack/${idItem}`);
  }

  addItem(itemDto: any): Observable<any> {
    return this.http.post(BASE_URL + "/api/admin/Pack/add", itemDto);
  }
  getPackTypes(): Observable<any> { // Ajout de la méthode pour récupérer les types de pack
    return this.http.get(BASE_URL + "/api/admin/Pack/types");
  }
  deleteItemById(idItem : any):Observable<any>{
    return this.http.delete(BASE_URL+`api/admin/Pack/delete/${idItem}`)
  }
}
