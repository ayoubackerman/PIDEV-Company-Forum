import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from 'app/services/application/application.service';

@Component({
  selector: 'app-details-application',
  templateUrl: './details-application.component.html',
  styleUrls: ['./details-application.component.css']
})
export class DetailsApplicationComponent {
  application: any | null = null;

  constructor(private applicationService: ApplicationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadApplicationDetails();
  }

  loadApplicationDetails(): void {
    const codeCandidature = this.route.snapshot.paramMap.get('codeCandidature');
    
    if (codeCandidature) {
      this.applicationService.getApplicationByCode(codeCandidature).subscribe({
        next: (app) => this.application = app,
        error: (err) => console.error(err),
        complete: () => console.info('Application details loading completed')
      });
    }
  }
  getProgressBarDetails(status: any): { progress: number, color: string } {
    switch (status) {
      case "SUBMITTED":
        return { progress: 25, color: '#ffc107' }; 
      case "REJECTED":
        return { progress: 100, color: '#dc3545' }; 
      case "ACCEPTED":
        return { progress: 100, color: '#28a745' };
      case "IN_PROGRESS":
        return { progress: 50, color: '#007bff' }; 
      default:
        return { progress: 0, color: '#6c757d' }; // Gris par défaut
    }
    
  }
  cancelAdd(): void {
    window.location.href = '/appList';
  }



}
