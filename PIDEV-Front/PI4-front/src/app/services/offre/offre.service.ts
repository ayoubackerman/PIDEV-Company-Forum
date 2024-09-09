import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Offre } from '../../models/offre';
import { SearchHistory } from '../../models/SearchHistory';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  getContractTypeStatistics() {
    throw new Error('Method not implemented.');
  }

  private BASE_URL = "http://localhost:9090/";


  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  getAllOffres(): Observable<any> {

    return this.http.get(`${this.BASE_URL}Offer/getAll`, this.httpOptions);
  }

  addOffre(offre: any, user_id: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}Offer/addOffre/${user_id}`, offre);
  }

  addOffre1(offre: any, user_id: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}Offer/addOffre/${user_id}`, offre);
  }

  updateOffre(reference: string, offre: Offre): Observable<Offre> {
    const url = `${this.BASE_URL}Offer/offres/${reference}`;
    return this.http.put<Offre>(url, offre);
  }

  deleteOffre(reference: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}Offer/delete/${reference}`);
  }


  getOffre(reference: string): Observable<Offre> {
    return this.http.get<Offre>(`${this.BASE_URL}Offer/offres/${reference}`);
  }
  addToFavorites(reference: string, favoriteStatus: boolean): Observable<any> {
    const url = `${this.BASE_URL}Offer/offres/${reference}/favorite?favoriteStatus=${favoriteStatus}`;
    return this.http.put(url, {});
  }
  removeFromFavorites(offre: Offre): Observable<any> {
    return this.http.put<any>('http://localhost:9090/Offer/updateOffreAsNotFavorite', offre);
  }

  calculateElapsedTime(reference: string): Observable<string> {
    const url = `${this.BASE_URL}Offer/offres/${reference}/elapsedTime`;
    return this.http.get<string>(url);
  }

  rateOffre(reference: string, rating: number): Observable<Offre> {
    return this.http.put<Offre>(`${this.BASE_URL}Offer/offres/${reference}/rate`, { rating });
  }

  getSimilarOffers(reference: string): Observable<Offre[]> {
    const url = `${this.BASE_URL}Offer/offres/${reference}/similar`;
    return this.http.get<Offre[]>(url);
  }

  searchOffresByTitle(keyword: string): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.BASE_URL}Offer/offres/search?keyword=${keyword}`);
  }

  addSearchHistory(searchHistory: SearchHistory): Observable<SearchHistory> {
    const url = `${this.BASE_URL}Offer/search-history/add`;
    return this.http.post<SearchHistory>(url, searchHistory).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Error saving search history:', error);
    return throwError(() => new Error('Error saving search history'));
  }
  getSearchHistory(): Observable<SearchHistory[]> {
    const mockSearchHistory: SearchHistory[] = [
      { keyword: 'java', searchDate: new Date('2024-04-09') },
      { keyword: 'marketing', searchDate: new Date('2024-04-10') },
    ];
    return of(mockSearchHistory);
  }

  deleteSearchHistory(keyword: string): Observable<any> {
    const url = `${this.BASE_URL}Offer/search-history/delete`;
    const body = { keyword };

    return this.http.delete(url, { body })
      .pipe(
        catchError(error => {
          console.error('Error deleting search history item:', error);
          return throwError(new Error('Failed to delete search history item'));
        })
      );
  }

  deleteAllSearchHistory(): Observable<any> {
    const url = 'http://localhost:9090/Offer/search-history/clear';
    return this.http.delete(url, {});
  }


}
