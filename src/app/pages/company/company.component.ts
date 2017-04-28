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
  top100: Object;
  lists: any[];
  public error: boolean;
  public loading: boolean;
  

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
    this._companyService.getTop100Lists().subscribe(data => this.lists = data,
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      )
    //console.log(this.company);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addTop100(id:Number,listName:String) {
    console.log("Add "+id+ " to Top100 list "+listName);
    this.loading = true;
    this.error = false;
    this._companyService.addToTop100(this.id,listName).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.loading = false;
        this.error = true;
        window.alert("Venture already exists in "+listName);
      } else if (res.status == 206) {
        this.loading = false;
        this.error = true;
        window.alert("The top 100 list "+listName+" already has one hundred entries.");
      } else if (res.status < 200 || res.status >= 300){
        this.loading = false;
        throw new Error('This request has failed ' + res.status);
      }
      // If everything went fine, return the response
      else {
        this.loading = false;
        window.alert("Successfully added to Top100 list "+listName);
        return res.json();
        
      }
    }).subscribe(data => this.top100 = data,
      err => console.error('Error: ' + err),
          () => console.log("Completed!")
      );
    }

  removeTop100(id:Number) {
    console.log("Remove "+id);
    this._companyService.removeFromTop100(this.id).subscribe(data => this.top100 = data,
    error => console.error('Error: ' + error),
      () => location.reload()
    );
    
  }

}