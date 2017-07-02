import { Component, Inject} from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { KeyInfo } from './key-item-models';
import { KEY_LIST } from "../../../providers/API_MARCO"

/**
 * Generated class for the KeyItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'key-item',
  templateUrl: './key-item.html'
})
export class KeyItemComponent {

  public keyInfo: KeyInfo;
  public keyList: KeyInfo[] = [];
  private api: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private events:Events, @Inject('ApiService') api) {
    this.keyInfo = {
      roomName:'',
      roomPic : '',
      checkInTime : "",
      address : "",
      leaveTime : "",
      codePic: ''
    };
    this.api = api;
    events.subscribe('updateKey',()=>{
      this.getKeys();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad keyitem');
    this.getKeys();
  }

  public updateKey() {
    this.getKeys();
  }
  // fjbh 房间编号, fjkey开锁二维码链接, fkkh房卡编号, gydz公寓地址,gymc公寓名称,rzkssj开始时间,rzjssj结束时间,sslc楼层

  private getKeys() {
    console.info(this.keyList);
    this.api.httpByUser(KEY_LIST,{}).then( res => {
      try{
        if(res.datas.length > 0){
          res.datas.forEach( info => {
            let keyInfo: KeyInfo = {
              roomName: info.gymc + ' ' + info.sslc+'楼'+info.fjbh+'室',
              address: info.gydz,
              checkInTime: info.rzkssj.split(' ')[0]+'-'+info.rzjssj.split(' ')[0],
              leaveTime: info.rzjssj,
              codePic: info.fjkey,
              roomPic: './assets/img/timg.jpg'
            };
/*            keyInfo['roomName'] = info.gymc + ' ' + info.fjbh;
            keyInfo.address = info.gydz;
            keyInfo.checkInTime = info.rzkssj+'-'+info.rzjssj;
            keyInfo.leaveTime = info.rzjssj;
            keyInfo.codePic = info.fjkey;
            keyInfo.roomPic = './assets/img/timg.jpg';*/
            this.keyList.push(keyInfo);
          });
          this.keyInfo = this.keyList[0];
        }

      }catch (err){
        console.info(err);
      }

    }, err => {
      console.info(err);
    })
  }


}
