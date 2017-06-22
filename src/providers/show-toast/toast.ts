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
    let toast = this.toast.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  public hide (delay: number = 300) {

  }
}
