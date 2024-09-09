import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarServiceService {

  constructor() { }
  private showNavbarAndFooterSubject = new BehaviorSubject<boolean>(true);
  showNavbarAndFooter$ = this.showNavbarAndFooterSubject.asObservable();

  updateVisibility(value: boolean) {
    this.showNavbarAndFooterSubject.next(value);
  }
}
