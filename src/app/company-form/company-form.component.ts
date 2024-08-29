import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Company } from '../model/company.model';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent {
  @Input() company: Company = {
    id:'',
    companyCode: '',
    companyName: '',
    companyCeo: '',
    companyTurnover: 0,
    companyWebsite: '',
    stockExchange: ''
  };
  @Input() isUpdateMode = false;
  @Input() formWidth = 'col-md-4';
  @Output() formSubmit = new EventEmitter<Company>();

// When opening the form in update mode
onEdit(company: Company): void {
  this.isUpdateMode = true;
  this.company = { ...company };
}


  constructor(public activeModal: NgbActiveModal) {}

  onSubmit() {
    if (this.company) {
      this.formSubmit.emit(this.company);
      this.activeModal.close();
    }
  }

  onCancel() {
    console.log("cancel update");
    this.activeModal.dismiss('cancel');
  }
}
