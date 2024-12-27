import { Injectable } from '@angular/core';
import { BlockchainService } from './blockchain.service';
import { PinataService } from './pinata.service';
import CryptoVitaeCompanyNFTAbi from '../../assets/abis/CryptoVitaeCompanyNFT.json';
import { environment } from '../../environments/environment';

export interface CompanyData {
  name: string;
  description: string;
  category: string;
  imageFile: File;
}

enum CompanyContracts {
  createNFT = 'createNFT',
}

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(
    private pinataService: PinataService,
    private blockchainService: BlockchainService
  ) {}

  createCompany(data: CompanyData) {
    this.pinataService
      .uploadNft(data.imageFile, {
        name: data.name,
        description: data.description,
        category: data.category,
      })
      .subscribe(async (tokenUri) => {
        const contract = await this.blockchainService.getContractInstance(
          CryptoVitaeCompanyNFTAbi,
          environment.contractAdresses.cryptoVitaeCompanyNFT.ether
        );

        if (contract) {
          try {
            const transaction =
              await this.blockchainService.sendContractTransaction(
                contract,
                CompanyContracts.createNFT,
                tokenUri
              );
            console.log('NFT created successfully:', transaction);
          } catch (error) {
            console.error('Error creating NFT:', error);
          }
        }
      });
  }
}
