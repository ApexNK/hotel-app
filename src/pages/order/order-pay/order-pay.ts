import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShowConfirmProvider } from '../../../providers/show-confirm/show-confirm';
import { ORDER_PAY } from '../../../providers/API_MARCO';

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
  private api: any;
  public orderTitle: string = "付款";
  public startDate: string;
  public endDate: string;
  public days: number;
  public total: number;
  public orderNo: string;
  public user: object = { name:'李刚', phoneNumber: '15950528787', IDCard: '350582198871155444'};
  constructor(public navCtrl: NavController, public navParams: NavParams, private confirmCtrl: ShowConfirmProvider,@Inject('ApiService') api) {
    this.api = api;
    this.startDate = this.navParams.get("startDate");
    this.endDate = this.navParams.get("endDate");
    this.days = this.navParams.get("days");
    this.total = this.navParams.get("total");
    this.orderNo = this.navParams.get("orderNo");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPayPage');
  }

  goPay () {
    this.api.httpPost(ORDER_PAY,{ddbh:this.orderNo}).then(
      res => {
        console.info(res);
        if( res.code === '1') {
          this.goToKeyTabs();
        }else {
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
      },
      err => {
        console.info(err);
      }
    );

}

  private goToOrderTabs(){
    this.navCtrl.parent.select(1);
    this.navCtrl.popToRoot();
  }

  private goToKeyTabs() {
    this.navCtrl.parent.select(2);
    this.navCtrl.popToRoot();
  }
}
