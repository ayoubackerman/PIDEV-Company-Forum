import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizUrl = 'assets/questions.json'; // Mettez le chemin correct vers votre fichier JSON

  constructor(private http: HttpClient) {}

  getQuizData(): Observable<any> {
    return this.http.get(this.quizUrl);
  }
}
