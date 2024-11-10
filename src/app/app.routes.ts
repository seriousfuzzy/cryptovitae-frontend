import { Routes } from '@angular/router';
import { PersonalHomeComponent } from './auth/personal/personal-home/personal-home.component';
import { CompanyHomeComponent } from './auth/company/company-home/company-home.component';
import { RequestListComponent } from './auth/personal/request-list/request-list.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'personal',
        component: PersonalHomeComponent,
      },
      {
        path: 'request-list',
        component: RequestListComponent,
      },
      {
        path: 'company',
        component: CompanyHomeComponent,
      },
    ],
  },
];
