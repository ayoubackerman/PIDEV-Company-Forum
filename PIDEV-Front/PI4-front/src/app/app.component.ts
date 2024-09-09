import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import {getMessaging,getToken, onMessage} from 'firebase/messaging'
import { environment } from 'environment/environment';
import { NotificationServiceService } from './services/notification/notification-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'PiDev';
  showNavbarAndFooter: boolean = true;

  message: any = null;


  constructor(private router: Router,private notif: NotificationServiceService) {}

  ngOnInit(): void {
    this.requestPermission();
    this.listenForMessages();
    
        this.router.events.pipe(
      // Properly use type assertion with the filter operator
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Directly set the visibility based on the URL
      this.showNavbarAndFooter = event.urlAfterRedirects !== '/not-found';
    });
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, {vapidKey: environment.firebaseConfig.vapidKey}).then(token => {
        if (token) {
       
       //  console.log(Request);
         this.notif.Subscribe(token,Request).subscribe(res=>{console.log("Successfully Subscribed")});
         
          console.log("token refreshed...", {token});
       //   this.sendTokenToServer(token);

        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }

    listenForMessages() {
      console.log("dd");
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
    }
    )
  }
}
