import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';

const BASE_URL ="http://localhost:9090/";

@Injectable({
  providedIn: 'root'
})
export class DeviService {

  constructor(private http: HttpClient) {}
 
  getDevi():Observable<any>{
    return this.http.get(BASE_URL+"api"
    )
  }

  addDevi(deviDto:any):Observable<any>{
    return this.http.post(BASE_URL+"api/Add",deviDto)
  }
  deleteDeviById(idDevi : any):Observable<any>{
    return this.http.delete(BASE_URL+`api/delete/${idDevi}`)
  }
}
