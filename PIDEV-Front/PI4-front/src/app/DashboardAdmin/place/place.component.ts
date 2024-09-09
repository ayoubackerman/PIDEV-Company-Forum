import { Component, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminServiceService } from 'app/services/Session/admin-service.service';
import { StandServiceService } from 'app/services/stand/stand-service.service';
import * as fabric from 'fabric';

// Use fabric here

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements AfterViewInit {
  canvas: any;
  rectangles: any[] = [];
  selectedRectInfo: any = null;
  stands: any[] = [];

  constructor(
    private adminService: AdminServiceService,
    private standService: StandServiceService,
    private _dialogue: MatDialogRef<PlaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: any },
  ) { console.log(data.id); }

  ngAfterViewInit() {
    this.canvas = new fabric.fabric.Canvas('canvas', { width: 480, height: 600 });

    if (!this.canvas) return;

    fabric.fabric.Image.fromURL('assets/floor-plan.jpg', (img:any) => {
      if (!this.canvas) return;
      img.scaleToWidth(this.canvas.width);
      img.scaleToHeight(this.canvas.height);

      this.canvas.setBackgroundImage(
        img,
        this.canvas.renderAll.bind(this.canvas)
      );
    });

    this.canvas.on('mouse:down', (event: any) => {
      if (event.target) {
        const rect = this.rectangles.find(rect => rect.id === event.target.id);
        this.selectedRectInfo = rect;
      } else {
        this.selectedRectInfo = null;
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        this.deleteSelectedRectangle();
      }
    });

    this.standService.getStandsBySession(this.data.id).subscribe((data) => {
      this.stands = data;
      console.log(this.stands);
      this.displayExistingStandsOnCanvas();
    });
  }

  addRectangle(type: string, event: MouseEvent) {
    if (event && this.canvas) {
      const fill = type === 'diamond' ? 'blue' : type === 'gold' ? 'yellow' : type === 'porte' ? 'black' : 'grey';

      const pointer = this.canvas.getPointer(event);
      const offsetX = pointer.x;
      const offsetY = pointer.y;

      const rect: any = new fabric.fabric.Rect({
        width: 50,
        height: 50,
        left: offsetX,
        top: offsetY,
        fill: fill,
        lockScalingX: true,
        lockScalingY: true,
        lockRotation: true,
        hasControls: false,
        hasBorders: false
      });

      rect.set('id', this.rectangles.length + 1);
      rect.set('priceStand', type === 'diamond' ? 100 : type === 'gold' ? 75 : 0);
      rect.set('type', type);

      rect.on('modified', () => {
        const updatedX = rect.left;
        const updatedY = rect.top;

        const index = this.rectangles.findIndex(item => item.id === rect.id);
        if (index !== -1) {
          this.rectangles[index].xPosition = updatedX;
          this.rectangles[index].yPosition = updatedY;
        }
      });

      this.canvas.add(rect);

      this.rectangles.push({
        id: rect.id,
        priceStand: rect.get('priceStand'),
        type: type,
        xPosition: offsetX,
        yPosition: offsetY
      });

      console.log(this.rectangles);
    } else {
      console.error('L\'événement est indéfini. Veuillez vérifier que vous transmettez correctement l\'événement depuis le template HTML.');
    }
  }

  submitStandsToDatabase() {
    console.log(this.rectangles);

    this.rectangles.forEach(rect => {
      const formData: FormData = new FormData();

      formData.append('priceStand', rect.priceStand);
      formData.append('sessionId', this.data.id);
      formData.append('xPosition', rect.xPosition.toString());
      formData.append('yPosition', rect.yPosition.toString());
      console.log(formData);
      this.adminService.addStand(formData).subscribe((response) => {
        console.log('Stand ajouté:', response);
      });
    });
  }

  deleteSelectedRectangle() {
    if (this.selectedRectInfo) {
      const selectedRect = this.canvas.getObjects().find((obj: any) => {
        if (obj instanceof fabric.fabric.Object && 'id' in obj) {
          return (obj as any).id === this.selectedRectInfo.id;
        }
        return false;
      });

      if (selectedRect) {
        this.canvas.remove(selectedRect);

        this.rectangles = this.rectangles.filter(rect => rect.id !== this.selectedRectInfo.id);

        this.selectedRectInfo = null;
      }
    }
  }

  handleRectClick(stand: any) {
    console.log('Stand sélectionné:', stand);
  }

  displayExistingStandsOnCanvas() {
    if (!this.canvas) return;
  
    this.stands.forEach((stand) => {
      const rectOptions: fabric.fabric.IRectOptions = {
        width: 50,
        height: 50,
        left: stand.xposition || 0,
        top: stand.yposition || 0,
        fill: stand.reserved == 1 ? 'red' : 'green', // Adjust fill based on reservation status
        selectable: false, // Disable selection of existing stands
        evented: false, // Disable events on existing stands
      };
  
      const fabricRect = new fabric.fabric.Rect(rectOptions);
      
      fabricRect.on('mousedown', () => {
        this.handleRectClick(stand);
      });
  
      this.canvas?.add(fabricRect);
    });
  }
  
  
}
