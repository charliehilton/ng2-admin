import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Top20ListsComponent, SearchArrayPipe } from './top20lists.component';
import { Top20ListsService } from './top20lists.service';
import { routing } from './top20lists.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Top20ListsComponent,
    SearchArrayPipe
  ],
  providers: [
    Top20ListsService
  ],

})
export default class StartupsModule {}