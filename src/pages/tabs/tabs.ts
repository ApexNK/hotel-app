import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {LocalUserInfo} from '../../LocalDatas'


import { KeyItemComponent } from '../key/key-item/key-item';
import { ListMasterPage } from '../hotel/hotel-list/list-master';
import { OrderListPage } from '../order/order-list/order-list'
import { UserCenterPage } from '../user/user-center/user-center';
import {LoginManagerProvider} from '../../providers';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homeTab: any = ListMasterPage;
  OrderListTab: any = OrderListPage;
  settingTab: any = UserCenterPage;
  keySearchTab = KeyItemComponent;
  homeTitle = "首页";
  orderTitle = "订单";
  keySearchTitle = "钥匙";
  mineTitle = '我的';
  public isLoginPageShow = false;
  public userInfo:any;
  constructor(public navCtrl: NavController, private loginManager: LoginManagerProvider, private localUserInfo: LocalUserInfo) {
    // this.init();
    this.loginManager.subscribeLoginState(res => {
      this.isLoginPageShow = !res;
    });
  }
  public async init (){
    this.userInfo = await this.localUserInfo.get();
    if (this.userInfo) {
      this.isLoginPageShow = false;
    }
    // this.loginManager.getValiCode('15950528684');
    // this.loginManager.login('15950528684',)
  }

  ionchange(event){
    console.info(event.index);
  }

}
