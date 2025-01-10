import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ReviewService } from '../../../services/review.service';
@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css',
})
export class RequestListComponent implements OnInit {
  constructor(private router: Router, public reviewService: ReviewService) {}

  get pendingReviews() {
    return (
      this.reviewService.reviews()?.filter((review) => !review.visibility) || []
    );
  }

  ngOnInit(): void {
    this.reviewService.getReviews();
  }

  goToConfirmation(id: number): void {
    this.router.navigate(['/auth/personal/request-confirmation', id]);
  }
}
