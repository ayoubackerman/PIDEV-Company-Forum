import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';


const BASE_URL ="http://localhost:9090/api/v1/notifications/";

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  constructor(private http : HttpClient) { }

  Subscribe(token : any,dto:any):Observable<any>{
    return this.http.post(BASE_URL+`addToken/${token}`,dto);
  }

  
  }
