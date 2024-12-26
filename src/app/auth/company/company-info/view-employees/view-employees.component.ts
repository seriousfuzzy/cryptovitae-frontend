import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-employees',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    RatingModule,
    ButtonModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './view-employees.component.html',
  styleUrl: './view-employees.component.css',
})
export class ViewEmployeesComponent implements OnInit {
  employees: any[] = [];

  ngOnInit(): void {
    this.employees = [
      {
        id: 1,
        name: 'John Doe',
        skills: ['React', 'Node.js', 'MongoDB'],
        profession: 'Software Engineer',
      },
      {
        id: 1,
        name: 'John Doe',
        skills: ['React', 'Node.js', 'MongoDB'],
        profession: 'Software Engineer',
      },
      {
        id: 1,
        name: 'John Doe',
        skills: ['React', 'Node.js', 'MongoDB'],
        profession: 'Software Engineer',
      },
    ];
  }

  getSeverity(status: string): any {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'success';
    }
  }
}
