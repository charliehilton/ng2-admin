import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core'
import { Observable } from 'rxjs/Rx';

import { PortfolioService } from './portfolio.service';
import { LocalDataSource } from 'ng2-smart-table';
import {Subscription} from 'rxjs';
//import {BaThemePreloader} from '../../theme/services';


@Component({
  selector: 'portfolio',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./portfolio.scss'),require('./busy.scss')],
  template: require('./portfolio.html'),
  providers: [PortfolioService]
})
export class PortfolioComponent implements OnInit {
  @ViewChild('input')
  input: ElementRef;
  companies: any[];
  busy: Subscription;

  constructor(private _portfolioService: PortfolioService) {

    
    this.busy = _portfolioService.getVentures().subscribe(data => this.companies = data,
    error => console.error('Error: ' + error),
        () => console.log('Completed!')
    )
    /*BaThemePreloader.registerLoader(this._loadData(_startupService));*/
    
    
  }

    ngOnInit(){
      let eventObservable = Observable.fromEvent(this.input.nativeElement, 'keyup')
      eventObservable.subscribe();
    }


/*    private _loadData(_startupService):Promise<any> {
    return new Promise((resolve, reject) => {
      _startupService.getVentures().subscribe(data => this.companies = data,
    error => console.error('Error: ' + error),
        () => console.log('Completed!')
    )
    });
  }*/

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