import { Routes, RouterModule }  from '@angular/router';
import { Top20ListsComponent } from './top20lists.component';

const routes: Routes = [
  {
    path: '',
    component: Top20ListsComponent
  }
];

export const routing = RouterModule.forChild(routes);