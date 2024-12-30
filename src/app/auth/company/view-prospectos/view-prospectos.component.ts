import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-view-prospectos',
  standalone: true,
  imports: [TableModule, FormsModule, CommonModule, TagModule],
  templateUrl: './view-prospectos.component.html',
  styleUrl: './view-prospectos.component.css',
})
export class ViewProspectosComponent implements OnInit {
  allUsers: any[] = [];

  ngOnInit(): void {
    this.allUsers = [
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
}
