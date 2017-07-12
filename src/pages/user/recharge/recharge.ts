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

  public activeNum = 100;
  public payWay:string;
  public api:any;
  public customValue:any;
  public isRefund = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, @Inject('ApiService') api, private alipay: Alipay) {
    console.log('Hello RechargeComponent Component');
    this.api = api;
    this.payWay = this.navParams.get("payWay") || "aliPay";
    this.isRefund = this.navParams.get('isRefund'); // 是否为押金充值
    if(this.isRefund){
      this.activeNum = this.navParams.get('refundValue');
    }
    console.info(this.payWay);
  }
  public recharge () {
    //this.navCtrl.popToRoot();
    let param = {
      czje: 1,
      czlx: RECHARGE_TYPE.YU_E,
      zffs: PAY_WAY.ZHI_FU_BAO,

    };
    if (this.payWay === 'wechat'){
      param.zffs = PAY_WAY.WEI_XIN;
    }
    if ( this.isRefund ){
      param.czlx = RECHARGE_TYPE.YA_JIN;
    }
    try {
      this.api.httpByUser(RECHARGE,param).then( data => {
        console.info(data.orderInfo);
        if (!data.orderInfo){
            return;
        }
        if(param.zffs === PAY_WAY.ZHI_FU_BAO){
          this.requestForAliPay(data.orderInfo);
        }else{
          this.requestForWechat();
        }
      })
    } catch (err){
      console.error(err);
    }

  }

  public valueChange(event) {
    console.info(event);
    console.info(this.customValue);
    this.activeNum = this.customValue;
  }

  public changeValue(value){
    this.activeNum = value;
    this.customValue = '';
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

  private requestForWechat () {
    let params = {
      partnerid: '10000100', // merchant id
      prepayid: 'wx201411101639507cbf6ffd8b0779950874', // prepay id
      noncestr: '1add1a30ac87aa2db72f57a2375d8fec', // nonce
      timestamp: '1439531364', // timestamp
      sign: '0CB01533B8C1EF103065174F50BCA001', // signed string
    };
    console.info(Wechat);
    Wechat.sendPaymentRequest(params, function () {
     alert("Success");
     }, function (reason) {
     alert("Failed: " + reason);
     });
  }

}
