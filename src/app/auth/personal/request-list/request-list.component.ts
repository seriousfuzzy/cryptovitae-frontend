import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CompanyRequestService } from '../../services/company-request.service';
@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css',
})
export class RequestListComponent {
  mockCompanies: Company[] = [];

  constructor(
    private router: Router,
    private companyRequestService: CompanyRequestService
  ) {
    this.mockCompanies = this.companyRequestService.mockCompanies;
  }

  goToConfirmation(id: number): void {
    this.router.navigate(['/auth/personal/request-confirmation', id]);
  }
}
interface Company {
  id: number;
  name: string;
  job: string;
  description: string;
  logoUrl: string;
  skills: string[];
}
