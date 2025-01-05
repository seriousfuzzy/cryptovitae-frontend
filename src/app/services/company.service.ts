import { Injectable, signal } from '@angular/core';
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

export interface Company {
  tokenId: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  imageIpfs: string;
}

enum CompanyContracts {
  createNFT = 'createNFT',
  tokensOfOwner = 'tokensOfOwner',
  tokenURI = 'tokenURI',
}

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  companies = signal<Company[] | null>(null);

  constructor(
    private pinataService: PinataService,
    private blockchainService: BlockchainService
  ) {}

  async getCompanies(): Promise<void> {
    const contract = await this.blockchainService.getContractInstance(
      CryptoVitaeCompanyNFTAbi,
      environment.contractAddresses.cryptoVitaeCompanyNFT.ether
    );
    if (!contract) {
      console.error('No contract found');
      return;
    }
    try {
      const tokenIds: number[] =
        await this.blockchainService.callContractMethod(
          contract,
          CompanyContracts.tokensOfOwner
        );

      const companies: Company[] = [];
      for (const tokenId of tokenIds) {
        const tokenUri: string =
          await this.blockchainService.callContractMethod(
            contract,
            CompanyContracts.tokenURI,
            tokenId
          );
        const gateway = environment.pinata.ipfsGateway;
        const tokenCid = tokenUri.replace('ipfs://', '');
        const metadataUrl = `${gateway}/${tokenCid}`;
        const metadataResponse = await fetch(metadataUrl);
        const metadata = await metadataResponse.json();
        const imageCid = metadata.image.replace('ipfs://', '');
        companies.push({
          tokenId,
          name: metadata.name,
          description: metadata.description,
          category: metadata.category,
          imageUrl: `${gateway}/${imageCid}`,
          imageIpfs: metadata.image,
        });
        this.companies.set(companies);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }
  }

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
          environment.contractAddresses.cryptoVitaeCompanyNFT.ether
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
            this.getCompanies();  
          } catch (error) {
            console.error('Error creating NFT:', error);
          }
        }
      });
  }
}
