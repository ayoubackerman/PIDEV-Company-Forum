import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  
  Contact =  new FormGroup({
    fullName: new FormControl('',[Validators.required]),
    sub: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    msg: new FormControl('',[Validators.required]),

  })

}
