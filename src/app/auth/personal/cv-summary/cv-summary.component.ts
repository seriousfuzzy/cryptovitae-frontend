import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-cv-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-summary.component.html',
  styleUrl: './cv-summary.component.css',
})
export class CvSummaryComponent {
  get acceptedReviews() {
    return (
      this.reviewService.reviews()?.filter((review) => review.visibility) || []
    );
  }

  constructor(private reviewService: ReviewService) {}
}
