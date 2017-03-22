import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { CompanyService } from './company.service';
//import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'company',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./company.scss')],
  template: require('./company.html'),
  providers: [CompanyService]
})
export class CompanyComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;
  company: Object;
  //company: string;
  

constructor(private route: ActivatedRoute, private _companyService: CompanyService) {
      this._companyService = _companyService;
}

 ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.       //JSON.stringify(data)
    });
    this._companyService.getVenture(this.id).subscribe(data => this.company = data,
    error => console.error('Error: ' + error),
        () => console.log('Completed!')
    );
    //console.log(this.company);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}