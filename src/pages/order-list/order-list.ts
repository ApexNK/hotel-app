import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';

import { Item } from '../../models/item';

import { Items } from '../../providers/providers';


@Component({
  selector: 'order-list',
  templateUrl: 'order-list.html'
})
export class OrderListPage {

  currentItems: any = [];
  curTab: string = "waitingForPay";
  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items) { }


}
