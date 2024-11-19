import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyRequestService } from '../../services/company-request.service';
import { CommonModule } from '@angular/common';

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
    private route: ActivatedRoute,
    private companyRequestService: CompanyRequestService
  ) {}
  ngOnInit(): void {
    const companyId = this.route.snapshot.paramMap.get('id');
    if (companyId) {
      this.company = this.companyRequestService.mockCompanies.find(
        (company) => company.id === +companyId
      );
    }
  }
  confirm() {}
  reject() {}
}
interface Company {
  id: number;
  name: string;
  job: string;
  description: string;
  logoUrl: string;
  skills: string[];
}
