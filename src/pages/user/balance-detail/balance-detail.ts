import { Component,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ACCOUNT_DETAIL } from '../../../providers/API_MARCO'

/**
 * Generated class for the BalanceDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage(
  {
    segment:"balance-detail"
  }
)
@Component({
  selector: 'page-balance-detail',
  templateUrl: 'balance-detail.html',
})
export class BalanceDetailPage {
  public detailMsg = {1:'订房支出',2:'扣罚款',3:'充值'};
  public detailList = [];
  private api: any;
  public curListPage = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams,@Inject('ApiService') api) {
    this.api = api;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BalanceDetailPage');
    this.getDetailList();
  }

  public getDetailList() {
     let param = {
       pageNum: this.curListPage,
       pageSize: 100
     };
     this.api.httpByUser(ACCOUNT_DETAIL,param)
      .then((res) => {
        try {
          let details = res.datas;
          debugger;
          if (details.length) {
            this.detailList = [...this.detailList, ...details];
            this.curListPage++;
          }
        } catch(err) {
        }
      },err => {
       console.info(err);
      });
  }

}
