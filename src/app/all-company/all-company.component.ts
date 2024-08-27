import { Component, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from '../service/company.service';
import { Company } from '../model/company.model';

@Component({
  selector: 'app-all-company',
  templateUrl: './all-company.component.html',
  styleUrls: ['./all-company.component.css']
})
export class AllCompanyComponent implements OnInit {
  companies: Company[] = [];
  selectedCompany: Company | null = null;

  constructor(private companyService: CompanyService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.companyService.getCompanies().subscribe((data) => {
      this.companies = data;
    });
  }

  onEdit(company: Company, modalTemplate: any): void {
    this.selectedCompany = { ...company };  
    this.modalService.open(modalTemplate, { ariaLabelledBy: 'modal-basic-title' });
  }  

  onUpdate(updatedCompany: Company): void {
    if (this.selectedCompany) {
      this.companyService.updateCompany(this.selectedCompany.id, updatedCompany).subscribe(() => {
        this.fetchCompanies();  
        this.selectedCompany = null;
        this.modalService.dismissAll();
      });
    }
  }  

  onCancel(): void {
    this.selectedCompany = null;
    this.modalService.dismissAll(); 
  }
  

  onFormSubmit(updatedCompany: Company): void {
    if (this.selectedCompany) {
      const index = this.companies.findIndex(c => c.id === updatedCompany.id);
      if (index !== -1) {
        this.companies[index] = updatedCompany;
      }
    } else {
      this.companies.push(updatedCompany);
    }
    this.selectedCompany = null;
  }
  
  onDelete(companyId: string): void {
    if (confirm('Are you sure you want to delete this company?')) {
      this.companyService.deleteCompany(companyId).subscribe(() => {
        this.fetchCompanies(); 
      }, (error) => {
        console.error('Error deleting company:', error);
      });
    }
  }
  
}
