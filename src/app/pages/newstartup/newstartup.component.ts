import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation, OnDestroy, ViewContainerRef } from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { NewStartupService } from './newstartup.service';

@Component({
  selector: 'newstartup',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./newstartup.scss'),require('../css/ng2-toastr.min.scss')], 
  template: require('./newstartup.html'),
  providers: [NewStartupService]
})
export class NewStartupComponent implements OnInit, OnDestroy {
  company: Object;
  formData: Object;
  top100: Object;
  top20: Object;
  lists: any[];
  top20list: any[];
  public error: boolean;
  public loading: boolean;
  public loading20: boolean;
  submitAttempt = false;
  

constructor(private route: ActivatedRoute, private _companyService: NewStartupService, public toastr: ToastsManager, vcr: ViewContainerRef) {
      this._companyService = _companyService;    
      this.toastr.setRootViewContainerRef(vcr);   
}

 ngOnInit() {
    this.initForm();

  }

  ngOnDestroy() {
  }

  showSuccess() {
        this.toastr.success('Profile has been updated!', 'Success!', {toastLife: 2000});
  }
  showError(message: string, title: string) {
        this.toastr.error(message, title,{toastLife: 2000});
  }
 
initSubmit(){
	  this.submitAttempt = true;
}
newStartup() {
  this._companyService.createVenture(JSON.stringify(this.formData)).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.showError("Couldn't find venture in database to udpate.", "Error")
      } else if (res.status < 200 || res.status >= 300){
        this.showError("Could not update company, please try again.", "Error")
      }
      // If everything went fine, return the response
      else {
        this.showSuccess();
        this.initForm();
        return res.json();
        
      }
    }).subscribe(data => this.company = data,
      err => console.error('Error: ' + err),
          () => console.log("Completed!")
      );
 }

 initForm(){
    this.formData = {
      companyName : null,
      blurb : null,
      verticals : null,
      website : null,
      pnpContact : null,
      contactName : null,
      email : null,
      phoneNumber : null,
      totalMoneyRaised : null,
      stage : null,
      b2bb2c : null,
      employees : null,
      location : null,
      city : null,
      competition : null,
      advantage : null,
      background : null,
      founded : null,
      partnerInterests : null,
      caseStudy : null,
      comments : null,
      tags : null,
      materials : null,
      dateOfInvestment : null,
      portfolio : false
    }
  }

}