import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from '../service/company.service';
import { Company } from '../model/company.model';

@Component({
  selector: 'app-all-company',
  templateUrl: './all-company.component.html',
  styleUrls: ['./all-company.component.css'],
})
export class AllCompanyComponent implements OnInit {
  companies: Company[] = [];
  filteredCompanies: Company[] = [];
  selectedCompany: Company | null = null;
  isUpdateMode: boolean = false;
  searchTerm: string = '';  // Search term binding

  constructor(
    private companyService: CompanyService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.companyService.getCompanies().subscribe((data) => {
      this.companies = data;
      this.filteredCompanies = data;  // Initialize filteredCompanies with all companies
    });
  }

  onSearch(): void {
    this.filteredCompanies = this.companies.filter(company =>
      company.companyCode.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onEdit(company: Company, modalTemplate: any): void {
    this.selectedCompany = { ...company };
    this.isUpdateMode = true;
    this.modalService.open(modalTemplate, { ariaLabelledBy: 'modal-basic-title' });
  }

  onFormSubmit(companyData: Company): void {
    if (this.isUpdateMode && this.selectedCompany) {
      this.companyService.updateCompany(this.selectedCompany.id, companyData).subscribe(() => {
        this.fetchCompanies();
        this.selectedCompany = null;
        this.isUpdateMode = false;
        this.modalService.dismissAll();
      });
    } else {
      this.companyService.addCompany(companyData).subscribe(() => {
        this.fetchCompanies();
        this.modalService.dismissAll();
      });
    }
  }

  onCancel(): void {
    this.selectedCompany = null;
    this.isUpdateMode = false;
    this.modalService.dismissAll();
  }

  onDelete(companyId: string): void {
    if (confirm('Are you sure you want to delete this company?')) {
      this.companyService.deleteCompany(companyId).subscribe(() => {
        this.fetchCompanies();
      });
    }
  }
}
