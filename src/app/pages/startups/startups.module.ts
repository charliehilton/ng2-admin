import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2PaginationModule } from 'ng2-pagination'; 

import { StartupsComponent, SearchPipe, PipeFilter, SearchArrayPipe } from './startups.component';
import { StartupsService } from './startups.service';
import { routing } from './startups.routing';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2PaginationModule,
    routing,
    ModalModule.forRoot(),
    BootstrapModalModule
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