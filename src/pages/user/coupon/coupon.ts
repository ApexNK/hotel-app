import {Component, Inject} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Coupon} from '../../../providers/API_MARCO'

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

  public couponsList = [];
  private api: any;
  public curTab: number;
  public curListPage = 1;
  private pageSize = 10;
  public curPage: number;
  private notLoadOver: boolean;
  public ORDER_STATE_ENUM = {
    WAIT_USE: 0,
    COMPLETED: 1,
    OVERDUE: 2
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, @Inject('ApiService') api) {
    this.api = api;
    this.curTab = this.ORDER_STATE_ENUM.WAIT_USE;
  }

  public tabChange(event:Event) {
    console.info(event);
    this.curPage = 1;
    this.couponsList = [];
    this.notLoadOver = true;
    this.getCoupons(this.curPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponPage');
  }

  private getCoupons(couponState) {
    let param = {
      couponstate: couponState,
      pageNum: this.curListPage,
      pageSize: this.pageSize
    };
    try {
      return this.api.httpByUser(Coupon, param).then(res => {
        let couponItem = res.datas;
        if (couponItem.length) {
          this.couponsList = [...this.couponsList, ...couponItem];
        }
        if (couponItem.length < this.pageSize) {
          return true;//已经没有数据可以加载了
        } else {
          return false;
        }
      }, err => {
        console.log(err);
        return false;
      });
    } catch (e) {
      console.log(e);
    }
  }


  public doInfinite(couponState: number = 0, infiniteScroll: any): Promise<any> {
    console.log('doInfinite, start is currently ' + this.curListPage);
    this.curListPage++;
    return new Promise((resolve, reject) => {
      this.getCoupons(couponState).then(res => {
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
}
