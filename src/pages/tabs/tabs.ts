import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { KeySearchPage } from '../key/key-search/key-search';
import { ListMasterPage } from '../hotel/hotel-list/list-master';
import { OrderListPage } from '../order/order-list/order-list'
import { SettingsPage } from '../user/settings/settings';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homeTab: any = ListMasterPage;
  OrderListTab: any = OrderListPage;
  settingTab: any = SettingsPage;
  keySearchTab = KeySearchPage;
  homeTitle = "首页";
  orderTitle = "订单";
  keySearchTitle = "钥匙";
  mineTitle = '我的';

  constructor(public navCtrl: NavController) {

  }
}
