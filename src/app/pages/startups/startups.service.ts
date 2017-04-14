import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http"
import 'rxjs/add/operator/map';
//import {BaThemePreloader} from '../../theme/services';

@Injectable()
export class StartupsService {
    
    constructor (private _http: Http) 
    
    {}
  
    /*StartupsData = this.getCompanies().toPromise();*/
    
    getVentures(){ 

        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/ventures/all',options)
            .map(res => res.json());
    }
    //54.145.172.103
    //        BaThemePreloader.registerLoader(this.getVentures());
    /*getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.StartupsData);
      }, 2000);
    });
    }*/
}