import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { UserManagerProvider, UserMsgs } from '../../../providers/index'
import { LocalUserInfo } from '../../../LocalDatas/user-info';
/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html'
})
export class UserCenterPage {
  public userMsg:UserMsgs;
  constructor(public navCtrl: NavController, private params: NavParams,private userManager: UserManagerProvider,
  private userInfo: LocalUserInfo, private plt: Platform) {
  }
  ionViewDidLoad() {
    this.getUserMsg();
    console.info(this.navCtrl.parent);
    //this.navCtrl.parent.select(2);
  }


  ngOnChanges() {
    console.log('Ng All Changes');
  }
  public goBalancePage () {
    this.navCtrl.push('BalancePage');
  }
  public goAudit () {
    this.navCtrl.push('IdentityAuditPage');
  }
  public goUserDetail () {
    this.navCtrl.push('UserDetailPage');
  }
  private async getUserMsg () {
    this.userMsg = await this.userManager.getUserMessages();
    console.log(this.userMsg);
  }
  loginOut () {
    console.info('loginOut');
    console.info(this.plt);
    this.userInfo.remove().then(()=> {
      console.info('exit app');
      this.plt.exitApp();
    })
  }
}
