import { Routes, RouterModule }  from '@angular/router';
import { BatchListsComponent } from './batchlists.component';

const routes: Routes = [
  {
    path: '',
    component: BatchListsComponent
  }
];

export const routing = RouterModule.forChild(routes);