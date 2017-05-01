import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Top20ListsComponent, SearchPipe, PipeFilter, SearchArrayPipe } from './top20lists.component';
import { Top20ListsService } from './top20lists.service';
import { routing } from './top20lists.routing';
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
    Top20ListsComponent,
    SearchPipe,
    PipeFilter,
    SearchArrayPipe
  ],
  providers: [
    Top20ListsService
  ],

})
export default class StartupsModule {}