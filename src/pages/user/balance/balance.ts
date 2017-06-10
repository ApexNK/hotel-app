import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BalancePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-balance',
  templateUrl: 'balance.html',
})
export class BalancePage {
  public activeNum = 0;
  public payWay:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.payWay = "aliPay";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BalancePage');
  }
  public goBalanceDetail () {
    this.navCtrl.push('BalanceDetailPage');
  }

  public goToRecharge () {
    this.navCtrl.push('RechargePage',{payWay:this.payWay});
  }
}
