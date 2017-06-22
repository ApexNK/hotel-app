import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class LocalUserInfo {
  private readonly KEY: string = 'userInfo';
  constructor(public storage: Storage) {

  }
  public save (data) {
    return this.storage.set(this.KEY, data);
  }
  public get () {
    return this.storage.get(this.KEY);
  }
}
