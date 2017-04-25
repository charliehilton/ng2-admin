import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http"
import 'rxjs/add/operator/map';
//import {BaThemePreloader} from '../../theme/services';

@Injectable()
export class Top100Service {
    
    constructor (private _http: Http){}
    
    getVentures(){ 
<<<<<<< HEAD
        let headers = new Headers({ 'Accept': 'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/top100/all',options)
            .map(res => res.json());
    }

    getTop100Lists(){ 
        let headers = new Headers({ 'Accept': 'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/top100/lists',options)
            .map(res => res.json());
    }

    getTop100Archived(){ 
        let headers = new Headers({ 'Accept': 'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/top100/archived',options)
=======

        let headers = new Headers({ 'Accept': 'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/top100/all',options)
>>>>>>> origin/master
            .map(res => res.json());
    }

    removeFromTop100(id:Number) { 
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete('/rest/plugandplay/api/v1/top100/delete/'+id,options)
            .map(res => res.json());
    }

    movePosition(body:String) { 
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post('/rest/plugandplay/api/v1/top100/move',body,options)
            .map(res => res.json());
    }
<<<<<<< HEAD

    addTop100List(body: String) {
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post('/rest/plugandplay/api/v1/top100/newlist',body,options)
            .map(res => res.json());
    }
=======
>>>>>>> origin/master
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