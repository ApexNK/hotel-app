import {Injectable, Injector} from '@angular/core';
import {Api} from '../api';
import 'rxjs/add/operator/map';
import {MINE} from '../API_MARCO';
//import {LocalUserInfo} from '../../LocalDatas/index';
import {UserMsgs} from './model/UserMsgs';
/*
 Generated class for the LoginManagerProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UserManagerProvider {
  private http: any;

  constructor(private injector: Injector) {
    this.http = this.injector.get(Api);

  }

  public getUserMessages(): Promise<UserMsgs> {
    try {
      return this.http.httpByUser(MINE).then( res => {
        return res.datas as UserMsgs;
      });
    } catch (e) {
      console.error(e);
    }

  }

}
