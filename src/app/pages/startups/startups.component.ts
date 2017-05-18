import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input} from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core'
import { Observable } from 'rxjs/Rx';

import { StartupsService } from './startups.service';
import { LocalDataSource } from 'ng2-smart-table';
import {Subscription} from 'rxjs';

import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';


@Component({
  selector: 'startups',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./startups.scss')],
  template: require('./startups.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StartupsService]
})
export class StartupsComponent implements OnInit {
  @ViewChild('input')
  input: ElementRef;
  @Input('data') companies: any[];
  asyncCompanies: Observable<any[]>;
  p: number = 1;
  total: number;
  public loading: boolean;
  public error: boolean;
  busy: Subscription;
  searchString: String
  
  constructor(private _startupService: StartupsService) {


    /*this.busy = _startupService.getVenturesPage(1).subscribe(data => this.asyncCompanies = data,
    error => console.error('Error: ' + error),
        () => console.log('Completed!')
    )    */
     /*BaThemePreloader.registerLoader(this._loadData(_startupService));*/
  }

    ngOnInit(){
      this.searchString = '';
      this.getPage(1);
      let eventObservable = Observable.fromEvent(this.input.nativeElement, 'keyup')
      eventObservable.subscribe();  
    }

    getPage(page: number) {
        this.loading = true;
        this.error = false;
        this.asyncCompanies = this._startupService.getVenturesPage(page, this.searchString)
            .do(res => {
                if(res.status == 204) {
                  this.loading = false;
                  this.error = true;
                  console.log("Search did not return any results.")                  
                } else {
                    this.total = res.count;
                    this.p = page;
                    this.loading = false;
                }
                
            })
            .map(res => res.data);
    }

    luceneSearch(event: any){
        this.searchString = event.target.value;
        if(this.searchString.length > 2){
            this.getPage(1);
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