import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemDetailPage } from '../item-detail/item-detail';
import { Items } from '../../providers/providers';

@Component({
  selector: 'room-list',
  templateUrl: 'room-list.html'
})
export class RoomListPage {
  item: any;
  public startDate = '2017-05-27';
  public endDate = '2017-06-01';
  constructor(public navCtrl: NavController, navParams: NavParams, items: Items) {
    this.item = navParams.get('item') || items.defaultItem;
  }
  public goRoomDetail () {
    this.navCtrl.push(ItemDetailPage);
  }
}
