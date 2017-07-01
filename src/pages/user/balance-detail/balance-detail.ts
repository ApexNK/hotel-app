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
  public detailMsg = {1:'订房支出',2:'余额',3:'押金'};
  public detailList = [];
  private api: any;
  public curListPage = 1;
  private pageSize = 10;
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
       pageSize: this.pageSize
     };
     return this.api.httpByUser(ACCOUNT_DETAIL,param)
      .then((res) => {
        try {
          let details = res.datas;
          if (details.length) {
            this.detailList = [...this.detailList, ...details];
          }
          if(details.length < this.pageSize){
            return true;//已经没有数据可以加载了
          }else{
            return false;
          }
        } catch(err) {
          return false;
        }
      },err => {
       console.info(err);
      });
  }

  public doInfinite(infiniteScroll:any): Promise<any> {
    console.log('doInfinite, start is currently '+ this.curListPage);
    this.curListPage++;
    return new Promise((resolve,reject) => {
      this.getDetailList().then( res => {
        if(res){
          console.log('Async operation has ended');
          resolve();
          infiniteScroll.enable(false);
        }else{
          reject();
        }
      });
    })
  }
}
