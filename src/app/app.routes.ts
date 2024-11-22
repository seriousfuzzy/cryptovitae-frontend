import { Routes } from '@angular/router';
import { PersonalHomeComponent } from './auth/personal/personal-home/personal-home.component';
import { CompanyHomeComponent } from './auth/company/company-home/company-home.component';
import { RequestListComponent } from './auth/personal/request-list/request-list.component';
import { RequestConfirmationComponent } from './auth/personal/request-confirmation/request-confirmation.component';
import { CvSummaryComponent } from './auth/personal/cv-summary/cv-summary.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'personal',
        component: PersonalHomeComponent,
        children: [
          {
            path: 'request-list',
            component: RequestListComponent,
          },
          {
            path: 'summary',
            component: CvSummaryComponent,
          },
          {
            path: 'request-confirmation/:id',
            component: RequestConfirmationComponent,
          },
        ],
      },

      {
        path: 'company',
        component: CompanyHomeComponent,
      },
    ],
  },
];
