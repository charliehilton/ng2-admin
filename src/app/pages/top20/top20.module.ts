import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Top20Component, SearchPipe, PipeFilter, SearchArrayPipe } from './top20.component';
import { Top20Service } from './top20.service';
import { routing } from './top20.routing';
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
    Top20Component,
    SearchPipe,
    PipeFilter,
    SearchArrayPipe
  ],
  providers: [
    Top20Service
  ],

})
export default class StartupsModule {}