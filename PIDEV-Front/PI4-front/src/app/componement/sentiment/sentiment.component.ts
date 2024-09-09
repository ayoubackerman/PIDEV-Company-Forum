import { Component } from '@angular/core';
import { DMService } from 'app/services/dm.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent {
  text: string = '';
  sentiment: string = '';

  constructor(private sentimentService: DMService) { }

  onPredict(): void {
    this.sentimentService.predictSentiment(this.text).subscribe({
      next: (response) => {
        this.sentiment = `Received sentiment: ${response.sentiment}`;
      },
      error: (err) => {
        console.error('API error: ', err);
      }
    });
  }

}
