import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { SYSTEM_INFORMATION,SYSTEM_INFORDETAIL } from '../../../providers/API_MARCO'

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
  private infiniteScroll = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,@Inject('ApiService') api,private alertCtrl: AlertController) {
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
        if(this.curListPage === 1) {
          this.sysInfoList.length = 0;
          if(this.infiniteScroll){
            this.infiniteScroll.enable(true);
          }
        }
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
    this.infiniteScroll = infiniteScroll;
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

  public openSystemInfo(item){
    console.info(item);
    var self= this;
    this.api.httpByUser(SYSTEM_INFORDETAIL,{messageId:item.id}).then( res => {
      if(res.code === '0') {
        let alert = self.alertCtrl.create({
          title: '消息详情',
          subTitle: item.title,
          buttons: ['确定']
        });
        alert.present();
      }
    });

  }

  public doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.curListPage = 1;
    this.pageSize = 10;
    this.getSystemInfo().then( res => {
      refresher.complete();
    },err => {
      refresher.complete();
    });
  }
}
