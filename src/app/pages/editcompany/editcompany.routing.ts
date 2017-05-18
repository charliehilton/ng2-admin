import { Routes, RouterModule }  from '@angular/router';
import { EditCompanyComponent } from './editcompany.component';

const routes: Routes = [
  {
    path: ':id',
    component: EditCompanyComponent
  }
];

export const routing = RouterModule.forChild(routes);