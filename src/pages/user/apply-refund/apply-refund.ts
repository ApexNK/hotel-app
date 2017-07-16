import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APPLY_FOR_REFUND } from '../../../providers/API_MARCO'

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
  public showHeader = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.total = this.navParams.get('total') || 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyRefundPage');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
    this.showHeader = false;
  }
  public applyForRefund () {

  }
}
