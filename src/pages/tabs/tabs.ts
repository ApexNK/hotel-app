import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginManagerProvider} from '../../providers/index';

import { KeySearchPage } from '../key/key-search/key-search';
//import { HotelListPage } from '../hotel/hotel-list/hotel-list';
import { ListMasterPage } from '../hotel/hotel-list/list-master';
import { OrderListPage } from '../order/order-list/order-list'
import { UserCenterPage } from '../user/user-center/user-center';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homeTab: any = ListMasterPage;
  OrderListTab: any = OrderListPage;
  settingTab: any = UserCenterPage;
  keySearchTab = KeySearchPage;
  homeTitle = "首页";
  orderTitle = "订单";
  keySearchTitle = "钥匙";
  mineTitle = '我的';

  constructor(public navCtrl: NavController, private loginManager: LoginManagerProvider) {
    this.init();
  }
  public async init () {
    this.loginManager.getValiCode('15950528684');
    // this.loginManager.login('15950528684',)
  }
}
