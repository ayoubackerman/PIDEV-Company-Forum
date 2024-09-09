import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ChatService } from 'app/services/chat/chat.service';
import { DeviService } from 'app/services/devi/devi.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  prompt = '';
  content = '';

  constructor(
    private chatservice: ChatService,
    private pdf:DeviService,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.content = 'Waiting for a response...';
    this.chatservice.getContent(this.prompt).subscribe(
      data => {
        this.content = data.content;
      },
      err => {
        this.content = err.error;
      }
    );
  }

  resetPrompt(): void  {
    this.prompt = '';
  }

  resetContent(): void {
    this.content = '';
  }



}
