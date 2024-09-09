import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PackServiceService } from 'app/services/pack/pack-service.service';

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.css']
})
export class PackComponent implements OnInit{

  packForm!: FormGroup;




  constructor(private packService: PackServiceService,
    private router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.loadItems();
    // this.loadPackTypes(); // Call the method to load pack types when the component initializes
    this.packForm = this.fb.group({
      packType: ['', Validators.required], // Ajoutez les validateurs nécessaires
      pricePack: [0, Validators.required] // Ajoutez les validateurs nécessaires
    });
  }

  items: any[] = [];
  packTypes: string[] = ["DIAMOND","SILVER","GOLD"]; // Array to store pack types
  selectedItem: any = {};
  newItem: any = {
    typePack: '',
    pricePack: 0
  };

  loadItems() {
    this.packService.getItem().subscribe((data: any) => {
      this.items = data;
    });
  }

  loadPackTypes() {
    // Assuming getPackTypes() returns an Observable of string array
    this.packService.getPackTypes().subscribe((data: string[]) => {
      this.packTypes = data;
      console.log(this.packTypes);
    }, error => {
      console.error('Error loading pack types:', error);
    });
  }

  selectItem(item: any) {
    this.selectedItem = item;
  }

  addItem() {
    if (this.packForm.valid) {
      console.log(this.packForm.value);
      const formData = this.packForm.value; // Obtenez les valeurs du formulaire à partir du FormGroup
        this.packService.addItem(this.packForm.value).subscribe(() => {
          this.loadItems();
          this.packForm.reset(); // Réinitialisez le formulaire après avoir ajouté un élément
        }, error => {
          console.error('Error adding item:', error);
        });
        this.router.navigate(['/pack/List']);

    }
  }
}
