import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Top20Component, SearchPipe, PipeFilter, SearchArrayPipe } from './top20.component';
import { Top20Service } from './top20.service';
import { routing } from './top20.routing';
import {BusyModule} from 'angular2-busy';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ModalComponent } from './export.modal';
import { CorpModalComponent } from './corp.modal';
import { DealflowModalComponent } from './dealflow.modal';

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
    ModalComponent,
    CorpModalComponent,
    DealflowModalComponent
  ],
  declarations: [
    Top20Component,
    SearchPipe,
    PipeFilter,
    SearchArrayPipe,
    ModalComponent,
    CorpModalComponent,
    DealflowModalComponent
  ],
  providers: [
    Top20Service
  ],

})
export default class StartupsModule {}