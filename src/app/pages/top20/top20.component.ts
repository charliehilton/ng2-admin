import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation,  OnDestroy } from '@angular/core';
import {Pipe, PipeTransform, SimpleChanges} from '@angular/core'
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

import { Top20Service } from './top20.service';
import { LocalDataSource } from 'ng2-smart-table';
import {Subscription} from 'rxjs';
//import {BaThemePreloader} from '../../theme/services';


@Component({
  selector: 'top20',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./top20.scss'),require('./busy.scss')],
  template: require('./top20.html'),
  providers: [Top20Service]
})

export class Top20Component implements OnInit, OnDestroy  {
  @ViewChild('input')
  input: ElementRef;
  companies: any[];
  archived: any[];
  busy: Subscription;
  private sub: any;
  top20: Object;
  top20list: String;
  listname: String;
  public error: boolean;
  public loading: boolean;
  public overlay: any;

  constructor(private route: ActivatedRoute, private _top20Service: Top20Service) {
      this.unsetOverlay();
  }

  ngOnInit(){
      this.sub = this.route.params.subscribe(params => {
      this.listname = params['listName']; // (+) converts string 'id' to a number
      this.getLists();  
       // In a real app: dispatch action to load the details here.       //JSON.stringify(data)
    });
      let eventObservable = Observable.fromEvent(this.input.nativeElement, 'keyup')
      eventObservable.subscribe();
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
    getLists() {
      this.loading = true;
      this.error = false;
      this._top20Service.getTop20ForList(this.listname).map(res => {
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
    }).subscribe(data => this.companies = data,
      err => console.error('Error: ' + err),
          () => console.log('Completed!')
      );
  }
  setOverlay(){
    this.overlay = {'background-color' : 'Black', 'opacity': '0.7'};
  }

  unsetOverlay(){
    this.overlay = {};
  }
  

  removeTop20(id:Number) {
    this.setOverlay();
    //console.log("Remove "+id);
    this._top20Service.removeFromTop20(id,this.listname).subscribe(data => this.top20 = data,
    error => {
      this.unsetOverlay();
      window.alert('Error: ' + error)}, 
      () =>{
        let trigger = false;
        for(var i = 0; i < this.companies.length; i++){
          
          if(this.companies[i].id == id){
            //console.log("Delete company: "+this.companies[i].id)
            this.companies.splice(i,1);
            trigger = true;
          }
          if(trigger == true){
            for(var j = 0; j < this.companies[i].top20.length; j++){
              /*console.log(this.companies[i].top20[j].listName) 
              console.log(this.companies[i].top20[j].order)*/ 
              if(this.companies[i].top20[j].listName == this.listname){
                  this.companies[i].top20[j].order = this.companies[i].top20[j].order - 1;
              }        
            }
            
          }
          this.unsetOverlay();

        }
      }
    );
  }
  changePosition(position:number, id:Number, current:number) {
    
    if(position > this.companies.length || position < 1){
      window.alert("Please enter a number between 1 and "+this.companies.length);
    } else {
      /*console.log("{\"id\":"+id+",\"order\":"+position+"}");
      console.log("current: "+current)*/
      this.setOverlay();
      this._top20Service.movePosition("{\"id\":"+id+",\"order\":"+position+",\"listName\":\""+this.listname+"\"}").subscribe(data => this.top20 = data,
      error => {
      this.unsetOverlay();
      window.alert('Error: ' + error)},
      () => {
        for(var i = current; i < this.companies.length; i++ ){
        for(var j = 0; j < this.companies[i].top20.length; j++){

              if(this.companies[i].top20[j].listName == this.listname){
                  this.companies[i].top20[j].order = this.companies[i].top20[j].order - 1;
              }        
            }
      }
      for(var j = 0; j < this.companies[current - 1].top20.length; j++){
         if(this.companies[current - 1].top20[j].listName == this.listname){
           this.companies[current -1 ].top20[j].order = position;
         }
      }
      this.companies = this.moveItem(this.companies, current - 1, position-1);
      for(var i = position; i < this.companies.length; i++){
        for(var j = 0; j < this.companies[i].top20.length; j++){
          if(this.companies[i].top20[j].listName == this.listname){
                  this.companies[i].top20[j].order = this.companies[i].top20[j].order + 1;
                  
          }  
        
        }
      }
      
      for(var i = 0; i < this.companies.length; i ++) {
         for(var j = 0; j < this.companies[i].top20.length; j++){
           console.log(this.companies[i].top20[j].venture_id + " " + this.companies[i].top20[j].order)
         }
      }
      this.unsetOverlay();
    }
    );
      

    }
    
  }
  moveItem(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }
     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);  
    return arr;
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