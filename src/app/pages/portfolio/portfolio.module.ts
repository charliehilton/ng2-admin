import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { PortfolioComponent, SearchPipe, PipeFilter, SearchArrayPipe } from './portfolio.component';
import { PortfolioService } from './portfolio.service';
import { routing } from './portfolio.routing';
import {BusyModule} from 'angular2-busy';
//import { SearchPipe } from './search.pipe'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    BusyModule,
    routing
  ],
  declarations: [
    PortfolioComponent,
    SearchPipe,
    PipeFilter,
    SearchArrayPipe
  ],
  providers: [
    PortfolioService
  ],

})
export default class StartupsModule {}