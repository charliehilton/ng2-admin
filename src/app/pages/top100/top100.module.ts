import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Top100Component, SearchPipe, PipeFilter, SearchArrayPipe } from './top100.component';
import { Top100Service } from './top100.service';
import { routing } from './top100.routing';
import {BusyModule} from 'angular2-busy';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ModalComponent } from './export.modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    BusyModule,
    routing,
    BootstrapModalModule
  ],
  entryComponents: [
    ModalComponent
  ],
  declarations: [
    Top100Component,
    SearchPipe,
    PipeFilter,
    SearchArrayPipe,
    ModalComponent
  ],
  providers: [
    Top100Service
  ],

})
export default class StartupsModule {}