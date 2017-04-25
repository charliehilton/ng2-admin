import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Top100ListsComponent, SearchPipe, PipeFilter, SearchArrayPipe } from './top100lists.component';
import { Top100ListsService } from './top100lists.service';
import { routing } from './top100lists.routing';
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
    Top100ListsComponent,
    SearchPipe,
    PipeFilter,
    SearchArrayPipe
  ],
  providers: [
    Top100ListsService
  ],

})
export default class StartupsModule {}