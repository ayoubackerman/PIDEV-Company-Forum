import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewService } from 'app/services/interview/interview.service';

@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.css']
})
export class ScheduleInterviewComponent {
  form!: FormGroup;
  selectedApplicationId!: string;

  constructor(
    private fb: FormBuilder, 
    private interviewService: InterviewService, 
    private router: Router ,
    private route: ActivatedRoute ) {
  }
 
  ngOnInit(): void {
    // Subscribe to route parameters to get the ID
    this.route.params.subscribe(params => {
      this.selectedApplicationId = params['id']; // Accessing the 'id' parameter from the route
    });
    console.log(this.selectedApplicationId);

    this.form = this.fb.group({
      type: [''],
      location: [''],
      title:[''],
      startDate:[''],
      endDate:['']
    });
  }

  submit(): void {
   
    if (this.form.value) {
      this.interviewService.scheduleInterview(this.form.value,this.selectedApplicationId).subscribe({
        next: (response) => {
          console.log('Entretien planifié avec succès !', response);
          // Rediriger vers une autre vue, par exemple la liste des entretiens
          this.router.navigate(['/interviewList']);
        },
        error: (error) => {
          console.error('Erreur lors de la planification de l\'entretien', error);
          // Traiter l'erreur ici (afficher un message, etc.)
        }
      });
    } else {
      // Traiter le cas où le formulaire n'est pas valide
      console.error('Le formulaire n\'est pas valide');
    }
  }


}
