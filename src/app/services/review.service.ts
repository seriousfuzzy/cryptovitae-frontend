import { Injectable, signal } from '@angular/core';
import { BlockchainService } from './blockchain.service';
import { PinataService } from './pinata.service';
import CryptoVitaeReviewSBTAbi from '../../assets/abis/CryptoVitaeReviewSBT.json';
import { environment } from '../../environments/environment';
import { switchMap } from 'rxjs';

export interface ReviewData {
  employeeAddress: string;
  name: string; //role
  description: string; //review
  image: string;
  companyName: string;
  startDate: string;
  endDate: string;
  skills: string[];
}

export interface Review {
  tokenId: number;
  role: string; //name
  review: string; //description
  imageUrl: string;
  imageIpfs: string;
  companyName: string;
  startDate: string;
  endDate: string;
  skills: string[];
}

enum ReviewContracts {
  createSBT = 'createSBT',
  approveSBT = 'approveSBT',
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(
    private pinataService: PinataService,
    private blockchainService: BlockchainService
  ) {}

  createReview(data: ReviewData) {
    this.pinataService
      .uploadJson(data)
      .pipe(
        switchMap(async (jsonResponse) => {
          console.log('Json response:', jsonResponse);
          const tokenUri = `ipfs://${jsonResponse.IpfsHash}`;

          const contract = await this.blockchainService.getContractInstance(
            CryptoVitaeReviewSBTAbi,
            environment.contractAddresses.cryptoVitaeReviewSBT.ether
          );

          console.log('Contract:', contract);

          if (contract) {
            try {
              const transaction =
                await this.blockchainService.sendContractTransaction(
                  contract,
                  ReviewContracts.createSBT,
                  tokenUri
                );
              console.log('Review created successfully:', transaction);
              // this.getCompanies();
            } catch (error) {
              console.error('Error creating Review:', error);
            }
          }
        })
      )
      .subscribe();
  }
}
