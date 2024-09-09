import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from 'app/services/ServiceReclamation/reclamation.service';

@Component({
  selector: 'app-update-reclamation',
  templateUrl: './update-reclamation.component.html',
  styleUrls: ['./update-reclamation.component.css']
})
export class UpdateReclamationComponent implements OnInit {
  itemForm!: FormGroup; 
  itemId: any; 
  item: any; 
  hideCodeReclamation: boolean = true;




  constructor(private formBuilder: FormBuilder,
              private reclamationService: ReclamationService,
              private snackbar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) {}




              
  ngOnInit(): void {
    // Initialize the form and its validators
    this.itemForm = this.formBuilder.group({
      codeReclamation: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      date: ['', Validators.required],
      type: ['', Validators.required]
    });

    // Retrieve the ID of the reclamation item from the route parameters
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      // Call a method to fetch the reclamation item data by its ID
      this.getItemById(this.itemId);
    });
  }

  // Method to fetch the reclamation item data by its ID
  getItemById(itemId: any): void {
    this.reclamationService.getItemById(itemId).subscribe(res => {
      this.item = res;
      // Set the form values with the fetched reclamation item data
      this.itemForm.patchValue({
        codeReclamation: this.item.codeReclamation,
        description: this.item.description,
        status: this.item.status,
        date: this.item.date,
        type: this.item.type
      });
    });
  }
// Method to update the recl// Method to update the reclamation item
updateItem(): void {
  // Check if the form is valid
  if (this.itemForm.valid) {
    // Construct the updated reclamation item object with the form values
    const updatedItem = {
      itemId: this.itemId,
      codeReclamation: this.itemForm.value.codeReclamation,
      description: this.itemForm.value.description,
      status: this.itemForm.value.status,
      date: this.itemForm.value.date,
      type: this.itemForm.value.type
    };
    this.reclamationService.updateItem(updatedItem).subscribe(
      (res) => {
        if (res.id !== null) {     
          this.snackbar.open('Reclamation updated successfully', 'Close', { duration: 5000 }); 
          this.router.navigateByUrl('/reclamation');
        } else {
          this.snackbar.open('Error updating reclamation', 'Close', { duration: 5000 });
        }
      },
      (error) => {
        this.snackbar.open('Error updating reclamation', 'Close', { duration: 5000 });
      }
    );
  }
}
}