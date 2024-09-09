import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DMService } from 'app/services/dm.service';

@Component({
  selector: 'app-dm',
  templateUrl: './dm.component.html',
  styleUrls: ['./dm.component.css']
})
export class DMComponent {

  reviewText: string = '';
  result: any;
  niveauEtude!: number;
  competences: string = '';
  sentimentResult: any;
  domainResult: any;

  constructor(private http: HttpClient , private dm : DMService) { }

  analyzeSentiment(): void {
    this.dm.sentimentModel(this.reviewText).subscribe(
      data => {
        this.result = data;
        console.log('Sentiment Analysis Result:', data);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  

  analyzeDomain(): void {
    const competencesArray = this.competences.split(',').map(s => s.trim());  // Convert string to array
    this.dm.domainModel({
      niveau_etude: this.niveauEtude,
      competences: competencesArray
    }).subscribe(
      data => {
        this.domainResult = data;
        console.log('Domain Analysis Result:', data);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  
}
