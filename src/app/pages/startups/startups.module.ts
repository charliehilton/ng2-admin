import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { StartupsComponent, SearchPipe, PipeFilter, SearchArrayPipe } from './startups.component';
import { StartupsService } from './startups.service';
import { routing } from './startups.routing';
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
    StartupsComponent,
    SearchPipe,
    PipeFilter,
    SearchArrayPipe
  ],
  providers: [
    StartupsService
  ],

})
export default class StartupsModule {}