import {Injectable, EventEmitter, Injector} from '@angular/core';
import {Api} from '../api';
import 'rxjs/add/operator/map';
import {VALID_KEY, LOGIN_KEY} from '../API_MARCO';
import {LocalUserInfo} from '../../LocalDatas/index';
import { JPush } from 'ionic3-jpush';

/*
 Generated class for the LoginManagerProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class LoginManagerProvider {
  private loginStateEv = new EventEmitter<boolean>();
  private userDateEv = new EventEmitter<any>();
  private http: any;
  private localUserInfo: any;

  constructor(private injector: Injector, public jPush: JPush) {
    this.http = this.injector.get(Api);
    this.localUserInfo = this.injector.get(LocalUserInfo);
    console.log('Hello LoginManagerProvider Provider');
  }

  public subscribeLoginState(generatorOrNext?: any, error?: any, complete?: any) {
    return this.loginStateEv.subscribe(generatorOrNext, error, complete);
  }

  public subscribeUserData(generatorOrNext?: any, error?: any, complete?: any) {
    return this.userDateEv.subscribe(generatorOrNext, error, complete);
  }

  public async getValiCode(mobile: string) {
    return this.http.httpPost(VALID_KEY, {
      sjhm: mobile
    });
  }

  public async login(mobile: string, valiCode: string) {
    try {
      const result = await this.http.httpPost(LOGIN_KEY, {
        sjhm: mobile,
        valiCode
      });
      if (result) {
        this.localUserInfo.save(mobile);
        this.emitLogin(true);
        this.userDateEv.emit(mobile);
        let alias = "wk" + mobile;
        // window.alert(alias);
        // 注册极光别名
        this.jPush.setAlias(alias).then( res => {
          console.info(res);
        });
      }
    } catch (e) {
      console.log(e);
    }

  }

  public emitLogin(result: boolean) {
    this.loginStateEv.emit(result);
  }
}
