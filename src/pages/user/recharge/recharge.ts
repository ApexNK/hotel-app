import { Component, Inject} from '@angular/core';
import { NavController, NavParams ,IonicPage} from 'ionic-angular';
import { RECHARGE} from '../../../providers/API_MARCO';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, @Inject('ApiService') api) {
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
        console.info(data);
      })
    } catch (err){
      console.error(err);
    }

  }

}
