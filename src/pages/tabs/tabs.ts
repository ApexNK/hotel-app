import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { KeySearchPage } from '../key-search/key-search';
import { ListMasterPage } from '../room-master/list-master';
import { SearchPage } from '../search/search'
import { SettingsPage } from '../settings/settings';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homeTab: any = ListMasterPage;
  searchTab: any = SearchPage;
  settingTab: any = SettingsPage;
  keySearchTab = KeySearchPage;
  homeTitle = "首页";
  orderTitle = "订单";
  keySearchTitle = "钥匙";
  mineTitle = '我的';

  constructor(public navCtrl: NavController) {

  }
}
