import { Routes, RouterModule }  from '@angular/router';
import { BatchComponent } from './batch.component';

const routes: Routes = [
  {
    path: ':listName',
    component: BatchComponent
  }
];

export const routing = RouterModule.forChild(routes);