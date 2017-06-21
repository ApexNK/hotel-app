import { Injectable,Inject } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import {API} from '../web.config';
import 'rxjs/add/operator/map';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  private readonly url: string = API;

//= 'https://example.com/api/v1'
  constructor(public http: Http) {
  }

  get( params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }
    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the order-list field if we have params and don't already have
      // a order-list field set in options.
      options.search = !options.search && p || options.search;
    }
    return this.http.get(this.url, options).map( res => res.json()).toPromise()
      .then(
        this.successHandle,
        () => {}
      ).catch(
        this.failedHandle
      );
  }

  post( body: any, options?: RequestOptions) {
    return this.http.post(this.url ,body, options).toPromise().then(
      this.successHandle,
      () => {}
    ).catch(
      this.failedHandle
    );
  }

  private successHandle =  (res) => {
    console.log(res);
    return Promise.resolve(res);
  };

  private failedHandle = (err) => {
    debugger;
    console.log(err);
    return Promise.reject(err);
  };
}
