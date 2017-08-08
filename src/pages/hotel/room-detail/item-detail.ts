import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage,Events } from 'ionic-angular';
import {RoomDetail, HotelManager,Toast } from '../../../providers';
import {WkDate} from '../../../util';
import { ORDER_STATE_ENUM } from '../../../providers/API_MARCO';

@IonicPage({
  name: 'ItemDetailPage',
  segment: 'ItemDetailPage/:roomId/:beginDate/:endDate/:fjbh'
})
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  public today = WkDate.getToday();
  public beginDate = '';
  public endDate = '';
  private roomId = '';
  private fjbh = '';
  public days:number = 1;
  public roomDetail: RoomDetail;
  constructor(public navCtrl: NavController, navParams: NavParams, private events:Events,private hotelManager: HotelManager,private toast: Toast) {
    this.beginDate = navParams.get('beginDate');
    this.endDate = navParams.get('endDate');
    this.roomId = navParams.get('roomId');
    this.fjbh = navParams.get('fjbh');
    this.days = WkDate.getDays(new Date(this.endDate), new Date(this.beginDate));
  }
  ionViewDidLoad() {
    this.getRoomDetail();
    // this.getHotelList();
  }
  public async goPay () {
    try {
      const orderNo = await this.hotelManager.reservationRoom(
        {
          fjbh: this.fjbh,
          kssj: this.beginDate,
          jssj: this.endDate,
          zfzj: this.roomDetail.fjjg
        }
      );
      const days = WkDate.getDays(new Date(this.endDate), new Date(this.beginDate));
      this.events.publish('updateOrder',ORDER_STATE_ENUM.WAIT_PAY);
      this.navCtrl.push('OrderPayPage',{beginDate:this.beginDate,
        endDate:this.endDate,
        orderNo,
        days, total: this.roomDetail.fjjg * days});
    } catch (e) {
      console.error(e);
    }

    // 传时间、天数、总价和订单编号给支付页面

  }

  public openDate () {
    this.toast.show("请在首页选择入住和离开时间");
  }

  private async getRoomDetail () {
   try {
      this.roomDetail = await this.hotelManager.getRoomDetail(this.roomId);
      if( this.roomDetail.feature.length > 0){
        this.roomDetail.featureList = this.roomDetail.feature.split(",");
      }
    }catch (e) {
      console.error(e);
    }
  }

}
