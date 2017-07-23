import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the PayResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pay-result',
  templateUrl: 'pay-result.html',
})
export class PayResultPage {
  public currentStatus = {
    title:"支付成功",
    value:"success",
    money: 0
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private events:Events) {
    let status = this.navParams.get('status');
    if( status === 'fail' ){
      this.currentStatus.title = "支付失败";
      this.currentStatus.value = "fail";
    }else{
      this.currentStatus.money = this.navParams.get('money');
      let self = this;
      setTimeout(function () {
        self.events.publish('updateUserCenter',true);
        self.navCtrl.popToRoot();
      },2000);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayResultPage');
  }

}
