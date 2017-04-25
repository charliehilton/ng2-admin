import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation,  OnDestroy } from '@angular/core';
import {Pipe, PipeTransform, SimpleChanges} from '@angular/core'
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

import { Top100Service } from './top100.service';
import { LocalDataSource } from 'ng2-smart-table';
import {Subscription} from 'rxjs';
//import {BaThemePreloader} from '../../theme/services';


@Component({
  selector: 'top100',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./top100.scss'),require('./busy.scss')],
  template: require('./top100.html'),
  providers: [Top100Service]
})

export class Top100Component implements OnInit, OnDestroy  {
  @ViewChild('input')
  input: ElementRef;
  companies: any[];
  lists: any[];
  archived: any[];
  busy: Subscription;
  private sub: any;
  top100: Object;
  top100list: String;
  listname: String;

  constructor(private route: ActivatedRoute, private _top100Service: Top100Service) {
    
    this.busy = _top100Service.getVentures().subscribe(data => this.companies = data,
    error => console.error('Error: ' + error),
        () => console.log('Completed!')
    )

    this.busy = _top100Service.getTop100Lists().subscribe(data => this.lists = data,
    error => console.error('Error: ' + error),
        () => console.log('Completed!')
    )

     this.busy = _top100Service.getTop100Archived().subscribe(data => this.archived = data,
    error => console.error('Error: ' + error),
        () => console.log('Completed!')
    )

  }

  ngOnInit(){
      this.sub = this.route.params.subscribe(params => {
       this.listname = params['listName']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.       //JSON.stringify(data)
    });
      let eventObservable = Observable.fromEvent(this.input.nativeElement, 'keyup')
      eventObservable.subscribe();
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
    /*BaThemePreloader.registerLoader(this._loadData(_startupService));*/

  removeTop100(id:Number) {
    console.log("Remove "+id);
    this._top100Service.removeFromTop100(id).subscribe(data => this.top100 = data,
    error => console.error('Error: ' + error),
      () => location.reload()
    );
    //location.reload();
  }

  addTop100List(listname: String){
    if(listname.length < 2 || listname.length > 50) {
      window.alert("Please enter a list name greater than 1 and less than 50 characters.");
    } else {
      console.log(listname);
      this._top100Service.addTop100List("{\"listName\":\""+listname+"\"}").subscribe(data => this.top100list = data,
    error => window.alert('Please enter a new Top100 List, "'+listname+'" already exists!'),
      () => location.reload()
    );
    }
  }
/*    private _loadData(_startupService):Promise<any> {
    return new Promise((resolve, reject) => {
      _startupService.getVentures().subscribe(data => this.companies = data,
    error => console.error('Error: ' + error),
        () => console.log('Completed!')
    )
    });
  }*/
  changePosition(position:Number, id:Number) {
    
    if(position > this.companies.length || position < 1){
      window.alert("Please enter a number between 1 and "+this.companies.length);
    } else {
      console.log("{\"id\":"+id+",\"order\":"+position+"}");

      this._top100Service.movePosition("{\"id\":"+id+",\"order\":"+position+"}").subscribe(data => this.top100 = data,
      error => console.error('Error: ' + error),
      () => location.reload()
    );
    }
    
}

}

    

@Pipe({
  name: 'searchPipe',
  pure: false
})
export class SearchPipe implements PipeTransform {
  transform(data: any[], searchTerm: string): any[] {
      searchTerm = searchTerm.toUpperCase();
      return data.filter(item => {
        return item.toUpperCase().indexOf(searchTerm) !== -1 
      });
  }
}

@Pipe({
    name: 'searchFilter'
})

export class PipeFilter implements PipeTransform {
    transform(items: any[], term: any[]): any {
        return items.filter(item => item.companyName.indexOf(term[0]) !== -1);
    }
}   

@Pipe({
	name: "smArraySearch"
})
export class SearchArrayPipe implements PipeTransform {
	transform(list: Array<{}>, search: string): Array<{}> {
		if (!list || !search) {
			return list;
		}

		//return list.filter((item: { companyName: string}) => !!item.companyName.toLowerCase().match(new RegExp(search.toLowerCase()) ));
    return list.filter((item: { companyName: string, blurb: string, verticals: string, website: string, pnpContact: string, contactName: string, email: string, stage: string, b2bb2c: string, location: string, city: string, tags: string}) => 
    (!!item.companyName.toLowerCase().match(new RegExp(search.toLowerCase()))) || 
    (!!item.blurb.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.verticals.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.website.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.pnpContact.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.contactName.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.email.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.stage.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.b2bb2c.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.location.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.city.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.tags.toLowerCase().match(new RegExp(search.toLowerCase())))
    );
    
	}
}