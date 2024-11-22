import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyRequestService } from '../../services/company-request.service';
import { CommonModule } from '@angular/common';
import { Company } from '../../../interfaces/company.interface';
import { RequestConfirmedService } from '../../services/request-confirmed.service';

@Component({
  selector: 'app-request-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-confirmation.component.html',
  styleUrl: './request-confirmation.component.css',
})
export class RequestConfirmationComponent implements OnInit {
  company: Company | undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private companyRequestService: CompanyRequestService,
    private requestConfirmedService: RequestConfirmedService
  ) {}
  ngOnInit(): void {
    const companyId = this.activeRoute.snapshot.paramMap.get('id');
    if (companyId) {
      this.company = this.companyRequestService.mockCompanies.find(
        (company) => company.id === +companyId
      );
    }
  }
  confirm(company: Company) {
    this.requestConfirmedService.addRequestConfirmed(company);
    // delete selected company from the list and add the selected into the confirmed list into request-confirmed.service.ts
    this.companyRequestService.mockCompanies =
      this.companyRequestService.mockCompanies.filter(
        (comp) => comp.id !== company.id
      );
    this.router.navigate(['/auth/personal/request-list']);
  }
  reject() {
    this.router.navigate(['/auth/personal/request-list']);
  }
}
