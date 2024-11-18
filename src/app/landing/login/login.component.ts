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
    RadioButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  selectedCategory: any = null;

  categories: any[] = [
    { name: 'Personal', key: 'personal' },
    { name: 'Empresa', key: 'empresa' },
  ];
  

  constructor(
		private router: Router,
		private messageService: MessageService
	) {}

  ngOnInit() {
    this.selectedCategory = this.categories[1];
  }

  login(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Logged in successfully',
      life: 2000
    });
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  }
}
