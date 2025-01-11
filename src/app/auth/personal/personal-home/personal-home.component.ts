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

  sidebarItems = [
    {
      name: 'Mi enlace',
      icon: 'pi-link',
      active: false,
      route: '/auth/personal/generate-link',
    },
    {
      name: 'Mis solicitudes',
      icon: 'pi-user-edit',
      active: false,
      route: '/auth/personal/request-list',
    },
    {
      name: 'Mi CV',
      icon: 'pi-ethereum',
      active: false,
      route: '/auth/personal/summary',
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

  logout(): void {
    this.router.navigate(['']);
  }
}
