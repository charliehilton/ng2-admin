import { Routes, RouterModule }  from '@angular/router';
import { NewStartupComponent } from './newstartup.component';

const routes: Routes = [
  {
    path: '',
    component: NewStartupComponent
  }
];

export const routing = RouterModule.forChild(routes);