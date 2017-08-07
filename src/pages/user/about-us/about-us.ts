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
  public hasNewVersion = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: Toast, private updateServer:UpdateVersionServer) {
    this.getVersionInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
  }

  private getVersionInfo() {
    Promise.all([this.updateServer.getCurrentVersionName(),this.updateServer.getLatestVersionName()]).then(
      versions => {
        this.currentVersion = versions[0];
        this.latestVersion = versions[1];
        this.hasNewVersion = this.updateServer.latestVersionLargerThanNow(this.currentVersion,this.latestVersion);
      }
    )
  }
  public goWokePage (){
    this.navCtrl.push("AboutWoKePage");
  }

  public updateVersion (){
    if(this.hasNewVersion){
      this.updateServer.checkVersion();
    }else{
      this.toast.show("已是最新版本");
    }
  }
}
