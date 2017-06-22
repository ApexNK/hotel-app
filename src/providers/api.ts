import { Injectable, Injector } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import {Toast} from '../providers/index';
import {API as URL} from '../web.config';
import 'rxjs/add/operator/map';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  private readonly url: string = URL;

//= 'https://example.com/api/v1'
  constructor(public http: Http,  private injector: Injector) {
  }

  get(api:string, params: any = {}, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }
    // Support easy query params for GET requests
    let p = new URLSearchParams();
    p.set('servicekey', api);

    // for (let k in params) {
    //   p.set(k, params[k]);
    // }
    // Set the order-list field if we have params and don't already have
    // a order-list field set in options.
    options.search = !options.search && p || options.search;
    return this.http.get(this.url, options).map( res => res.json()).toPromise()
      .then(
        this.successHandle,
        () => {}
      ).catch(
        this.failedHandle
      );
  }

  post(api: string, body = {}, options?: RequestOptions) {
    const defaultParam = {
      servicekey: api,
      "uid": "2342534534534534",
      "sign": "93004fe2aa39650d965df7881c24c988",
      "timestamp": '20170928120909',//new Date().getTime(),
    };
    const param = Object.assign({}, defaultParam, {
      parameter: body
    });
    return this.http.post(this.url ,param, options)
      .map((res: any) => {
          console.log(res);
          return JSON.parse(res._body)
      })
      .toPromise().then(
      this.successHandle,
      () => {}
    ).catch(
      this.failedHandle
    );
  }

  httpByUser(api: string, body = {}, options?: RequestOptions){
    body['sjhm'] = '18963609578';//通过本地存储接口获取手机号码
    return this.htttPost(api,body,options);
  }

  private htttPost(api: string, body = {}, options?: RequestOptions) {
    const defaultParam = {
      servicekey: api,
      "uid": "2342534534534534",
      "sign": "93004fe2aa39650d965df7881c24c988",
      "timestamp": '20170928120909',//new Date().getTime(),
    };
    const param = Object.assign({}, defaultParam, {
      parameter: body
    });
    return this.http.post(this.url ,param, options)
      .map( (res) => {
        console.info(res);
        return res.json();
      })
      .toPromise().then(
        this.successCB,
        this.failedCB
      );
  }

  private successCB = (res) => {
    try {
      if(res.code !== 0) {
        this.presentToast(res.message);
        return false;
      }
    } catch (err) {
      console.info(err);
    }
    return res;
  };

  private failedCB = (err) => {
    return Promise.reject(err);
  };

  private successHandle =  (res) => {
    console.log(res);
    if (!res.parameter) {
      return Promise.reject(res);
    }
    if (res.parameter.code !== '0') {
      this.presentToast(res.parameter.message);
      return Promise.reject(res);
    }
  };

  private failedHandle = (err) => {
    console.log(err);
    return Promise.reject(err);
  };
  private presentToast(msg: string) {
    this.injector.get(Toast).show(msg);
    // this.toastCtrl.show(msg);
  }
}
