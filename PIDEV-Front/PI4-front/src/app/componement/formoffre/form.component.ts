import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Offre } from 'app/models/offre';
import { OffreService } from 'app/services/offre/offre.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  offres: Offre[] = [];

  constructor(private offreService: OffreService) { }

  ngOnInit(): void {
    this.loadOffres();
    console.log("aa");

  }
  loadOffres(): void {
    this.offreService.getAllOffres().subscribe(
      offres=> {
        this.offres = offres;
      },
      (error) => {
        console.log('Erreur lors du chargement des offres : ', error);
      }
    );
  }
  deleteOffre(reference: string): void {
    this.offreService.deleteOffre(reference).toPromise()
      .then(() => {
        console.log('Offre supprimée avec succès');
        this.loadOffres(); 
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de l\'offre : ', error);
      });
  }
  
}
