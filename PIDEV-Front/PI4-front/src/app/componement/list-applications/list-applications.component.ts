import { Component } from '@angular/core';
import { ApplicationService } from 'app/services/application/application.service';

@Component({
  selector: 'app-list-applications',
  templateUrl: './list-applications.component.html',
  styleUrls: ['./list-applications.component.css']
})
export class ListApplicationsComponent {
  applications: any[] = [];

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications() {
    this.applicationService.getApplications().subscribe(
      (data: any) => {
        this.applications = data; // Assign the retrieved applications to the local variable for use in the template
      },
      (error: any) => {
        console.log('Error fetching applications', error); // Handle error
      }
    );
  }

  cancelApplication(codeCandidature: string): void {
    this.applicationService.cancelApplication(codeCandidature).subscribe(
      () => {
        console.log('Application canceled successfully!');
        // Rafraîchir la liste d'applications après la suppression
        this.loadApplications(); // Appel pour récupérer à nouveau les applications après la suppression
      },
      (error) => {
        console.error('Error canceling application:', error);
        // Gérez les erreurs ici
      }
    );
  }


}
