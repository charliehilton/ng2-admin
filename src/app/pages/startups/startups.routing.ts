import { Routes, RouterModule }  from '@angular/router';
import { StartupsComponent } from './startups.component';

const routes: Routes = [
  {
    path: '',
    component: StartupsComponent
  }
];

export const routing = RouterModule.forChild(routes);