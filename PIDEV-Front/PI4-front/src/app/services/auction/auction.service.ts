import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL ="http://localhost:9090/";


@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  constructor(private http:HttpClient) { }

  getAuction():Observable<any>{
    return this.http.get(BASE_URL+"api/admin/Auction"
    )
  }

  addItem(idItem : any,dto : any):Observable<any>{
    return this.http.post(BASE_URL+`api/admin/Auction/Add/${idItem}`,dto);
  }

}
