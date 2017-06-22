import {Injectable, EventEmitter, Injector} from '@angular/core';
import {Api} from '../api';
import 'rxjs/add/operator/map';
import {VALID_KEY, LOGIN_KEY} from '../API_MARCO';

/*
 Generated class for the LoginManagerProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class LoginManagerProvider {
  private loginStateEv = new EventEmitter<boolean>();
  private http: any;

  constructor(private injector: Injector) {
    this.http = this.injector.get(Api);
    console.log('Hello LoginManagerProvider Provider');
  }

  public subscribeLoginState(generatorOrNext?: any, error?: any, complete?: any) {
    return this.loginStateEv.subscribe(generatorOrNext, error, complete);
  }

  public async getValiCode(mobile: string) {
    return this.http.post(VALID_KEY, {
      sjhm: mobile
    });
  }

  public async login(mobile: string, valiCode: string) {
    try {
      const result = await this.http.post(LOGIN_KEY, {
        sjhm: mobile,
        valiCode
      });
      if (result) {
        this.emitLogin();
      }
    } catch (e) {
      console.log(e);
    }

  }

  public emitLogin() {
    this.loginStateEv.emit(true);
  }
}
