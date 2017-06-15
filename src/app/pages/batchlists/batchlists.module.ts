import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { BatchListsComponent, SearchArrayPipe } from './batchlists.component';
import { BatchListsService } from './batchlists.service';
import { routing } from './batchlists.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    BatchListsComponent,
    SearchArrayPipe
  ],
  providers: [
    BatchListsService
  ],

})
export default class StartupsModule {}