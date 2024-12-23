import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CompanyRequestService } from '../../services/company-request.service';
import { Company } from '../../../interfaces/company.interface';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-company-info',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
  ],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.css',
})
export class CompanyInfoComponent {
  company: Company;
  display: boolean = false;
  constructor(private companyService: CompanyRequestService) {
    this.company = this.companyService.mockCompanies[0];
  }
  showDialog() {
    this.display = true;
  }

  hideDialog() {
    this.display = false;
  }
}
