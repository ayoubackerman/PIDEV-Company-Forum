import { Component } from '@angular/core';
import { QuizService } from 'app/services/quiz/quiz.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ScorePopupComponent } from '../score-popup/score-popup.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quizData: any[]=[];
  currentQuestionIndex: number = 0;
  userAnswers: boolean[] = [];
  score: number = 0;

  constructor(private quizService: QuizService, private router: Router , private dialog: MatDialog) {}

  ngOnInit(): void {
    this.quizService.getQuizData().subscribe((data) => {
      this.quizData = data;
    });
  }

  onOptionSelected(isCorrect: boolean): void {
    this.userAnswers[this.currentQuestionIndex] = isCorrect;
  }

  onSubmitQuiz(): void {
    const correctAnswers = this.userAnswers.filter((answer) => answer === true).length;
    this.score = correctAnswers;

    // Afficher le popup
    this.openScorePopup();
  }

  openScorePopup(): void {
    const dialogRef = this.dialog.open(ScorePopupComponent, {
      width: '300px', // Ajustez la largeur selon vos besoins
      data: { score: this.score, message: this.score > 2 ? 'Success' : 'Failure' }
    });

    dialogRef.afterClosed().subscribe(() => {
      // Redirection conditionnelle après la fermeture du popup
      if (this.score > 7) {
        this.router.navigate(['/addApp']);
      } else {
        this.router.navigate(['/appList']);
      }
    });
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.quizData.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  prevQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }
}
