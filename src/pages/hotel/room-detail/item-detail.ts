import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import {RoomDetail, HotelManager} from '../../../providers';


@IonicPage({
  name: 'ItemDetailPage',
  segment: 'ItemDetailPage/:roomId/:beginDate/:endDate'
})
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {

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
    this.navCtrl.push('OrderPayPage',{startDate:this.beginDate,endDate:this.endDate, days:1, total: 80});
  }
  private async getRoomDetail () {
    try {
      this.roomDetail = await this.hotelManager.getRoomDetail(this.roomId);
    }catch (e) {
      console.error(e);
    }
  }

}
