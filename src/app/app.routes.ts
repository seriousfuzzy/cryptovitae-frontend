import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { LoginComponent } from './landing/login/login.component';
import { PersonalHomeComponent } from './auth/personal/personal-home/personal-home.component';
import { CompanyHomeComponent } from './auth/company/company-home/company-home.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'auth',
        children:[
            {
                path: 'personal',
                component: PersonalHomeComponent,
            },
            {
                path: 'company',
                component: CompanyHomeComponent
            }
        ]
    }
];
