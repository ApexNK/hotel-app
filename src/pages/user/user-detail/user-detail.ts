import { Component,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PERSON_INFO } from '../../../providers/API_MARCO';

/**
 * Generated class for the UserDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment:"user-detail"
})
@Component({
  selector: 'page-user-detail',
  templateUrl: './user-detail.html',
})
export class UserDetailPage {
  private api:any;
  public photoUrl:string;
  public userName: string;
  public cardID:string;
  public telNo: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,@Inject('ApiService') api) {
    this.api = api;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailPage');
    this.getPersonInfo();
  }

  private getPersonInfo () {
    this.api.httpByUser(PERSON_INFO,{}).then( res => {
      let userInfo = res.datas;
      try{
        this.photoUrl = userInfo.wdtx || './assets/img/default_avatar.png';
        debugger;
        this.userName = userInfo.xm;
        this.telNo = userInfo.lxfs;
        this.cardID = userInfo.sfzh;
      }catch (err){
        console.info(err);
      }
    },err => {
      console.info(err);
    });
  }
}
