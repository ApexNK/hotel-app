import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { KeyInfo } from '../key-item/key-item-models';



/**
 * Generated class for the KeySearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-key-search',
  templateUrl: 'key-search.html',
})
export class KeySearchPage {
  public keyInfo: KeyInfo;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.keyInfo = {
      roomName:'北京华腾美居 1楼103室',
      roomPic : './assets/img/timg.jpg',
      checkInTime : "2017-5-10-2017-5-11",
      address : "西大望路甲16号",
      leaveTime : "2017-05-11 12:00"
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeySearchPage');

  }

}
