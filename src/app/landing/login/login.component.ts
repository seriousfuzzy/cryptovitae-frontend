import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MetaMaskService } from '../../services/metamask.service';
import { DropdownModule } from 'primeng/dropdown';

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
    DropdownModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  accountAddress: string | null = null;
  categoryControl: FormControl = new FormControl('', Validators.required);

  categories: any[] = [
    { name: 'Personal', code: 'personal' },
    { name: 'Empresa', code: 'empresa' },
  ];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private metaMaskService: MetaMaskService
  ) {}

  async login(): Promise<void> {
    await this.metaMaskService.connectMetaMask().then((accountAddress) => {
      if (!accountAddress) {
        console.error('Failed to connect to MetaMask');
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to connect to MetaMask',
          life: 2000,
        });
        return;
      }

      this.accountAddress = accountAddress;
      console.log('Connected account:', this.accountAddress);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Logged in successfully',
        life: 2000,
      });
      setTimeout(() => {
        if (this.categoryControl.value.code === 'empresa') {
          this.router.navigate(['/auth/company']);
          return;
        } else {
          this.router.navigate(['/auth/personal']);
        }
      }, 2000);
    });
  }
}
