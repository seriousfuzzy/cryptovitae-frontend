import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-personal-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './personal-home.component.html',
  styleUrl: './personal-home.component.css',
})
export class PersonalHomeComponent implements OnInit {
  constructor(private router: Router) {}

  // Aca agregan las rutas que necesiten porfa
  sidebarItems = [
    {
      name: 'Mis proyectos',
      icon: 'pi-briefcase',
      active: false,
      route: '/app/manage-projects',
    },
    {
      name: 'Mis solicitudes',
      icon: 'pi-chart-bar',
      active: false,
      route: '/auth/personal/request-list',
    },
    {
      name: 'Mi CV',
      icon: 'pi-search',
      active: false,
      route: '/app/explore-projects',
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
