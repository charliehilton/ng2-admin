import { Routes, RouterModule }  from '@angular/router';
import { Top100ListsComponent } from './top100lists.component';

const routes: Routes = [
  {
    path: '',
    component: Top100ListsComponent
  }
];

export const routing = RouterModule.forChild(routes);