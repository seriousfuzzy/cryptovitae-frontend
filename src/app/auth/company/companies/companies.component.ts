import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PinataService } from '../../../../services/pinata.service';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [ButtonModule, CommonModule, RouterModule, CardModule],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent {
  imageFile: File | null = null;
  tokenUri: string | null = null;

  constructor(private pinataService: PinataService) {}

  onImageSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  uploadNft() {
    if (this.imageFile) {
      this.pinataService.uploadNft(this.imageFile, {}).subscribe((result) => {
        console.log('Image CID:', result.imageCid);
        console.log('JSON CID:', result.jsonCid);
        this.tokenUri = result.tokenUri;
        console.log('Token URI:', this.tokenUri);

        // call contract
      });
    } else {
      console.error('No image file selected.');
    }
  }
}
