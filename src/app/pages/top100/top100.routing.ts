import { Routes, RouterModule }  from '@angular/router';
import { Top100Component } from './top100.component';

const routes: Routes = [
  {
<<<<<<< HEAD
    path: ':listName',
=======
    path: '',
>>>>>>> origin/master
    component: Top100Component
  }
];

export const routing = RouterModule.forChild(routes);