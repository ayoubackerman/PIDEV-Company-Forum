import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-score-popup',
  template: `
    <h2>Your Score</h2>
    <p>{{ data.score }}</p>
    <p>{{ data.message }}</p>
    <button mat-button (click)="closeDialog()">OK</button>
  `,
  styleUrls: ['./score-popup.component.css']
})
export class ScorePopupComponent {
  constructor(
    public dialogRef: MatDialogRef<ScorePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}


