import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BlockchainService } from '../../../services/blockchain.service';

@Component({
  selector: 'app-generate-link',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './generate-link.component.html',
  styleUrl: './generate-link.component.css',
})
export class GenerateLinkComponent implements OnInit {
  link: string | null = null;
  address: string | null = null;

  constructor(private blockchainService: BlockchainService) {}

  async ngOnInit(): Promise<void> {
    this.address = await this.blockchainService.getMetamaskAddress();
  }

  generateLink(): void {
    this.link = `http://localhost:4200/auth/company/my-companies/${this.address}`;
  }
}
