import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { ShowConfirmProvider } from '../../../providers/show-confirm/show-confirm';
import { ORDER_PAY, ORDER_DETAIL, ORDER_STATE_ENUM } from '../../../providers/API_MARCO';
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
  public coupon = {
    id:"",
    moneyText:'',
    money:0
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,private events:Events, private alertCtrl: AlertController,
              private confirmCtrl: ShowConfirmProvider,@Inject('ApiService') api) {
    this.api = api;
    this.days = 0;
    this.total = 0;
    this.orderNo = this.navParams.get("orderNo");
    this.amount = this.total;
    this.getOrderDetail();
    this.installCouponEvent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPayPage');
  }

  goPay () {
    this.api.httpPost(ORDER_PAY,{ddbh:this.orderNo,couponid:this.coupon.id}).then(
      res => {
        console.info(res);
        if( res.code === '0') {
          this.showSuccessPage = true;
          setTimeout(()=> {
            this.goToOrderTabs(ORDER_STATE_ENUM.WAIT_USE);
          },2000);

        }else if(res.code === '1'){
          let alert = this.alertCtrl.create({
            title: '支付失败',
            subTitle: res.message,
            buttons: ['确定']
          });
          alert.present();
          return;
        } else {
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
  public selectCoupon(){
    this.navCtrl.push('CouponPage',{fromPay:true});
  }

  private goToOrderTabs(tab){
    this.navCtrl.parent.select(1);
    this.navCtrl.popToRoot();
    this.events.publish('updateOrder',tab);
  }

  private getOrderDetail() {
    this.api.httpPost(ORDER_DETAIL,{ddbh:this.orderNo}).then( res => {
      let datas = res.data;
      this.startDate = datas.kssj;
      this.endDate = datas.jssj;
      this.days =datas.jgsj;//WkDate.getDays(new Date(this.endDate), new Date(this.startDate));
      this.total = datas.ddje;
      this.amount = this.total;
      this.user.name = datas.hyxm;
      this.user.phoneNumber = datas.hysjhm;
      this.user.IDCard = datas.hysfzh;
    });
  }

  private installCouponEvent(){
    this.events.subscribe('updateCoupon',(newcoupon)=>{
      this.coupon.moneyText = '-¥' + newcoupon.money;
      this.coupon.id = newcoupon.id;
      this.amount = this.total - newcoupon.money;
      if(this.amount < 0){
        this.amount = 0;
      }
      this.coupon.money = newcoupon.money;
    });
  }
}
