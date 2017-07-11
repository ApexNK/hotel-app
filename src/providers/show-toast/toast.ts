import { Injectable } from '@angular/core';
import { ToastController  } from 'ionic-angular';
/*
 Generated class for the ShowLoadingProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Toast {
  constructor(private toast : ToastController ) {
    console.log('Hello ShowLoadingProvider Provider');
  }
  public show(message?: string, duration: number = 2000, delay?: number) {
    let opt = {
      message: message,
      duration: duration,
      cssClass: 'toast-hk'
    };
    let toast = this.toast.create(opt);
    toast.present();
  }

  public hide (delay: number = 300) {

  }
}
