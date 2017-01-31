import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { StartupsComponent } from './startups.component';
import { StartupsService } from './startups.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routing } from './startups.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    StartupsComponent
  ],
  providers: [
    StartupsService
  ]
})
export default class StartupsModule {}