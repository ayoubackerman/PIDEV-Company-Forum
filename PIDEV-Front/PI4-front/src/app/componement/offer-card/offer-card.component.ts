import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { OffreService } from 'app/services/offre/offre.service';
import { Offre } from '../../models/offre';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { SearchHistory } from 'app/models/SearchHistory';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogFComponent } from 'app/confirmation-dialog/confirmation-dialog.component';
import { AddFormComponent } from '../add-form/add-form.component';

enum ExperienceLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

enum ContratType {
  CDI = 'CDI',
  CDD = 'CDD',
  Stage = 'Stage',
  Freelance = 'Freelance',
}

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css'],
})
export class OfferCardComponent implements OnInit {
  showAllOffers: boolean = false;  
  offreForm!: FormGroup;
  offres: Offre[] = [];
  searchHistory: SearchHistory[] = []; 
  filteredOffres: Offre[] = []; 
  experienceLevels = Object.values(ExperienceLevel);
  contratTypes = Object.values(ContratType);
  showConfirmation: boolean = false;
  public profile!: KeycloakProfile;
  user_id :any ;

  constructor(
    private offreService: OffreService, 
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef ,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ,public ks: KeycloakService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddFormComponent, {
      data:{ id : this.user_id},
      width: '500px',
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can handle any result or action after the dialog is closed
    });
  }
  openDialog2(): void {
    
    const dialogRef = this.dialog.open(AddFormComponent, {
      width: '500px',
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can handle any result or action after the dialog is closed
    });
  }
   async ngOnInit() {
    if (this.ks.isLoggedIn()) {
      this.profile = await this.ks.loadUserProfile();
      this.user_id = this.profile.id;
    }
    this.loadOffres();
    const storedSearchHistory = localStorage.getItem('searchHistory');
  if (storedSearchHistory) {
    try {
      this.searchHistory = JSON.parse(storedSearchHistory) as SearchHistory[];
    } catch (error) {
      console.error('Error parsing search history from local storage:', error);
      this.searchHistory = []; 
    }
  } else {
    this.searchHistory = []; 
  }
  
    this.offreForm = this.fb.group({
      reference: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      contratType: ['', [Validators.required]],
      skills: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      experienceLevel: ['', [Validators.required]],
    });
  
}

  addItem(): void {
    if (this.offreForm.invalid) {
        this.snackBar.open('Please fill in all required fields', 'Close');
        return;
    }
    this.offreService.addOffre(this.offreForm.value,this.user_id).subscribe({
        next: (res: any) => {
            if (res.reference) {
                this.snackBar.open('Offer added successfully', 'Close', {
                    duration: 5000,
                });
                this.offreForm.reset();
                this.loadOffres();
            } else {
                this.snackBar.open('An error occurred. Please try again', 'Close', {
                    duration: 5000,
                });
            }
        },
        error: (error: any) => {
            console.error('Erreur lors de l\'ajout de l\'offre:', error);
            this.snackBar.open('Error adding offer', 'Close', {
                duration: 5000,
            });
        },
    });
}

loadOffres() {
  this.offreService.getAllOffres().subscribe({
      next: (data) => {
          this.offres = data;
          this.sortOffersByRating(); 
          this.filteredOffres = [...this.offres]; 
      },
      error: (error) => {
          console.log('Error Loading Offers:', error);
      },
  });
}
sortOffersByRating() {
  this.filteredOffres = [...this.offres].sort((a, b) => b.rating - a.rating);
}

  showDetails(offre: Offre) {
    const navigationExtras: NavigationExtras = {
      state: {
        offre: offre,
      },
    };
    this.router.navigate(['/detailoffer', offre.reference], navigationExtras);
  }

  cancelAdd(): void {
    window.location.href = '/offercard';
  }
  navigateToFavorites() {
    this.router.navigateByUrl('/favorites');
  }
  exportToExcel(): void {
    const data: any[] = [];
    this.offres.forEach(offre => {
      const { reference, title, location, description, deadline, contratType, skills, experienceLevel } = offre;
      data.push([reference, title, location, description, deadline, contratType, skills, experienceLevel]);
    });

    // const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([['Reference', 'Title', 'Location', 'Description', 'Deadline', 'Contract Type', 'Skills', 'Experience Level'], ...data]);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Offers');
    // XLSX.writeFile(wb, 'offers.xlsx');
  }


  formatTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return new Date(date).toLocaleDateString('en-US', options);
  }

  /*navigateToOffer(searchQuery: string): void {
    const filteredOffers = this.offres.filter(offre =>
      offre.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offre.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    if (filteredOffers.length === 0) {
      // Display an alert indicating that no offer exists for the clicked search query
      this.snackBar.open('No offer found for this search query', 'Close', {
        duration: 5000,
      });
    } else {
      // Update filtered offers if offers are found for the clicked search query
      this.filteredOffres = filteredOffers;
    }
  }*/
  navigateToOffer(searchQuery: string): void {
    //  Check if searchQuery comes from search bar or search history
    const isSearchHistory = this.searchHistory.some(item => item.keyword === searchQuery);
  
    if (isSearchHistory) {
      // If searchQuery is from search history, filter offers based on that term
      this.filteredOffres = this.offres.filter(offre =>
        offre.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offre.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      this.offreService.searchOffresByTitle(searchQuery).subscribe({
        next: (offres: Offre[]) => {
          this.filteredOffres = offres;
          this.saveSearchHistory(searchQuery);
        },
        error: (error: any) => {
          console.error('Error searching for offers:', error);
          this.filteredOffres = []; 
        }
      });
    }
    if (this.filteredOffres.length === 0) {
      this.snackBar.open('No offer found for this search term', 'Close', {
        duration: 5000,
      });
    }
  }
  
//button show more and show less
  toggleAllOffers(): void {
    this.showAllOffers = !this.showAllOffers;
  }

  searchOffers(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement;
      const keyword = target.value.trim();
      if (keyword !== '') {
        this.offreService.searchOffresByTitle(keyword).subscribe({
          next: (offres: Offre[]) => {
            this.filteredOffres = offres;
            this.saveSearchHistory(keyword);
          },
          error: (error: any) => {
            console.error('Error searching for offers:', error);
            this.filteredOffres = [];
          }
        });
      } else {
        this.loadOffres();
      }
    }
  }
  
  
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchOffers(event);
    }
  }

 
  saveSearchHistory(keyword: string) {
    const searchHistory: SearchHistory = {
      keyword,
      searchDate: new Date(),
    };
  
    this.offreService.addSearchHistory(searchHistory).subscribe(
      (response) => {
        console.log('Search history saved:', response);
        this.searchHistory.push(response); 
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
      },
      (error) => console.error('Error saving search history:', error)
    );
  }
  fetchSearchHistory(): void {
    this.offreService.getSearchHistory().subscribe(
      (history: SearchHistory[]) => this.searchHistory = history,
      (error: any) => console.error('Error fetching search history:', error)
    );
  }
  updateSearchHistory(newEntry: SearchHistory) {
    this.searchHistory.push(newEntry);

    // Maintain a maximum of 10 entries based on search date 
    if (this.searchHistory.length > 10) {
      const entriesToRemove = this.searchHistory.length - 10;
      this.searchHistory.sort((a, b) => b.searchDate.getTime() - a.searchDate.getTime()); 
      this.searchHistory.splice(entriesToRemove); 
    }
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
  }
  clearSearchHistory(historyItem: SearchHistory) {
    const index = this.searchHistory.indexOf(historyItem);
    if (index > -1) {
      this.searchHistory.splice(index, 1);
        this.offreService.deleteSearchHistory(historyItem.keyword).subscribe({
        next: () => console.log('Search history item deleted successfully'),
        error: (error) => console.error('Error deleting search history item:', error)
      });
    }
  }
  deleteSearchHistory(keyword: string) {
    this.offreService.deleteSearchHistory(keyword)
      .subscribe(
        () => console.log('Search history item deleted successfully'),
        (error) => {
          let errorMessage = 'Failed to delete search history item.';
          if (error.error) {
            errorMessage = error.error.message || errorMessage; 
          }
          console.error('Error deleting search history:', error);
          alert(errorMessage);
        }
      );
  }
  
  clearSearchHistoryAll() {
    const dialogRef = this.dialog.open(ConfirmationDialogFComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.searchHistory = [];
        this.offreService.deleteAllSearchHistory().subscribe({
          next: () => console.log('Search history cleared successfully'),
          error: (error: any) => console.error('Error clearing search history:', error)
        });
      } else {
      }
    });
  }
  
  //button tous et nouveaux
  filterOffers(filterType: string) {
    if (filterType === 'all') {
      this.filteredOffres = [...this.offres]; 
    } else if (filterType === 'new') {
      const oneDayAgo = new Date(Date.now() - (24 * 60 * 60 * 1000));
      this.filteredOffres = this.offres.filter(offre => new Date(offre.publicationDate) >= oneDayAgo);
    } else {
      console.warn(`Filter type "${filterType}" not implemented yet.`);
      this.filteredOffres = [...this.offres]; 
    }
  }
  
  

  
  }
  
  



