import { Component } from '@angular/core';
import { InterviewService } from 'app/services/interview/interview.service';

@Component({
  selector: 'app-list-interviews',
  templateUrl: './list-interviews.component.html',
  styleUrls: ['./list-interviews.component.css']
})
export class ListInterviewsComponent {
  interviews: any[] = [];

  constructor(private interviewService: InterviewService) { }

  ngOnInit(): void {
    this.loadInterviews();
  }

  loadInterviews() {
    this.interviewService.getInterviews().subscribe(
      (data: any) => {
        this.interviews = data; 
      },
      (error: any) => {
        console.log('Error fetching interviews', error); 
      }
    );
  }

  

}
