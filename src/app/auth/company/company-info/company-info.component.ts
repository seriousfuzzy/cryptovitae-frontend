import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CompanyRequestService } from '../../services/company-request.service';
import { Company } from '../../../interfaces/company.interface';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Router } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

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
  company: Company;
  display: boolean = false;
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  constructor(
    private companyService: CompanyRequestService,
    private router: Router
  ) {
    this.company = this.companyService.mockCompanies[0];
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
