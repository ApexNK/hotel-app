import { Component } from '@angular/core';
import { NavController, NavParams ,IonicPage} from 'ionic-angular';
import { Items } from '../../../providers/providers';

@IonicPage({
  name:"RoomListPage",
  segment: 'room-list'
})
@Component({
  selector: 'room-list',
  templateUrl: 'room-list.html'
})
export class RoomListPage {
  item: any;
  public startDate = '2017-05-27';
  public endDate = '2017-06-01';
  public rooms = new Array(20);
  constructor(public navCtrl: NavController, navParams: NavParams, items: Items) {
    this.item = navParams.get('item') || items.defaultItem;
  }
  public goRoomDetail () {
    this.navCtrl.push("ItemDetailPage");
  }
}
