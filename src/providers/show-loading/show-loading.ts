import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
/*
  Generated class for the ShowLoadingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ShowLoadingProvider {
  private loadingSpiner: any;
  private showTimer = null;
  private hideTimer = null;
  constructor(private loadingCtrl: LoadingController) {
    console.log('Hello ShowLoadingProvider Provider');
  }
  public show(opt?: {message?: string, duration?: number, delay?: number}) {
    opt = Object.assign({message: '加载中...', duration: 3000, delay: 300}, (opt || {}));
    this.loadingSpiner = this.loadingCtrl.create({
      content: opt.message,
      duration: opt.duration
    });
    this.showTimer = setTimeout(() => {
      // if (this.hideTimer) {
      //   clearTimeout(this.hideTimer);
      // }
      this.loadingSpiner.present();
    }, opt.delay);
  }

  public hide (delay: number = 300) {
    if (!this.loadingSpiner) {
      return;
    }
    this.hideTimer = setTimeout(() => {
      // if (this.showTimer) {
      //   clearTimeout(this.showTimer);
      // }
      this.loadingSpiner.dismiss();
    }, delay);
  }
}
