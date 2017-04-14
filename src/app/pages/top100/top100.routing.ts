import { Routes, RouterModule }  from '@angular/router';
import { Top100Component } from './top100.component';

const routes: Routes = [
  {
    path: '',
    component: Top100Component
  }
];

export const routing = RouterModule.forChild(routes);