import { Component, Inject} from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { KeyInfo } from './key-item-models';
import { KEY_LIST } from "../../../providers/API_MARCO"

// DIRECTION_NONE 0,DIRECTION_LEFT 2,DIRECTION_RIGHT 4,DIRECTION_UP 8,DIRECTION_DOWN 16,DIRECTION_HORIZONTAL 6,
// DIRECTION_VERTICAL 2, DIRECTION_ALL 30
enum SWIPE {
  DIRECTION_LEFT = 2,
  DIRECTION_RIGHT = 4
};
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
  public keyList: KeyInfo[] = [];
  private api: any;
  public currentKeyIndex:number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,private events:Events, @Inject('ApiService') api) {
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

  public swipeEvent(event) {
    console.error(event.direction);
    if(event.direction === SWIPE.DIRECTION_LEFT){
      console.info('left');
      if (this.currentKeyIndex < this.keyList.length - 1){
        this.currentKeyIndex++;
      }
    }
    if(event.direction === SWIPE.DIRECTION_RIGHT){
      console.info('right');
      if( this.currentKeyIndex > 0){
        this.currentKeyIndex--;
      }
    }
  }
  // fjbh 房间编号, fjkey开锁二维码链接, fkkh房卡编号, gydz公寓地址,gymc公寓名称,rzkssj开始时间,rzjssj结束时间,sslc楼层

  private getKeys() {
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
            this.keyList.push(keyInfo);
          });
          if(this.currentKeyIndex > (this.keyList.length - 1)){
            this.currentKeyIndex = this.keyList.length - 1;
          }
        }

      }catch (err){
        console.info(err);
      }

    }, err => {
      console.info(err);
    })
  }


}
