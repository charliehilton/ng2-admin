import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { MdTabsModule } from '@angular2-material/tabs';

import { CompanyComponent } from './company.component';
import { CompanyService } from './company.service';
import { routing } from './company.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    MdTabsModule
  ],
  declarations: [
    CompanyComponent
  ],
  providers: [
    CompanyService
  ],

})
export default class CompanyModule {}