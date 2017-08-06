import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { Toast,ShowConfirmProvider } from '../../../providers'
/**
 * Generated class for the AboutUsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {
  public currentVersion:string;
  public latestVersion:string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private appVersion: AppVersion, private toast: Toast) {
    this.currentVersion = "1.0.0";
    this.appVersion.getVersionNumber().then( name => {
      alert('versionNumber:' + name);
      this.currentVersion = name;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
  }

  public goWokePage (){
    this.navCtrl.push("AboutWoKePage");
  }

  public updateVersion (){
    this.toast.show("已是最新版本");
  }
}
