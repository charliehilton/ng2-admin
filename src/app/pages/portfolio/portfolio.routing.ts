import { Routes, RouterModule }  from '@angular/router';
import { PortfolioComponent } from './portfolio.component';

const routes: Routes = [
  {
    path: '',
    component: PortfolioComponent
  }
];

export const routing = RouterModule.forChild(routes);