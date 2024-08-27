import { Component } from '@angular/core';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css'],

})
export class AddCompanyComponent {
  company = {
    id:'',
    companyCode: '',
    companyName: '',
    companyCeo: '',
    companyTurnover: 0,
    companyWebsite: '',
    stockExchange: ''
  };

  constructor(private companyService: CompanyService) {}

  onSubmit(companyData: any) {
    // Add the new company
    this.companyService.addCompany(companyData).subscribe((response) => {
      console.log('Company added:', response);
      alert('Company added successfully');
      this.company = {
        id: '',
        companyCode: '',
        companyName: '',
        companyCeo: '',
        companyTurnover: 0,
        companyWebsite: '',
        stockExchange: ''
      };
    });
  }

  onCancel() {
    // Reset form on cancel
    this.company = {
      id:'',
      companyCode: '',
      companyName: '',
      companyCeo: '',
      companyTurnover: 0,
      companyWebsite: '',
      stockExchange: ''
    };
  }

  
}
