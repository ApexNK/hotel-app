import { Component } from '@angular/core';
import {  NavController, NavParams, IonicPage } from 'ionic-angular';

/**
 * Generated class for the OrderPayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:"ReservationPage",
  segment: 'ReservationPage/:beginDate/:endDate/:days/:total/:orderNo'
})
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})
export class ReservationPage {
  public beginDate = '';
  public endDate = '';
  public days = 0;
  public orderNo = '';
  public total = 0;
  constructor(public navCtrl: NavController,  navParams: NavParams) {
    this.endDate = navParams.get('endDate');
    this.beginDate = navParams.get('beginDate');
    this.days = navParams.get('days');
    this.orderNo = navParams.get('orderNo');
    this.total = navParams.get('total');
  }

  ionViewDidLoad() {

  }
  private init() {

  }
  public goPay () {
    this.navCtrl.push('OrderPayPage');
  }
}
