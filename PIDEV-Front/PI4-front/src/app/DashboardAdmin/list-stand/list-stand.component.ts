import { Component, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fabric } from 'fabric';
import { StandServiceService } from 'app/services/stand/stand-service.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ReservationServiceService } from 'app/services/reservation/reservation-service.service';

@Component({
  selector: 'app-list-stand',
  templateUrl: './list-stand.component.html',
  styleUrls: ['./list-stand.component.css'],
})
export class ListStandComponent implements AfterViewInit {
  stands: any[] = [];
  selectedStand: any;
  canvas: any;
  idsessions!: number;
  idpack!: number;
  exposant!: number; 
  email: any;

  constructor(
    private actR: ActivatedRoute,
    private standService: StandServiceService,
    private reservService: ReservationServiceService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.idsessions = Number(this.actR.snapshot.paramMap.get('idsessions'));
    this.idpack = Number(this.actR.snapshot.paramMap.get('idpack'));
    this.email = (this.actR.snapshot.paramMap.get('email'));
    console.log(this.idsessions, this.idpack);
    this.standService.getStandsBySession(this.idsessions).subscribe((data) => {
      this.stands = data;
      console.log(this.stands);
      this.displayStandsOnCanvas();
    });
  }

  handleRectClick(stand: any) {
    console.log('Stand sélectionné:', stand);
    this.selectedStand = stand;
  }

  updateSelectedStandColor() {
    if (this.selectedStand) {
      this.selectedStand.fill = 'red'; // Changement de couleur en rouge
      this.selectedStand.selectable = false; // Rendre le rectangle non cliquable
      this.canvas?.renderAll(); // Mettre à jour le rendu du canvas
    }
  }

  performAction(id: any) {
    const BidDto = {};

    this.standService.chageStauts(id, BidDto).subscribe({
      next: (response) => {
        console.log('Auction created successfully', response);
      },
      error: (error) => {
        console.error('Error creating auction', error);
      },
    });
  }

  reserveStand() {
    console.log('Stand réservé:', this.selectedStand);
    this.performAction(this.selectedStand.id);
    const ress = {
      standNum: this.selectedStand.id,
      sessionId: this.idsessions,
      pack: this.idpack,
      exposant: 12345,
      email: this.email,
    };

    console.log(ress)
    this.reservService.addItem(ress).subscribe(() => {
      console.log(this.email);
      console.log("cv mrgla")
    }, error => {
      console.error('Error adding item:', error);
    });

    this.updateSelectedStandColor();
  }

  displayStandsOnCanvas() {
    this.canvas = new fabric.Canvas('canvas', { width: 480, height: 600 });

    if (!this.canvas) return;

    fabric.Image.fromURL('assets/floor-plan.jpg', (img) => {
      if (!this.canvas) return;
      img.scaleToWidth(this.canvas.width);
      img.scaleToHeight(this.canvas.height);

      this.canvas.setBackgroundImage(
        img,
        this.canvas.renderAll.bind(this.canvas)
      );

      this.stands.forEach((stand) => {
        if (
          stand.xposition !== undefined &&
          stand.yposition !== undefined &&
          stand.reserved == 1
        ) {
          const fabricRect = new fabric.Rect({
            width: 50,
            height: 50,
            left: stand.xposition,
            top: stand.yposition,
            fill: 'red',
            selectable: false,
          });
          console.log(stand.yposition);

          this.canvas?.add(fabricRect);
        } else if (
          stand.xposition !== undefined &&
          stand.yposition !== undefined &&
          stand.reserved == 0
        ) {
          const fabricRect = new fabric.Rect({
            width: 50,
            height: 50,
            left: stand.xposition,
            top: stand.yposition,
            fill: 'green',
            selectable: false,
          });
          console.log(stand.yposition);

          fabricRect.on('mousedown', () => {
            this.handleRectClick(stand);
          });

          this.canvas?.add(fabricRect);
        } else {
          console.error(
            'Coordonnées de position manquantes pour le stand:',
            stand
          );
        }
      });
    });

    // Ajouter un gestionnaire d'événements pour les clics sur le canevas
    this.canvas.on('mouse:down', (event: any) => {
      if (!event.target) {
        // Si aucun élément n'est ciblé, réinitialiser selectedStand à null
        this.selectedStand = null;
      }
    });
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Confirmez-vous la réservation du stand?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reserveStand();
      }
    });
  }
}
