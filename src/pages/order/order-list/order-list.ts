import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ORDER_STATE_ENUM, OrderManager, OrderItem} from '../../../providers';
// import { ItemDetailPage } from '../hotel/room-detail/item-detail';


@Component({
  selector: 'order-list',
  templateUrl: 'order-list.html'
})
export class OrderListPage {
  public readonly ORDER_ENUM = ORDER_STATE_ENUM;
  public orderItems: OrderItem[] = [];
  public curTab = ORDER_STATE_ENUM.WAIT_PAY;
  public curPage = 1;
  public notLoadOver = true;
  constructor(public navCtrl: NavController,
              private orderManager: OrderManager,
              navParams: NavParams) { }
  ionViewDidLoad() {
    this.getOrder();
    // this.getHotelList();
  }
  public goPay () {
    this.navCtrl.push('OrderPayPage');
  }
  public tabChange () {
    this.curPage = 1;
    this.orderItems = [];
    this.notLoadOver = true;
    this.getOrder();
  }
  public async getOrder () {
    try {
      const result = await this.orderManager.getOrderList(this.curTab, this.curPage);
      this.orderItems = this.orderItems.concat(result.list);
      this.notLoadOver = this.orderItems.length < result.total;
      this.curPage ++;
    }catch (e) {
      this.notLoadOver = false;
    }

  }
}
