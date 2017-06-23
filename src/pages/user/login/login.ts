import { Component } from '@angular/core';
import { NavController , IonicPage} from 'ionic-angular';

import { User } from '../../../providers/user';
import {LoginManagerProvider} from '../../../providers/index';
import {LocalUserInfo} from '../../../LocalDatas/user-info';
// @IonicPage({
//   segment:"LoginPage",
//   name: 'LoginPage'
// })
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { mobile: string} = {
    mobile: ''
  };
  public validCode = '';
  public leftTimes = 60;
  private timer = null;
  constructor(
    private userInfo: LocalUserInfo,
    public navCtrl: NavController,
    public user: User,
    private loginManager: LoginManagerProvider) {
    this.getAccount();
  }
  private async getAccount () {
    const result = await this.userInfo.get();
    if (result) {
      this.account = result;
    }
  }
  public async getValidCode () {
    if (!this.account.mobile) {
      return;
    }
    try {
      await this.loginManager.getValiCode(this.account.mobile);
      this.decreaseLeftTime();
    }catch (e) {
      console.log(e);
    }
  }
  private decreaseLeftTime () {
    this.timer = setInterval(res => {
      this.leftTimes--;
      if (this.leftTimes === 0) {
        this.leftTimes = 60;
        clearInterval(this.timer);
      }
    }, 1000);
  }
  // Attempt to login in through our User service
  doLogin() {
    this.loginManager.login(this.account.mobile, this.validCode);
    // this.user.login(this.account).subscribe((resp) => {
    //   this.navCtrl.push(MainPage);
    // }, (err) => {
    //   this.navCtrl.push(MainPage);
    //   // Unable to log in
    //   let toast = this.toastCtrl.create({
    //     message: this.loginErrorString,
    //     duration: 3000,
    //     position: 'top'
    //   });
    //   toast.present();
    // });
  }
}
