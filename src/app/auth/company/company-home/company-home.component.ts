import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-company-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, InputTextModule],
  templateUrl: './company-home.component.html',
  styleUrl: './company-home.component.css',
})
export class CompanyHomeComponent implements OnInit {
  constructor(private router: Router) {}

  // Aca agregan las rutas que necesiten porfa
  sidebarItems = [
    {
      name: 'Mis empresas',
      icon: 'pi-briefcase',
      active: false,
      route: '/auth/company/my-companies',
    },
    {
      name: 'Ver empleados',
      icon: 'pi-search-plus',
      active: false,
      route: '/auth/company/employees',
    },
    {
      name: 'Buscar prospectos',
      icon: 'pi-search',
      active: false,
      route: '/auth/company/prospectos',
    },
  ];

  ngOnInit(): void {
    this.selectItem(this.sidebarItems[0]);
  }

  selectItem(item: any) {
    this.sidebarItems.forEach((i) => (i.active = false));
    item.active = true;

    this.router.navigate([item.route]);
  }

  logout(): void {}
}
