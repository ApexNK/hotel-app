import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserManagerProvider, UserMsgs} from '../../../providers/index'
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
  constructor(public navCtrl: NavController, private userManager: UserManagerProvider) {
  }
  ionViewDidLoad() {
    this.getUserMsg();
  }

  ionViewWillEnter() {
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
}
