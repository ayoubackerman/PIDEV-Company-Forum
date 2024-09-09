import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL ="http://localhost:9090/";

@Injectable({
  providedIn: 'root'
})
export class BidServiceService {

  constructor(private http : HttpClient) { }

  
  getBid():Observable<any>{
    return this.http.get(BASE_URL+"api/admin/Bid"
    )
  }
  chageStauts( id : any,Bid:any){
    return this.http.put(BASE_URL+`api/admin/Bid/Edit/${id}`,Bid)
  }

  addBid(bidDto : any):Observable<any>{
    return this.http.post(BASE_URL+"api/admin/Bid/Add",bidDto);
  }

  getBidByAuctionId(id : any):Observable<any>{
    return this.http.get(BASE_URL+`api/admin/Bid/getByAuctioid/${id}`)
  }
}
