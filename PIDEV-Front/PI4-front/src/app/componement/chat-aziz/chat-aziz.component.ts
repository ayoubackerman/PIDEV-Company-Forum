import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from 'app/models/ChatMessage';
import { ChatAzizService } from 'app/services/chat-aziz.service';

@Component({
  selector: 'app-chat-aziz',
  templateUrl: './chat-aziz.component.html',
  styleUrls: ['./chat-aziz.component.css']
})
export class ChatAzizComponent {
  messageInput: string = '';
  userId: string="";
  messageList: any[] = [];

  constructor(private chatService: ChatAzizService ,
    private route: ActivatedRoute
    ){

  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    this.chatService.joinRoom("ABC");
    this.lisenerMessage();
  }

  sendMessage() {
    const chatMessage = {
      message: this.messageInput,
      user: this.userId
    }as ChatMessage
    this.chatService.sendMessage("ABC", chatMessage);
    this.messageInput = '';
  }

  lisenerMessage() {
    this.chatService.getMessageSubject().subscribe((messages: any) => {
      this.messageList = messages.map((item: any)=> ({
        ...item,
        message_side: item.user === this.userId ? 'sender': 'receiver'
      }))
    });
  }
}
