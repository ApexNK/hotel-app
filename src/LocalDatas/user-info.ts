import { Injectable, Injector } from '@angular/core';

import { Storage } from '@ionic/storage';
import { LoginManagerProvider } from '../providers/index';


/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class LocalUserInfo {
  private readonly KEY: string = 'userInfo';
  constructor(public storage: Storage, private injector: Injector) {

  }
  public save (data) {
    return this.storage.set(this.KEY, data);
  }
  public get () {
    return this.storage.get(this.KEY);
  }

  public remove () {
    return this.storage.remove(this.KEY);
  }
  public async getMobile () {
    let mobile = await this.get();
    if( mobile ){
      return Promise.resolve(mobile);
    }
   let self = this;
    return new Promise( (resolve,reject) => {
      let loginManager = self.injector.get(LoginManagerProvider);
      loginManager.emitLogin(false);
      loginManager.subscribeUserData( m => {
        console.info(m);
        resolve(m);
      })

    });
  }
}
