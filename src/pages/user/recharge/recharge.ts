import { Component, Inject} from '@angular/core';
import { NavController, NavParams ,IonicPage} from 'ionic-angular';
import { RECHARGE} from '../../../providers/API_MARCO';
import { Alipay } from '@ionic-native/alipay';

enum PAY_WAY {
  ZHI_FU_BAO = 1,
  WEI_XIN
};
enum RECHARGE_TYPE {
  YU_E = 1,
  YA_JIN
};
/**
 * Generated class for the RechargeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@IonicPage({
  segment:"recharge-page"
})
@Component({
  selector: 'recharge',
  templateUrl: './recharge.html'
})
export class RechargePage {

  public activeNum = 0;
  public payWay:string;
  public api:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, @Inject('ApiService') api, private alipay: Alipay) {
    console.log('Hello RechargeComponent Component');
    this.api = api;
    this.payWay = this.navParams.get("payWay");
    console.info(this.payWay);
  }
  public recharge () {
    //this.navCtrl.popToRoot();
    let param = {
      czje: 1,
      czlx: RECHARGE_TYPE.YU_E,
      zffs: PAY_WAY.ZHI_FU_BAO,

    };
    try {
      this.api.httpByUser(RECHARGE,param).then( data => {
        console.info(data.orderInfo);
        if (data.orderInfo){
          this.requestForAliPay(data.orderInfo);
        }
      })
    } catch (err){
      console.error(err);
    }

  }


  private requestForAliPay (data){
    // data 为后端返回的订单信息，为字符串，接口中alipay.pay 需要传递一个AlipayOrder类型
    // 当ts报错时，将/node_modules/@ionic-native/alipay/index.d.ts入参修改为any
    this.alipay.pay(data)
      .then(result => {
        console.log(result); // Success
        //  go to  pay success page

      })
      .catch(error => {
        console.log(error); // Failed
        // go to pay failed page
      });
  }

}
