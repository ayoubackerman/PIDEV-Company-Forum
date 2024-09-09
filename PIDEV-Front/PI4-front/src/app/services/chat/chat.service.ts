import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  springURL = 'http://localhost:9090/api/chat/chatgpt';

  constructor(private httpClient: HttpClient) { }

  public getContent(prompt: string): Observable<any> {
    return this.httpClient.post<any>(this.springURL, prompt);
  }}
