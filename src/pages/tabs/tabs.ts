import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { KeySearchPage } from '../key/key-search/key-search';
import { HotelListPage } from '../hotel-list/hotel-list';
import { ListMasterPage } from '../hotel/hotel-list/list-master';
import { OrderListPage } from '../order/order-list/order-list'
import { UserCenterPage } from '../user/user-center/user-center';

@IonicPage({
  segment: 'TabsPage',
  name: 'TabsPage'
})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homeTab: any = HotelListPage;
  OrderListTab: any = OrderListPage;
  settingTab: any = UserCenterPage;
  keySearchTab = KeySearchPage;
  homeTitle = "首页";
  orderTitle = "订单";
  keySearchTitle = "钥匙";
  mineTitle = '我的';

  constructor(public navCtrl: NavController) {

  }
}
