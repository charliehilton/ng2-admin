import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { BatchComponent, SearchPipe, PipeFilter, SearchArrayPipe } from './batch.component';
import { BatchService } from './batch.service';
import { routing } from './batch.routing';
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
    BatchComponent,
    SearchPipe,
    PipeFilter,
    SearchArrayPipe,
    ModalComponent
  ],
  providers: [
    BatchService
  ],

})
export default class StartupsModule {}