import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewService } from 'app/services/interview/interview.service';

@Component({
  selector: 'app-interview-details',
  templateUrl: './interview-details.component.html',
  styleUrls: ['./interview-details.component.css']
})
export class InterviewDetailsComponent {
  interview: any | null = null;

  constructor(private interviewService: InterviewService, private route: ActivatedRoute , private router : Router) { }

  ngOnInit(): void {
    this.loadInterviewDetails();
  }

  loadInterviewDetails(): void {
    const codeInterview = this.route.snapshot.paramMap.get('codeInterview');
    
    if (codeInterview) {
      this.interviewService.getInterviewByCode(codeInterview).subscribe({
        next: (app) => this.interview = app,
        error: (err) => console.error(err),
        complete: () => console.info('Interview details loading completed')
      });
    }
  }

  cancelAdd(): void {
    window.location.href = '/interviewList';
  }
  

  navigateToMeetingOrMap(): void {
    if (this.interview && this.interview.type === 'ONLINE') {
      // Rediriger vers l'interface de réunion en ligne (par exemple '/meeting')
      this.router.navigate(['/meeting']);
    } else if (this.interview && this.interview.type === 'IN_PERSON') {
      this.router.navigate(['/map']);
    }
  }
    
  


}
