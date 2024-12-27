import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  private provider: ethers.BrowserProvider | null = null;

  constructor() {
    this.initializeProvider();
  }

  private async initializeProvider(): Promise<void> {
    const { ethereum } = window as any;
    if (ethereum) {
      this.provider = new ethers.BrowserProvider(ethereum);
      console.log('Ethereum provider initialized');
    } else {
      console.error('No Ethereum provider found. Please install MetaMask!');
    }
  }

  async connectWallet(): Promise<string | null> {
    if (this.provider) {
      try {
        const signer = await this.provider.getSigner();
        await signer.getAddress();
        return signer.address;
      } catch (error) {
        console.error('User rejected the request:', error);
        return null;
      }
    }
    return null;
  }

  async getContractInstance(
    abi: any,
    contractAddress: string
  ): Promise<ethers.Contract | null> {
    if (this.provider) {
      const signer = await this.provider.getSigner();
      console.log('Signer:', signer);
      return new ethers.Contract(contractAddress, abi, signer);
    } else {
      console.error('No provider found. Ensure that MetaMask is connected.');
      return null;
    }
  }

  async callContractMethod(
    contract: ethers.Contract,
    methodName: string,
    ...args: any[]
  ): Promise<any> {
    try {
      const result = await contract[methodName](...args);
      return result;
    } catch (error) {
      console.error('Error calling contract method:', error);
      throw error;
    }
  }

  async sendContractTransaction(
    contract: ethers.Contract,
    methodName: string,
    ...args: any[]
  ): Promise<any> {
    try {
      const gasPrice = (await this.provider?.getFeeData())!.gasPrice;
      const options = {
        gasLimit: 3000000,
        gasPrice,
      };

      const transaction = await contract[methodName](...args, options);
      await transaction.wait();
      return transaction;
    } catch (error) {
      console.error('Error sending contract transaction:', error);
      throw error;
    }
  }

  async estimateGasForTransaction(
    contract: ethers.Contract,
    methodName: string,
    ...args: any[]
  ): Promise<ethers.BigNumberish> {
    try {
      const gasEstimate = await (contract as any).estimateGas[methodName](
        ...args
      );
      console.log(`Estimated gas for ${methodName}:`, gasEstimate.toString());
      return gasEstimate;
    } catch (error) {
      console.error('Error estimating gas:', error);
      throw error;
    }
  }

  async switchNetwork(chainId: number): Promise<void> {
    try {
      const hexChainId = ethers.toBeHex(chainId).replace(/^0x0+/, '0x');
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }],
      });
      console.log('Network switched successfully');
    } catch (error: any) {
      if (error.code === 4902) {
        console.error('Network not found. You need to add it to MetaMask.');
      } else {
        throw error;
      }
    }
  }
}
