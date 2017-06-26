import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import {RoomDetail, HotelManager} from '../../../providers';
import {WkDate} from '../../../util';

@IonicPage({
  name: 'ItemDetailPage',
  segment: 'ItemDetailPage/:roomId/:beginDate/:endDate'
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
  public roomDetail: RoomDetail;
  constructor(public navCtrl: NavController, navParams: NavParams, private hotelManager: HotelManager) {
    this.beginDate = navParams.get('beginDate');
    this.endDate = navParams.get('endDate');
    this.roomId = navParams.get('roomId');
  }
  ionViewDidLoad() {
    this.getRoomDetail();
    // this.getHotelList();
  }
  public goPay () {
    // 传时间、天数、总价和订单编号给支付页面
    //this.navCtrl.push('OrderPayPage',{startDate:this.startDate,endDate:this.endDate, days:1, total: 80, orderNo: 'R20170615105325641742'});
/*    const days = WkDate.getDays(new Date(this.endDate), new Date(this.beginDate));
    this.navCtrl.push('OrderPayPage',{startDate:this.beginDate,
      endDate:this.endDate,
      days, total: this.roomDetail.fjjg});*/
  }
  private async getRoomDetail () {
/*    try {
      this.roomDetail = await this.hotelManager.getRoomDetail(this.roomId);
    }catch (e) {
      console.error(e);
    }*/
  }

}
