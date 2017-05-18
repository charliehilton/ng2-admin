import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { NewStartupComponent } from './newstartup.component';
import { NewStartupService } from './newstartup.service';
import { routing } from './newstartup.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    NewStartupComponent
  ],
  providers: [
    NewStartupService
  ],

})
export default class NewStartupModule {}