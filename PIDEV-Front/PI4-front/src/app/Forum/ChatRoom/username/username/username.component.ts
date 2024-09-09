import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent {
  username: string | undefined;

  constructor(private router: Router) {}

  connect(): void {
    if (this.username) {
      
      this.router.navigate(['/chat']);
    }
  }
}