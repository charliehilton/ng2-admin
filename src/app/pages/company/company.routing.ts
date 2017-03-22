import { Routes, RouterModule }  from '@angular/router';
import { CompanyComponent } from './company.component';

const routes: Routes = [
  {
    path: ':id',
    component: CompanyComponent
  }
];

export const routing = RouterModule.forChild(routes);