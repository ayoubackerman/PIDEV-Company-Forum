import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL ='http://localhost:9090/Post';

@Injectable({
  providedIn: 'root'
})
export class ServicePostService {

  constructor(private http: HttpClient) {}
  addPost(PostDto: any, user_id:string): Observable<any> {
    return this.http.post(`${BASE_URL}/addpost/${user_id}`, PostDto);
  }

  getAllPosts(): Observable<any> {
    return this.http.get(BASE_URL);
  }

  getPostById(idItem: any): Observable<any> {
    return this.http.get(`${BASE_URL}/${idItem}`);
  }

  deletePost(idItem: any): Observable<any> {
    return this.http.delete(`${BASE_URL}/delete/${idItem}`);
  }

  updatepost(reclamationDto: any): Observable<any> {
    return this.http.put(`${BASE_URL}/update`, reclamationDto);
  }
}
