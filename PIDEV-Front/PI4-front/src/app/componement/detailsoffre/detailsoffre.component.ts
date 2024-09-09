import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offre } from 'app/models/offre';
import { OffreService } from 'app/services/offre/offre.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { RatingPopupComponent } from 'app/rating-popup/rating-popup.component';



@Component({
  selector: 'app-detailsoffre',
  templateUrl: './detailsoffre.component.html',
  styleUrls: ['./detailsoffre.component.css']
})
export class DetailsoffreComponent implements OnInit {
  offre: Offre = {
    reference: '',
    title: '',
    location: '',
    description: '',
    deadline: new Date(),
    contratType: '',
    skills: '',
    experienceLevel: '',
    favorite: false ,
    publicationDate: new Date(),
    rating: 0,
    ratings: []
  
  };  
  reference: any;
  isShareDropdownOpen: boolean = false; 
  elapsedTime: string = ''; 
  similarOffers: Offre[] = [];


  constructor(
    private route: ActivatedRoute,
    private offreService: OffreService,
    private router: Router,
    private dialog: MatDialog,
  ) { 
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.offre = navigation.extras.state['offre'];
    }
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      const stateData = navigation.extras.state as { offre: Offre }; 
      this.offre = stateData.offre;
      this.loadElapsedTime(this.offre.reference); 
    } else {
      this.route.paramMap.subscribe(params => {
        const reference = params.get('reference');
        if (reference) {
          this.loadOfferDetails(reference);
          this.loadElapsedTime(reference); 
          this.loadSimilarOffers(reference); 

        }
      });
    }
  }
  
  

  loadOfferDetails(reference: string): void {
    this.offreService.getOffre(reference).subscribe(
      (offre: Offre) => {
        this.offre = offre;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'offre : ', error);
      }
    );
  }

  openEditPopup(): void {
    const dialogRef = this.dialog.open(EditFormComponent, {
      width: '500px',
      data: { offre: this.offre } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        console.log('Edit successfully done.');
      }
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/offercard'); 
  }

  deleteOffer(reference: string): void {
    this.offreService.deleteOffre(reference).subscribe(
      () => {
        console.log('Offer deleted successfully.');
        this.router.navigateByUrl('/offercard'); 
      },
      (error) => {
        console.error('Error deleting offer:', error);
      }
    );
  }
  addToFavorites(): void {
    if (this.offre && this.offre.reference) {
        if (this.offre.favorite) {
            alert('Cette offre est déjà dans vos favoris.');
            return; 
        }

        this.offreService.addToFavorites(this.offre.reference, true).subscribe(
            () => {
                console.log('Offer added to favorites successfully.');
                this.offre.favorite = true;
                alert('L\'offre a été ajoutée avec succès à vos favoris.');
            },
            (error) => {
                console.error('Error adding offer to favorites:', error);
            }
        );
    } else {
        console.error('Offer reference is missing or undefined.');
    }
}
toggleShareDropdown(): void {
  this.isShareDropdownOpen = !this.isShareDropdownOpen;
}

shareOnFacebook(): void {
  window.open('https://www.facebook.com/?locale=fr_FR' + encodeURIComponent(window.location.href), '_blank');
  this.isShareDropdownOpen = false;
}

shareOnTwitter(): void {
  window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href), '_blank');
  this.isShareDropdownOpen = false;
}

shareOnLinkedIn(): void {
  window.open('https://www.linkedin.com/shareArticle?url=' + encodeURIComponent(window.location.href), '_blank');
  this.isShareDropdownOpen = false;
}

shareOnInstagram(): void {
  window.open('https://www.instagram.com/', '_blank');
  this.isShareDropdownOpen = false;
}


loadElapsedTime(reference: string): void {
  this.offreService.calculateElapsedTime(reference).subscribe(
    (response: any) => {
      console.log('Elapsed Time:', response.elapsedTime); 
      this.elapsedTime = response.elapsedTime;
    },
    (error) => {
      console.error('Error loading elapsed time:', error);
      this.elapsedTime = 'N/A'; 
    }
  );
}
rateOffer(reference: string, rating: number): void {
  this.offreService.rateOffre(reference, rating).subscribe(
    (offre: Offre) => {
      this.offre = offre; 
      console.log('Offer rated successfully.');
     
      this.openRatingDialog();
    },
    (error) => {
      console.error('Error rating offer:', error);
    }
  );
}

openRatingDialog(): void {
  const dialogRef = this.dialog.open(RatingPopupComponent, {
    width: '250px',
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

loadSimilarOffers(reference: string): void {
  this.offreService.getSimilarOffers(reference).subscribe(
    (similarOffers: Offre[]) => {
      this.similarOffers = similarOffers;
    },
    (error) => {
      console.error('Error loading similar offers:', error);
    }
  );
}
navigateToOfferDetail(reference: string): void {
  this.router.navigate(['/detailoffer', reference]); 
}


}