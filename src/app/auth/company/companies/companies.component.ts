import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CardModule,
    DialogModule,
    FileUploadModule,
    InputTextModule,
    DropdownModule,
  ],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css',
})
export class CompaniesComponent implements OnInit {
  companyForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });
  dialogVisible = false;
  imageFile: File | null = null;
  tokenUri: string | null = null;

  categories: any[] = [
    { name: 'Desarrollo de software', code: 'desarrollo-software' },
    { name: 'Marketing', code: 'marketing' },
    { name: 'Recursos Humanos', code: 'recursos-humanos' },
    { name: 'Finanzas', code: 'finanzas' },
    { name: 'IT e Infraestructura', code: 'it-e-infraestructura' },
    { name: 'Cadena de Suministro', code: 'cadena-de-suministro' },
    { name: 'Gestión de Producto', code: 'gestion-de-producto' },
    { name: 'Desarrollo de Negocios', code: 'desarrollo-de-negocios' },
    { name: 'Relaciones Públicas', code: 'relaciones-publicas' },
    {
      name: 'Aseguramiento de la Calidad',
      code: 'aseguramiento-de-la-calidad',
    },
  ];

  constructor(private router: Router, public companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getCompanies();
  }

  onImageSelected(event: any) {
    console.log('Image selected:', event);
    this.imageFile = event.currentFiles[0];
  }

  goToCompanyInfo() {
    this.router.navigate(['/auth/company/company-info']);
  }

  createCompany() {
    if (!this.companyForm.valid) {
      console.error('Company form is invalid.');
      return;
    }

    if (!this.imageFile) {
      console.error('No image file selected.');
      return;
    }

    this.dialogVisible = false;

    this.companyService.createCompany({
      name: this.companyForm.value.name,
      description: this.companyForm.value.description,
      category: this.companyForm.value.category.code,
      imageFile: this.imageFile,
    });
  }
}
