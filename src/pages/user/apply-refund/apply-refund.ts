import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ApplyRefundPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment: 'ApplyRefundPage',
  name: 'ApplyRefundPage'
})
@Component({
  selector: 'page-apply-refund',
  templateUrl: 'apply-refund.html',
})
export class ApplyRefundPage {
  public total = 0;
  public reason: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.total = this.navParams.get('total') || 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyRefundPage');
  }

  public applyForRefund () {

  }
}
