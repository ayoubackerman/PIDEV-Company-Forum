import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent  implements OnInit, OnDestroy {
  messages: any[] = [];
  message!: string;
  messageSubscription!: Subscription;

  ngOnInit(): void {
   
    
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  sendMessage(): void {
    if (this.message) {
      
    }
  }
}