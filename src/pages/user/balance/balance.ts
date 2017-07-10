import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BalancePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment: 'balancete-page',
})
@Component({
  selector: 'page-balance',
  templateUrl: 'balance.html',
})
export class BalancePage {
  public activeNum = 0;
  public payWay:string;
  public showHeader = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.payWay = "aliPay";
    this.activeNum = this.navParams.get('total');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BalancePage');
  }
  ionViewWillEnter() {
    console.log('ionViewWillenter');
    this.showHeader = true;
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
    this.showHeader = false;
  }
  public goBalanceDetail () {
    this.navCtrl.push('BalanceDetailPage');
  }

  public goToRecharge () {
    this.navCtrl.push('RechargePage',{payWay:this.payWay});
  }
}
