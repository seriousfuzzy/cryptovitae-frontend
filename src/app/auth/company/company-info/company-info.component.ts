import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Company, CompanyService } from '../../../services/company.service';
import { ReviewService } from '../../../services/review.service';
import { ChipsModule } from 'primeng/chips';

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
    ReactiveFormsModule,
    ChipsModule,
  ],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.css',
})
export class CompanyInfoComponent {
  display: boolean = false;
  company: Company;
  reviewForm: FormGroup = new FormGroup({
    employeeAddress: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    skills: new FormControl('', Validators.required),
    review: new FormControl('', Validators.required),
  });
  sharedUserAddress: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private reviewService: ReviewService
  ) {
    const tokenId = this.activatedRoute.snapshot.params['tokenId'];
    this.company = this.companyService
      .companies()!
      .find((company) => company.tokenId == tokenId)!;

    const sharedUserAddress = localStorage.getItem('sharedUserAddress');
    if (sharedUserAddress) {
      this.sharedUserAddress = sharedUserAddress;
      console.log('Shared user address retrieved',this.sharedUserAddress);
      this.reviewForm.patchValue({
        employeeAddress: this.sharedUserAddress,
      });
      localStorage.removeItem('sharedUserAddress');
    }
  }

  onSubmit() {
    if (!this.reviewForm.valid) {
      console.log('Invalid form');
      return;
    }
    const reviewData = {
      employeeAddress: this.reviewForm.value.employeeAddress,
      name: this.reviewForm.value.role,
      description: this.reviewForm.value.review,
      image: this.company.imageIpfs,
      companyName: this.company.name,
      companyTokenId: Number(this.company.tokenId.toString()),
      startDate: this.reviewForm.value.startDate.toISOString(),
      endDate: this.reviewForm.value.endDate.toISOString(),
      skills: this.reviewForm.value.skills,
    };
    this.reviewService.createReview(reviewData);
    this.display = false;
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
