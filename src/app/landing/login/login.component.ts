import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MetaMaskService } from '../../../services/metamask.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    ToastModule,
    RadioButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  accountAddress: string | null = null;
  selectedCategory: any = null;

  categories: any[] = [
    { name: 'Personal', key: 'personal' },
    { name: 'Empresa', key: 'empresa' },
  ];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private metaMaskService: MetaMaskService
  ) {}

  ngOnInit() {
    this.selectedCategory = this.categories[1];
  }

  async login(): Promise<void> {
    this.accountAddress = await this.metaMaskService.connectMetaMask();
    if (this.accountAddress) {
      console.log('Connected account:', this.accountAddress);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Logged in successfully',
        life: 2000,
      });
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
    } else {
      console.error('Failed to connect to MetaMask.');
    }
  }
}
