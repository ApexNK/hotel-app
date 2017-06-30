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
  private api: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private events:Events, @Inject('ApiService') api) {
/*    this.keyInfo = {
      roomName:'北京华腾美居 1楼103室',
      roomPic : './assets/img/timg.jpg',
      checkInTime : "2017-5-10-2017-5-11",
      address : "西大望路甲16号",
      leaveTime : "2017-05-11 12:00",
      codePic: './assets/img/timg.jpg'
    }; */
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

  private getKeys() {
    this.api.httpByUser(KEY_LIST,{}).then( res => {
      try{
        if(res.datas){
          let info = res.datas;
          this.keyInfo.roomName = info.gymc + ' ' + info.fjbh;
          this.keyInfo.address = info.gydz;
          this.keyInfo.checkInTime = info.rzkssj+'-'+info.rzjssj;
          this.keyInfo.leaveTime = info.rzjssj;
          this.keyInfo.codePic = info.fjkey;
          this.keyInfo.roomPic = './assets/img/timg.jpg';
        }

      }catch (err){
        console.info(err);
      }

    }, err => {
      console.info(err);
    })
  }


}
