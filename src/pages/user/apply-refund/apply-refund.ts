import { Component,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APPLY_FOR_REFUND } from '../../../providers/API_MARCO'
import {ShowConfirmProvider} from '../../../providers/show-confirm/show-confirm';

/**
 * Generated class for the ApplyRefundPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment: 'ApplyRefundPage',
  name: 'ApplyRefundPage'
})
@Component({
  selector: 'page-apply-refund',
  templateUrl: 'apply-refund.html',
})
export class ApplyRefundPage {
  public total = 0;
  public reason: string;
  public showHeader = true;
  private api:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,@Inject('ApiService') api, private confirmCtrl: ShowConfirmProvider) {
    this.total = this.navParams.get('total') || 0;
    this.api = api;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyRefundPage');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
    this.showHeader = false;
  }
  public applyForRefund () {
    let self = this;
    this.confirmCtrl.show({message: "请问是否申请退还押金？", okText: "确定", cancelText: "取消"}).then(
      res => {
        if (res) {
          self.requestForRefund();
        }
      }, err => {
        console.info(err);
      }
    );
  }

  private requestForRefund(){
    let param = {};
    this.api.httpByUser(APPLY_FOR_REFUND,param).then(data => {
      console.info(data);
    })

  }
}
