import { Injectable, Injector } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import {Toast} from '../providers/index';
// import {API as URL} from '../web.config';
import 'rxjs/add/operator/map';
import {LocalUserInfo} from '../LocalDatas/index';
import { ORDER_PAY, PERSON_INFO } from  "./API_MARCO"
import config from "../config/config"
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  private readonly url: string = config.proUrl;
  private localUser: any;
  constructor(public http: Http,  private injector: Injector) {
    this.localUser = this.injector.get(LocalUserInfo);
  }

  public httpGet(url:string, params: any = {}, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    let p = new URLSearchParams();
    for (let k in params) {
      p.set(k, params[k]);
    }
    // Set the order-list field if we have params and don't already have
    // a order-list field set in options.
    options.search = !options.search && p || options.search;
    return this.http.get(url, options).map( res => res.json()).toPromise();
  }

  public async httpByUser(api: string, body = {}, options?: RequestOptions){
    const mobile = await this.localUser.getMobile();
    console.info(mobile);
    body['sjhm'] = mobile;
    body['phone'] = mobile;
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
    if ( res.servicekey === ORDER_PAY || res.servicekey === PERSON_INFO) { //订单支付不拦截,个人详情不拦截
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
