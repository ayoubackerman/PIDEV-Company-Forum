import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stomp } from '@stomp/stompjs';
import { ChatMessage } from 'app/models/ChatMessage';
import * as SockJS from 'sockjs-client';
@Injectable({
  providedIn: 'root'
})
export class ChatAzizService {


  private stompClient: any;
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  constructor() { 
    this.initConnectionSocket(); // Correct the method name
  }

  initConnectionSocket() { // Correct the method name
    const url = '//localhost:9090/3chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }

  joinRoom(roomId: string) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        const currentMessage = this.messageSubject.getValue();
        console.log(currentMessage)
        currentMessage.push(messageContent);
        this.messageSubject.next(currentMessage);
      });
    });
  }
  
  sendMessage(roomId: string, chatMessage: ChatMessage) {
    this.stompClient.send(`/app/componement/chat-aziz/${roomId}`, {}, JSON.stringify(chatMessage));
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }
}
