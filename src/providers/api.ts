import { Injectable, Injector } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import {Toast} from '../providers/index';
import {API as URL} from '../web.config';
import 'rxjs/add/operator/map';
import {LocalUserInfo} from '../LocalDatas/index';
import { ORDER_PAY } from  "./API_MARCO"
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  private readonly url: string = URL;
  private localUser: any;
  constructor(public http: Http,  private injector: Injector) {
    this.localUser = this.injector.get(LocalUserInfo);
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

  // post(api: string, body = {}, options?: RequestOptions) {
  //   const defaultParam = {
  //     servicekey: api,
  //     "uid": "2342534534534534",
  //     "sign": "93004fe2aa39650d965df7881c24c988",
  //     "timestamp": '20170928120909',//new Date().getTime(),
  //   };
  //   const param = Object.assign({}, defaultParam, {
  //     parameter: body
  //   });
  //   return this.http.post(this.url ,param, options)
  //     .map((res: any) => {
  //         console.log(res);
  //         return JSON.parse(res._body)
  //     })
  //     .toPromise().then(
  //     this.successHandle,
  //     () => {}
  //   ).catch(
  //     this.failedHandle
  //   );
  // }

  public async httpByUser(api: string, body = {}, options?: RequestOptions){
    const mobile = await this.localUser.getMobile();
    console.info(mobile);
    body['sjhm'] = mobile;
    return this.httpPost(api,body,options);
  }

  public httpPost(api: string, body = {}, options?: RequestOptions) {
    const defaultParam = {
      servicekey: api,
      "uid": "2342534534534534",
      "sign": "93004fe2aa39650d965df7881c24c988",
      "timestamp": '20170928120909',
    };
    const param = Object.assign({}, defaultParam, {
      parameter: body
    });
    try {
      return this.http.post(this.url ,param, options)
        .map( (res) => {
          console.info(res);
          return res.json();
        })
        .toPromise().then(
          this.successHandle,
          this.failedHandle
        );
    } catch (err) {
      console.info(err);
    }

  }


  private successHandle =  (res) => {
    if (!res.parameter) {
      return Promise.reject(res);
    }
    if (res.resultcode !== '0000') {
      this.presentToast(res.parameter.message);
      return Promise.reject(res);
    }
    if ( res.servicekey === ORDER_PAY ) { //订单支付不拦截
      return Promise.resolve(res.parameter);
    }
    if( !(res.parameter.code === '0000' || res.parameter.code === '0')){
      this.presentToast(res.parameter.message);
      return Promise.reject(res);
    }
    return Promise.resolve(res.parameter);
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
