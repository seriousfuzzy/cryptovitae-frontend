import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CompanyRequestService } from '../../services/company-request.service';
import { Company } from '../../../interfaces/company.interface';
@Component({
  selector: 'app-company-info',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.css',
})
export class CompanyInfoComponent {
  company: Company;
  constructor(private companyService: CompanyRequestService) {
    this.company = this.companyService.mockCompanies[0];
  }
}
