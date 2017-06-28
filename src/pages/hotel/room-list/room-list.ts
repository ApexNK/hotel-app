import { Component, OnChanges } from '@angular/core';
import { NavController, NavParams ,IonicPage} from 'ionic-angular';
import {HotelDetail, RoomItem, HotelManager} from '../../../providers';
@IonicPage({
  name:"RoomListPage",
  segment: 'RoomListPage/:flatId/:beginDate/:endDate'
})
@Component({
  selector: 'room-list',
  templateUrl: 'room-list.html'
})
export class RoomListPage{
  item: any;
  public beginDate = '';
  public endDate = '';
  public id = '';
  public hotelDetail: HotelDetail;
  constructor(public navCtrl: NavController,
              private hotelManager:  HotelManager,
              navParams: NavParams) {
    this.id = navParams.get('flatId');
    this.beginDate = navParams.get('beginDate');
    this.endDate = navParams.get('endDate');
  }
  ionViewDidLoad() {
    this.getHotelDetail();
    // this.getHotelList();
  }

  public getHotelDetail () {
    this.hotelManager.getHotelDetail({beginDate: this.beginDate, endDate: this.endDate, flatId: this.id})
      .then((res) => {
        this.hotelDetail = res as HotelDetail;
      });
  }
  public goRoomDetail (roomId, beginDate, endDate, fjbh) {
    this.navCtrl.push("ItemDetailPage", {
      roomId,
      beginDate,
      endDate,
      fjbh
    });
  }
}
