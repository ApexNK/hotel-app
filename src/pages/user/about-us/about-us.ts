import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { Toast,UpdateVersionServer } from '../../../providers'
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: Toast, private updateServer:UpdateVersionServer) {
    this.updateServer.getCurrentVersionName().then( name => {
      this.currentVersion = name;
    });
    this.updateServer.getLatestVersionName().then( name => {
      this.latestVersion = name;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
  }

  public goWokePage (){
    this.navCtrl.push("AboutWoKePage");
  }

  public updateVersion (){
    if(this.updateServer.latestVersionLargerThanNow(this.currentVersion,this.latestVersion)){
      this.updateServer.checkVersion();
    }else{
      this.toast.show("已是最新版本");
    }
  }
}
