import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { Company, CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-company-info',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    FormsModule,
  ],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.css',
})
export class CompanyInfoComponent {
  display: boolean = false;
  startDate: Date = new Date();
  endDate: Date = new Date();
  company: Company;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService
  ) {
    const tokenId = this.activatedRoute.snapshot.params['tokenId'];
    this.company = this.companyService
      .companies()!
      .find((company) => company.tokenId == tokenId)!;
  }
  showDialog() {
    this.display = true;
  }

  hideDialog() {
    this.display = false;
  }

  onViewEmployees() {
    this.router.navigate(['/auth/company/employees']);
  }
}
