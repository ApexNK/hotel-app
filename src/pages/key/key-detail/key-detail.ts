import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the KeyDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
    segment: 'key-detail',
  })
@Component({
  selector: 'page-key-detail',
  templateUrl: 'key-detail.html',
})
export class KeyDetailPage {
  public keyUrl:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.keyUrl = this.navParams.get('keyUrl');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeyDetailPage');
  }

}
