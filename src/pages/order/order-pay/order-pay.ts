import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShowConfirmProvider } from '../../../providers/show-confirm/show-confirm';

/**
 * Generated class for the OrderPayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'OrderPayPage',
  segment: 'OrderPayPage'
})
@Component({
  selector: 'page-order-pay',
  templateUrl: 'order-pay.html',
})
export class OrderPayPage {
  public orderTitle: string = "付款";
  public startDate: string;
  public endDate: string;
  public days: number;
  public total: number;
  public user: object = { name:'李刚', phoneNumber: '15950528787', IDCard: '350582198871155444'};
  constructor(public navCtrl: NavController, public navParams: NavParams, private confirmCtrl: ShowConfirmProvider) {
    this.startDate = this.navParams.get("startDate");
    this.endDate = this.navParams.get("endDate");
    this.days = this.navParams.get("days");
    this.total = this.navParams.get("total");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPayPage');
  }

  goPay () {
    this.confirmCtrl.showConfirm({message:"余额不足，不能满足付款",okText:"去充值", cancelText:"取消"}).subscribe(
      result => {
        if(result){
          this.navCtrl.push("RechargePage");
        } else {
          this.goToOrderTabs();
        }
      }
    );
}

  private goToOrderTabs(){
    this.navCtrl.parent.select(1);
    this.navCtrl.popToRoot();
  }

}
