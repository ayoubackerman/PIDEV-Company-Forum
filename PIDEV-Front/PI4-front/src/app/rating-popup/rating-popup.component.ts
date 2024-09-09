import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rating-popup',
  templateUrl: './rating-popup.component.html',
  styleUrls: ['./rating-popup.component.css']
})
export class RatingPopupComponent {
  constructor(public dialogRef: MatDialogRef<RatingPopupComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
