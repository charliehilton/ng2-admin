import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http"
import 'rxjs/add/operator/map';

@Injectable()
export class StartupsService {
   constructor (private _http: Http) {}

   getBusiness(): Promise<any> {
        return new Promise((resolve, reject) => {
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        setTimeout(() => {
        resolve(this._http.get('http://localhost:8080/plugandplay/api/v1/business/2',options)
            .map(res => res.json())
        );
        }, 2000);
        });
  }

  getCompany() {
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('http://localhost:8080/plugandplay/api/v1/businesses/all',options)
            .map(res => res.json());
    }
    StartupsData = this.getCompany().toPromise();
  /*StartupsData = [
    {
      id: 1,
      firstName: 'Mark',
      lastName: 'Otto',
      username: '@mdo',
      email: 'mdo@gmail.com',
      age: '28'
    },
    {
      id: 2,
      firstName: 'Jacob',
      lastName: 'Thornton',
      username: '@fat',
      email: 'fat@yandex.ru',
      age: '45'
    },
    {
      id: 3,
      firstName: 'Larry',
      lastName: 'Bird',
      username: '@twitter',
      email: 'twitter@outlook.com',
      age: '18'
    },
    {
      id: 4,
      firstName: 'John',
      lastName: 'Snow',
      username: '@snow',
      email: 'snow@gmail.com',
      age: '20'
    }    
    ];*/
  
  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.StartupsData);
      }, 2000);
    });
  }

}