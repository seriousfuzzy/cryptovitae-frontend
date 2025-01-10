import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Review, ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-request-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-confirmation.component.html',
  styleUrl: './request-confirmation.component.css',
})
export class RequestConfirmationComponent {
  review: Review;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService
  ) {
    const reviewId = this.activeRoute.snapshot.paramMap.get('id')!;
    this.review = this.reviewService
      .reviews()
      ?.find((x) => x.tokenId === Number(reviewId))!;
  }

  confirm(review: Review) {
    this.reviewService.confirmReview(review.tokenId);
  }

  reject() {
    this.router.navigate(['/auth/personal/request-list']);
  }
}
