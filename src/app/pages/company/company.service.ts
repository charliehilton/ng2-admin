import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http"
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {
    
    constructor (private _http: Http) {}
  
    /*StartupsData = this.getCompanies().toPromise();*/
    
    getVenture(id:Number) { 
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('http://54.145.172.103:8080/plugandplay/api/v1/ventures/'+id,options)
            .map(res => res.json());
    }
    //54.145.172.103
    /*getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.StartupsData);
      }, 2000);
    });
    }*/
}