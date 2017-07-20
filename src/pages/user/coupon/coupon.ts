import {Component, Inject} from '@angular/core';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import {Coupon} from '../../../providers/API_MARCO';
import {LocalUserInfo} from '../../../LocalDatas/index';

/**
 * Generated class for the CouponPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-coupon',
  templateUrl: 'coupon.html',
})
export class CouponPage {

  private api: any;
  private pageSize = 10;
  public notLoadOver: boolean;
  public couponsList = [];
  public curTab: number;
  public curListPage = 1;
  public curPage: number;
  public ORDER_STATE_ENUM = {
    WAIT_USE: 1,
    COMPLETED: 2,
    OVERDUE: 3
  };
  private fromPay = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private events:Events, @Inject('ApiService') api, private localUser: LocalUserInfo) {
    this.api = api;
    this.curTab = this.ORDER_STATE_ENUM.WAIT_USE;
    this.fromPay = this.navParams.get("fromPay") || false;
  }

  public tabChange() {
    this.curPage = 1;
    this.couponsList = [];
    this.notLoadOver = true;
    this.getCoupons();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponPage');
    this.getCoupons();
  }

  private async getCoupons() {
    const mobile = await this.localUser.getMobile();
    let param = {
      receiverphone: mobile,
      couponstate: this.curTab,
      curPage: this.curListPage,
      pageSize: this.pageSize
    };
    try {
      return this.api.httpPost(Coupon, param).then(res => {
        let couponItem = res.datas;
        if (couponItem.length) {
          this.couponsList = [...this.couponsList, ...couponItem];
        }
        if (this.couponsList.length === 0) {
          this.notLoadOver = false;
        }
        if (couponItem.length < this.pageSize) {
          return true;//已经没有数据可以加载了
        } else {
          return false;
        }
      }, err => {
        console.log(err);
        this.notLoadOver = false;
        return false;
      });
    } catch (e) {
      this.notLoadOver = false;
      console.log(e);
    }
  }

  public doInfinite(infiniteScroll: any): Promise<any> {
    console.log('doInfinite, start is currently ' + this.curListPage);
    this.curListPage++;
    return new Promise((resolve, reject) => {
      this.getCoupons().then(res => {
        if (res) {
          console.log('Async operation has ended');
          resolve();
          infiniteScroll.enable(false);
        } else {
          reject();
        }
      });
    })
  }

  public selectCoupon(index) {
    if(this.curTab !== this.ORDER_STATE_ENUM.WAIT_USE){
      return;
    }
    if(!this.fromPay){
      return;
    }
    let selectedCoupon = this.couponsList[index];
    this.events.publish('updateCoupon',{money:selectedCoupon.money, id:selectedCoupon.id});
    this.navCtrl.pop();
  }
}
