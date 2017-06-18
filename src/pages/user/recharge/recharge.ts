import { Component } from '@angular/core';
import { NavController, NavParams ,IonicPage} from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('Hello RechargeComponent Component');

    this.payWay = this.navParams.get("payWay");
    console.info(this.payWay);
  }
  public recharge () {
    //this.navCtrl.popToRoot();
  }

}
