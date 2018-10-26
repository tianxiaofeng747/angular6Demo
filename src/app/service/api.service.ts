import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {

  }
  post (url, params): Promise<any>  {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'apiName': url })
    };

    const DEV_MODE: Boolean = false; // true 本地 false远程
    if (DEV_MODE) {
      url = 'assets/data/' + url + '.json';
      return this.http.get(url, params).toPromise();
    } else {
      let newUrl = '/gateway/' + (url.split('.').length === 1 ? url : 'call');
      return this.http.post(newUrl, params, httpOptions).toPromise();
    }

  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message)
    //this.messageService.add(`HeroService: ${message}`);
  }
}

