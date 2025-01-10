import { Injectable, signal } from '@angular/core';
import { BlockchainService } from './blockchain.service';
import { PinataService } from './pinata.service';
import CryptoVitaeReviewSBTAbi from '../../assets/abis/CryptoVitaeReviewSBT.json';
import { environment } from '../../environments/environment';
import { switchMap } from 'rxjs';
import { MetaMaskService } from './metamask.service';

export interface ReviewData {
  employeeAddress: string;
  name: string; //role
  description: string; //review
  image: string;
  companyName: string;
  companyTokenId: number;
  startDate: string;
  endDate: string;
  skills: string[];
}

export interface Review {
  tokenId: number;
  role: string; //name
  review: string; //description
  companyImageUrl: string;
  companyImageIpfs: string;
  companyName: string;
  companyTokenId: number;
  startDate: string;
  endDate: string;
  skills: string[];
  visibility: boolean;
}

enum ReviewContracts {
  createSBT = 'createSBT',
  approveSBT = 'approveSBT',
  getReviewsByEmployee = 'getReviewsByEmployee',
  getReview = 'getReview',
  getReviewsByCompany = 'getReviewsByCompany',
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  reviews = signal<Review[] | null>(null);

  constructor(
    private pinataService: PinataService,
    private blockchainService: BlockchainService,
    private metaMaskService: MetaMaskService
  ) {}

  async getReviews(): Promise<void> {
    const contract = await this.blockchainService.getContractInstance(
      CryptoVitaeReviewSBTAbi,
      environment.contractAddresses.cryptoVitaeReviewSBT.ether
    );
    if (!contract) {
      console.error('No contract found');
      return;
    }
    try {
      const employeeAddress = await this.metaMaskService.getAccount();
      const tokenIdsProxy = await this.blockchainService.callContractMethod(
        contract,
        ReviewContracts.getReviewsByEmployee,
        employeeAddress
      );
      const tokenIds = Array.from(tokenIdsProxy).map((id: any) =>
        Number(id.toString())
      );

      const reviews: Review[] = [];
      for (const tokenId of tokenIds) {
        const reviewProxy = await this.blockchainService.callContractMethod(
          contract,
          ReviewContracts.getReview,
          tokenId
        );
        const reviewResponse = {
          ipfsUrl: reviewProxy[0],
          visibility: Number(reviewProxy[1].toString()) === 1,
          companyNFTId: Number(reviewProxy[2].toString()),
        };

        const gateway = environment.pinata.ipfsGateway;
        const reviewCid = reviewResponse.ipfsUrl.replace('ipfs://', '');
        const reviewUrl = `${gateway}/${reviewCid}`;
        const metadataResponse = await fetch(reviewUrl);
        const metadata = await metadataResponse.json();
        const companyImageCid = metadata.image.replace('ipfs://', '');

        reviews.push({
          tokenId,
          role: metadata.name,
          review: metadata.description,
          companyImageUrl: `${gateway}/${companyImageCid}`,
          companyImageIpfs: metadata.image,
          companyName: metadata.companyName,
          companyTokenId: metadata.companyTokenId,
          startDate: metadata.startDate,
          endDate: metadata.endDate,
          skills: metadata.skills,
          visibility: reviewResponse.visibility,
        });
        this.reviews.set(reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }

  async getReviewsByCompany() {
    const contract = await this.blockchainService.getContractInstance(
      CryptoVitaeReviewSBTAbi,
      environment.contractAddresses.cryptoVitaeReviewSBT.ether
    );
    if (!contract) {
      console.error('No contract found');
      return;
    }
    try {
      const companyAddress = await this.metaMaskService.getAccount();
      const tokenIdsProxy = await this.blockchainService.callContractMethod(
        contract,
        ReviewContracts.getReviewsByCompany,
        companyAddress
      );
      const tokenIds = Array.from(tokenIdsProxy).map((id: any) =>
        Number(id.toString())
      );

      const reviews: Review[] = [];
      for (const tokenId of tokenIds) {
        const reviewProxy = await this.blockchainService.callContractMethod(
          contract,
          ReviewContracts.getReview,
          tokenId
        );
        const reviewResponse = {
          ipfsUrl: reviewProxy[0],
          visibility: Number(reviewProxy[1].toString()) === 1,
          companyNFTId: Number(reviewProxy[2].toString()),
        };

        const gateway = environment.pinata.ipfsGateway;
        const reviewCid = reviewResponse.ipfsUrl.replace('ipfs://', '');
        const reviewUrl = `${gateway}/${reviewCid}`;
        const metadataResponse = await fetch(reviewUrl);
        const metadata = await metadataResponse.json();
        const companyImageCid = metadata.image.replace('ipfs://', '');

        reviews.push({
          tokenId,
          role: metadata.name,
          review: metadata.description,
          companyImageUrl: `${gateway}/${companyImageCid}`,
          companyImageIpfs: metadata.image,
          companyName: metadata.companyName,
          companyTokenId: metadata.companyTokenId,
          startDate: metadata.startDate,
          endDate: metadata.endDate,
          skills: metadata.skills,
          visibility: reviewResponse.visibility,
        });
        this.reviews.set(reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }

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
                  data.employeeAddress,
                  tokenUri,
                  data.companyTokenId
                );
              console.log('Review created successfully:', transaction);
            } catch (error) {
              console.error('Error creating Review:', error);
            }
          }
        })
      )
      .subscribe();
  }
}
