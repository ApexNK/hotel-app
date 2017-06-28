import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ORDER_STATE_ENUM} from '../../../providers/API_MARCO';
// import { ItemDetailPage } from '../hotel/room-detail/item-detail';


@Component({
  selector: 'order-list',
  templateUrl: 'order-list.html'
})
export class OrderListPage {
  public readonly ORDER_ENUM = ORDER_STATE_ENUM;
  public currentItems: any = [];
  public curTab = ORDER_STATE_ENUM.WAIT_PAY;
  public curPage = 1;
  private readonly PAGE_SIZE = 10;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  public goPay () {
    this.navCtrl.push('OrderPayPage');
  }
}
