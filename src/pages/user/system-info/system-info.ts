import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SYSTEM_INFORMATION } from '../../../providers/API_MARCO'

/**
 * Generated class for the SystemInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-system-info',
  templateUrl: 'system-info.html',
})
export class SystemInfoPage {

  public sysInfoList = [];
  private api: any;
  public curListPage = 1;
  private pageSize = 10;

  constructor(public navCtrl: NavController, public navParams: NavParams,@Inject('ApiService') api) {
    this.api = api;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad systemInfo');
    this.getSystemInfo();
  }

  private getSystemInfo(): Promise<any> {
    let param = {
      pageNum: this.curListPage,
      pageSize: this.pageSize
    };
    try {
      return this.api.httpByUser(SYSTEM_INFORMATION, param).then(res => {
        let sysInfoItem = res.datas;
        if (sysInfoItem.length) {
          this.sysInfoList = [...this.sysInfoList, ...sysInfoItem];
        }
        if(sysInfoItem.length < this.pageSize){
          return true;//已经没有数据可以加载了
        }else{
          return false;
        }
      },err => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
  }

  public doInfinite(infiniteScroll:any): Promise<any> {
    console.log('doInfinite, start is currently '+ this.curListPage);
    this.curListPage++;
    return new Promise((resolve,reject) => {
      this.getSystemInfo().then( res => {
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
