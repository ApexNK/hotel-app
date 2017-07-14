import {Component} from '@angular/core';
import {NavController, NavParams, Platform, Events} from 'ionic-angular';
import {UserManagerProvider, UserMsgs,LoginManagerProvider} from '../../../providers/index'
import {LocalUserInfo} from '../../../LocalDatas/user-info';
import {ShowConfirmProvider} from '../../../providers/show-confirm/show-confirm';
import {CallNumber} from '@ionic-native/call-number';

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
  public userMsg: UserMsgs;
  private callNumber: string = '400-800-8888';
  public photoUrl: string;

  constructor(public navCtrl: NavController, private params: NavParams, private userManager: UserManagerProvider,
              private userInfo: LocalUserInfo, private plt: Platform, private events: Events, private confirmCtrl: ShowConfirmProvider,
              private caller: CallNumber,private loginManager: LoginManagerProvider,) {
    this.photoUrl = './assets/img/default_avatar.png';
  }

  ionViewDidLoad() {
    this.getUserMsg();
    console.info(this.navCtrl.parent);
    //this.navCtrl.parent.select(2);
    this.events.subscribe('updateUserCenter', () => {
      this.getUserMsg();
    })
  }


  ngOnChanges() {
    console.log('Ng All Changes');
  }

  public goBalancePage() {
    this.navCtrl.push('BalancePage', {total: this.userMsg.wdye});
  }

  public goCouponPage() {
    this.navCtrl.push('CouponPage');
  }

  public goAudit() {
    this.navCtrl.push('IdentityAuditPage');
  }

  public goUserDetail() {
    this.navCtrl.push('UserDetailPage');
  }

  public contactServer() {
    let self = this;
    this.confirmCtrl.show({message: this.callNumber, okText: "呼叫", cancelText: "取消", cssClass: "call-confirm"}).then(
      res => {
        if (res) {
          console.info('call server');
          self.caller.callNumber(self.callNumber, true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
        }
      }, err => {
        console.info(err);
      }
    );
  }

  public goSystemInfo() {
    this.navCtrl.push('SystemInfoPage');
  }

  public applyRefund() {
    if (this.userMsg.yjye > 0) {
      this.navCtrl.push('ApplyRefundPage', {total: this.userMsg.yjye});
    } else {
      this.navCtrl.push('RechargePage', {isRefund: true, refundValue:this.userMsg.yjye});
    }

  }

  private async getUserMsg() {
    this.userMsg = await this.userManager.getUserMessages();
    console.log(this.userMsg);
  }

  loginOut() {
    console.info(this.plt);
    let self = this;
    this.confirmCtrl.show({message: "请问是否退出当前账号？", okText: "确定", cancelText: "取消"}).then(
      res => {
        if (res) {
          self.userInfo.remove().then(() => {
            console.info('exit app');
            self.loginManager.emitLogin(false);
            //self.plt.exitApp();
          })
        }
      }, err => {
        console.info(err);
      }
    );
  }
}
