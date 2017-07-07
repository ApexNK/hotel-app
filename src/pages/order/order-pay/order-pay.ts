import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ShowConfirmProvider } from '../../../providers/show-confirm/show-confirm';
import { ORDER_PAY, ORDER_DETAIL, ORDER_STATE_ENUM } from '../../../providers/API_MARCO';
import { WkDate } from '../../../util';
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
  templateUrl: './order-pay.html',
})
export class OrderPayPage {
  private api: any;
  public orderTitle: string = "付款";
  public startDate: string;
  public endDate: string;
  public days: number;
  public total: number;
  public orderNo: string;
  public user = {name:'',phoneNumber:'',IDCard:''};
  public showSuccessPage = false;
  public amount: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,private events:Events, private confirmCtrl: ShowConfirmProvider,@Inject('ApiService') api) {
    this.api = api;
    this.days = 0;
    this.total = 0;
    this.orderNo = this.navParams.get("orderNo");
    this.getOrderDetail();
    this.amount = this.total;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPayPage');
  }

  goPay () {
    this.api.httpPost(ORDER_PAY,{ddbh:this.orderNo}).then(
      res => {
        console.info(res);
        if( res.code === '0') {
          this.showSuccessPage = true;
          setTimeout(()=> {
            this.goToOrderTabs(ORDER_STATE_ENUM.WAIT_USE);
          },2000);

        }else {
          this.confirmCtrl.show({message:"余额不足，不能满足付款",okText:"去充值", cancelText:"取消"}).then(
            result => {
              if(result){
                this.navCtrl.push("RechargePage",{payWay:'aliPay'});
              } else {
                this.goToOrderTabs(ORDER_STATE_ENUM.WAIT_PAY);
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

  private goToOrderTabs(tab){
    this.navCtrl.parent.select(1);
    this.navCtrl.popToRoot();
    this.events.publish('updateOrder',tab);
  }

/*  private goToKeyTabs() {
    this.navCtrl.parent.select(2);
    this.navCtrl.popToRoot();
  }*/

  private getOrderDetail() {
    this.api.httpPost(ORDER_DETAIL,{ddbh:this.orderNo}).then( res => {
      let datas = res.data;
      this.startDate = datas.kssj;
      this.endDate = datas.jssj;
      this.days =datas.jgsj//WkDate.getDays(new Date(this.endDate), new Date(this.startDate));
      this.total = datas.ddje;
      this.amount = this.total;
      this.user.name = datas.hyxm;
      this.user.phoneNumber = datas.hysjhm;
      this.user.IDCard = datas.hysfzh;
    });
  }
}
