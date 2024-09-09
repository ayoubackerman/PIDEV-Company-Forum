import { Component, OnInit } from '@angular/core';
import { CompanyServiceService } from 'app/services/company/company-service.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.css']
})
export class ListCompanyComponent implements OnInit {
  companies: any[] = [];
  review: string = '';
  
  constructor(private CompanyService : CompanyServiceService,public ks: KeycloakService) { }

  ngOnInit(): void {
if(this.ks.isLoggedIn()){
    this.loadCompanies();
  }}

  loadCompanies() {
    this.CompanyService.AllComp().subscribe(
      (data: any[]) => {
        this.companies = data;
      },
      (error) => {
        console.log('Error fetching companies:', error);
      }
    );
  }

  submitReview(companyId: number) {
    if (!this.review.trim()) {
      // La critique est vide, ne rien faire
      return;
    }
    this.CompanyService.addCompanyReview(companyId, this.review).subscribe(
      () => {
        // Réussi, actualiser la liste des entreprises
        this.loadCompanies();
        // Réinitialiser le champ de critique
        this.review = '';
      },
      (error) => {
        console.error('Error adding review:', error);
      }
    );
  }
}

