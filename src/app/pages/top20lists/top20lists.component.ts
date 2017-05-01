import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {Pipe, PipeTransform, SimpleChanges} from '@angular/core'
import { Observable } from 'rxjs/Rx';
import {Router} from '@angular/router';

import { Top20ListsService } from './top20lists.service';
import { LocalDataSource } from 'ng2-smart-table';
import {Subscription} from 'rxjs';
//import {BaThemePreloader} from '../../theme/services';


@Component({
  selector: 'top20',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./top20lists.scss'),require('./busy.scss')],
  template: require('./top20lists.html'),
  providers: [Top20ListsService]
})
export class Top20ListsComponent implements OnInit {
  @ViewChild('input')
  input: ElementRef;
  lists: any[] = [];
  archived: any[] = [];
  busy: Subscription;
  private sub: any;
  top20: Object;
  top20list: String;
  public error: boolean;
  public errorArchived: boolean;
  public loading: boolean;
  public overlay: any;
  router: Router;

  constructor(private _top20Service: Top20ListsService) {
    this.archived = new Array(0);
    this.lists  = new Array(0);
    this.unsetOverlay();
    this.getLists();
    this.getArchivedLists()
  }

  ngOnInit(){
  }

  getLists() {
      this.loading = true;
      this.error = false;
      this._top20Service.getTop20Lists().map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.loading = false;
        this.error = true;
        console.log("Search did not return any results.") 
      } else if (res.status < 200 || res.status >= 300){
        this.loading = false;
        throw new Error('This request has failed ' + res.status);
      }
      // If everything went fine, return the response
      else {
        this.loading = false;
        return res.json();
      }
    }).subscribe(data => this.lists = data,
      err => console.error('Error: ' + err),
          () => console.log('Completed!')
      )
  }

  getArchivedLists() {
      this.loading = true;
      this.errorArchived = false;
      this._top20Service.getTop20Archived().map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.loading = false;
        this.errorArchived = true;
        console.log("Search did not return any results.") 
      } else if (res.status < 200 || res.status >= 300){
        this.loading = false;
        throw new Error('This request has failed ' + res.status);
      }
      // If everything went fine, return the response
      else {
        this.loading = false;
        return res.json();
      }
    }).subscribe(data => this.archived = data,
      err => console.error('Error: ' + err),
          () => console.log('Completed!')
      )
  }

  addTop20List(listname: String){
    if(listname.length < 2 || listname.length > 50) {
      window.alert("Please enter a list name greater than 1 and less than 50 characters.");
    } else {
      console.log(listname);
      let item;
      this.loading = true;
      this._top20Service.addTop20List("{\"listName\":\""+listname+"\"}").subscribe(data => item = data,
    error => window.alert('Please enter a new Top20 List, "'+listname+'" already exists!'),
      () => { 
        this.lists.push(item);
        this.loading = false; }
        //location.reload(true) }//this.getLists()
            
    );
    }
  }


  archiveList(id:number) {
    //console.log("Remove "+id);
    this.setOverlay();
    this._top20Service.archiveList("{\"id\":"+id+"}").subscribe(data => this.top20 = data,
    error => {
      this.unsetOverlay();
      window.alert('Error: ' + error)}, 
      () =>{
        
        for(var i = 0; i < this.lists.length; i++){
          
          if(this.lists[i].id == id){
            if(typeof this.archived == 'undefined'){
              this.archived = new Array(1);
              this.archived[0] = this.lists[i];
              this.errorArchived = false;
            }else{
              this.archived.push(this.lists[i])
            }
            this.lists.splice(i,1);
          }
          this.unsetOverlay();

        }
      }
    );
  }

  unarchiveList(id:number) {
    //console.log("Remove "+id);
    this.setOverlay();
    this._top20Service.unarchiveList("{\"id\":"+id+"}").subscribe(data => this.top20 = data,
    error => {
      this.unsetOverlay();
      window.alert('Error: ' + error)}, 
      () =>{
        
        for(var i = 0; i < this.archived.length; i++){
          
          if(this.archived[i].id == id){
            this.lists.push(this.archived[i])
            this.archived.splice(i,1);
          }
          this.unsetOverlay();

        }
      }
    );
  }

  setOverlay(){
    this.overlay = {'background-color' : 'Black', 'opacity': '0.7', 'border-radius' : '7px'};
  }

  unsetOverlay(){
    this.overlay = {};
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