import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import {RoomDetail, HotelManager} from '../../../providers';
import {WkDate} from '../../../util';

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
  public roomDetail: RoomDetail;
  constructor(public navCtrl: NavController, navParams: NavParams, private hotelManager: HotelManager) {
    this.beginDate = navParams.get('beginDate');
    this.endDate = navParams.get('endDate');
    this.roomId = navParams.get('roomId');
    this.fjbh = navParams.get('fjbh');
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
      this.navCtrl.push('ReservationPage',{beginDate:this.beginDate,
        endDate:this.endDate,
        orderNo,
        days, total: this.roomDetail.fjjg * days});
    } catch (e) {
      console.error(e);
    }

    // 传时间、天数、总价和订单编号给支付页面

  }
  private async getRoomDetail () {
   try {
      this.roomDetail = await this.hotelManager.getRoomDetail(this.roomId);
    }catch (e) {
      console.error(e);
    }
  }

}
