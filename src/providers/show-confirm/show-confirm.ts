import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the ShowConfirmProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ShowConfirmProvider {
  private ev = new EventEmitter<boolean>();
  constructor(public http: Http, private confirm: AlertController) {
  }

  public showConfirm (opt?: {title?: string, message?: string, okText?: string, cancelText?: string, cssClass?:string}) {
    opt = Object.assign({title:'', message: '', okText: '确定', cancelText: '取消', cssClass:''}, (opt || {}));
    this.confirm.create({
      title: opt.title ,
      message: opt.message ,
      cssClass:opt.cssClass,
      buttons: [
        {
          text: opt.cancelText ,
          handler: () => {this.ev.emit(false)}
        }
        ,{
          text: opt.okText,
          handler: () => {this.ev.emit(true)}
        }
      ]
    }).present();
    return this.ev;
  }

  public show (opt?: {title?: string, message?: string, okText?: string, cancelText?: string, cssClass?:string}) {
    opt = Object.assign({title:'', message: '', okText: '确定', cancelText: '取消', cssClass:''}, (opt || {}));
    return new Promise( (resolve,reject) => {
      this.confirm.create({
        title: opt.title ,
        message: opt.message ,
        cssClass:opt.cssClass,
        buttons: [
          {
            text: opt.cancelText ,
            handler: () => {resolve(false)}
          }
          ,{
            text: opt.okText,
            handler: () => {resolve(true)}
          }
        ]
      }).present();
    });
  }
}
