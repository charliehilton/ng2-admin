import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation, OnDestroy, ViewContainerRef } from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { CompanyService } from './company.service';
//import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'company',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./company.scss'), require('../css/ng2-toastr.min.scss')],
  template: require('./company.html'),
  providers: [CompanyService]
})
export class CompanyComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;
  company: Object;
  top100: Object;
  top20: Object;
  lists: any[];
  top20list: any[];
  public error: boolean;
  public loading: boolean;
  public loading20: boolean;
  

constructor(private route: ActivatedRoute, private _companyService: CompanyService, public toastr: ToastsManager, vcr: ViewContainerRef) {
      this._companyService = _companyService; 
      this.toastr.setRootViewContainerRef(vcr);       
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
    );
    this._companyService.getTop20Lists().subscribe(data => this.top20list = data,
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
    );
    //console.log(this.company);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  showSuccess(message: string, title: string, time: number) {
        this.toastr.success(message, title,{toastLife: 2000});
  }
  showError(message: string, title: string, time: number) {
        this.toastr.error(message, title,{toastLife: 2000});
  }
  showWarning(message: string, title: string, time: number) {
        this.toastr.warning(message, title,{toastLife: time});
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
        this.showWarning("Venture already exists in '"+listName+"'", "", 5000);
      } else if (res.status == 206) {
        this.loading = false;
        this.error = true;
        this.showWarning("The Top 100 list '"+listName+"' already has one hundred entries.", "", 5000);
      } else if (res.status < 200 || res.status >= 300){
        this.loading = false;
        this.showError("Could not add to Top 100, please try again.", "", 4000);
        throw new Error('This request has failed ' + res.status);
      }
      // If everything went fine, return the response
      else {
        this.loading = false;
        this.showSuccess("Successfully added to Top 100 list '" +listName+"'", "Success!", 2000);
        return res.json();
        
      }
    }).subscribe(data => this.top100 = data,
      err => console.error('Error: ' + err),
          () => console.log("Completed!")
      );
    }

  addTop20(id:Number,listName:String) {
    console.log("Add "+id+ " to Top20 list "+listName);
    this.loading20 = true;
    this.error = false;
    this._companyService.addToTop20(this.id,listName).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.loading20 = false;
        this.error = true;
        this.showWarning("Venture already exists in '"+listName+"'", "", 5000);
      } else if (res.status == 206) {
        this.loading20 = false;
        this.error = true;
        this.showWarning("The Top 20 list '"+listName+"' already has twenty entries.", "", 5000);
      } else if (res.status < 200 || res.status >= 300){
        this.loading20 = false;
        this.showError("Could not add to Top 20, please try again.", "", 4000);
        throw new Error('This request has failed ' + res.status);
      }
      // If everything went fine, return the response
      else {
        this.loading20 = false;
        this.showSuccess("Successfully added to Top 20 list '" +listName+"'", "Success!", 2000);
        return res.json();
        
      }
    }).subscribe(data => this.top20 = data,
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