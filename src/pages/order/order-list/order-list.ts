import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailPage } from '../hotel/hotel-detail/item-detail';


@Component({
  selector: 'order-list',
  templateUrl: 'order-list.html'
})
export class OrderListPage {

  currentItems: any = [];
  curTab: string = "waitingForPay";
  constructor(public navCtrl: NavController, public navParams: NavParams) { }


}
