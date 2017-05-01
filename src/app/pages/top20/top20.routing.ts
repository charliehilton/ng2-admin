import { Routes, RouterModule }  from '@angular/router';
import { Top20Component } from './top20.component';

const routes: Routes = [
  {
    path: ':listName',
    component: Top20Component
  }
];

export const routing = RouterModule.forChild(routes);