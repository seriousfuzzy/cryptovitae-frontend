import { Routes } from '@angular/router';
import { PersonalHomeComponent } from './auth/personal/personal-home/personal-home.component';
import { CompanyHomeComponent } from './auth/company/company-home/company-home.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { LoginComponent } from './landing/login/login.component';
import { RequestConfirmationComponent } from './auth/personal/request-confirmation/request-confirmation.component';
import { CvSummaryComponent } from './auth/personal/cv-summary/cv-summary.component';
import { RequestListComponent } from './auth/personal/request-list/request-list.component';
import { CompaniesComponent } from './auth/company/companies/companies.component';
import { CompanyInfoComponent } from './auth/company/company-info/company-info.component';
import { ViewEmployeesComponent } from './auth/company/company-info/view-employees/view-employees.component';
import { ViewProspectosComponent } from './auth/company/view-prospectos/view-prospectos.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
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
        children: [
          {
            path: 'my-companies',
            component: CompaniesComponent,
          },
          {
            path: 'company-info/:tokenId',
            component: CompanyInfoComponent,
          },
          {
            path: 'employees',
            component: ViewEmployeesComponent,
          },
          {
            path: 'prospectos',
            component: ViewProspectosComponent,
          },
        ],
      },
    ],
  },
];
