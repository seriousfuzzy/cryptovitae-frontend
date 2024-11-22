import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CompanyRequestService } from '../../services/company-request.service';
import { Company } from '../../../interfaces/company.interface';
import { RequestConfirmedService } from '../../services/request-confirmed.service';

@Component({
  selector: 'app-cv-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-summary.component.html',
  styleUrl: './cv-summary.component.css',
})
export class CvSummaryComponent {
  companies: Company[] = [];
  constructor(
    private companyRequestService: CompanyRequestService,
    private requestConfirmedService: RequestConfirmedService
  ) {
    const confirmedRequests =
      this.requestConfirmedService.getConfirmedRequests();
    this.companies = confirmedRequests;
  }
}
