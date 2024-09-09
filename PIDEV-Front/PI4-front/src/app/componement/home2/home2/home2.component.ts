import { Component, OnInit } from '@angular/core';
import * as aos from 'aos';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit {

  ngOnInit() {
    aos.init({
      duration: 1200, // animation duration
      once: false, // whether animation should happen only once or every time an element comes into view
    });
  }
}
