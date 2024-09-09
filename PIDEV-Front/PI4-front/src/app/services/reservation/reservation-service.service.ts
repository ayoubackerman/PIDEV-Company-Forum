import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL ="http://localhost:9090/";

@Injectable({
  providedIn: 'root'
})
export class ReservationServiceService {

  constructor(private http:HttpClient) { }

  getAllstand():Observable<any>{
    return this.http.get(BASE_URL+"api/admin/Stand"
    )
  }
  // getStandsBySession(sessionId: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/sessions/${sessionId}/stands`);
  // }
  getStandsBySession(sessionId : string):Observable<any>{
    return this.http.get(BASE_URL+`api/admin/Session/${sessionId}/stands`
    );
  }
  getAllsession():Observable<any>{
    return this.http.get(BASE_URL+"api/admin/Session"
    )
  }

  
  addItem(reservationDto:any):Observable<any>{
    return this.http.post(BASE_URL+"api/admin/Reservation/Add",reservationDto)
  }
  addStand(reservationDto:any):Observable<any>{
    return this.http.post(BASE_URL+"api/admin/Stand/Add",reservationDto)
  }
  getItem():Observable<any>{
    return this.http.get(BASE_URL+"api/admin/Reservation"
    )
  }
  getItemById(idItem : any):Observable<any>{
    return this.http.get(BASE_URL+`api/admin/Reservation/${idItem}`
    )
  }
 
  deleteItemById(idItem : any):Observable<any>{
    return this.http.delete(BASE_URL+`api/admin/Reservation/delete/${idItem}`)
  }
  updateItem(idItem : number, itemDto : any):Observable<any>{
    return this.http.put(BASE_URL+`api/admin/Reservation/Update/${idItem}`,itemDto);
  }
  getPack(): Observable<any> {
    return this.http.get(BASE_URL + "api/admin/Pack");
  }

}
