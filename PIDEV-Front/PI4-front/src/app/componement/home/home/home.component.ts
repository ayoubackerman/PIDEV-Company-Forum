import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ngOnInit() {
    AOS.init({
      duration: 1200, // animation duration
      once: false, // whether animation should happen only once or every time an element comes into view
    });
  }
}
