
import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version';
import { ShowConfirmProvider } from './show-confirm/show-confirm';

@Injectable()
export class UpdateVersionServer {
  private latestVersion = {};
  private currentVersion:string;
  constructor(private appVersion:AppVersion, private confirmView:ShowConfirmProvider) {
  }

  public checkVersion(){
    var self = this;
    Promise.all([this.getCurrentVersionName(),this.getLatestVersionName()]).then(
      versions => {
        // alert("version " + JSON.stringify(versions));
        let hasLatestVersion = self.latestVersionLargerThanNow(versions[0],versions[1]);
        if(!hasLatestVersion){
          return;
        }
        let param = {
          title:"版本升级",
          message: "最新版本"+self.latestVersion['name'],
          okText: "立即升级",
          cancelText: "暂不升级"
        }
        self.confirmView.show(param).then( isOkay => {
          if(!isOkay){
            // alert("不升级");
            return;
          }
          alert("升级处理逻辑,正在开发中");
          this.downloadApk();
        });
      }
    )
  }

  public latestVersionLargerThanNow(curVer, latestVer) {
    const curVerList = curVer.split('.');
    const latestVerList = latestVer.split('.');
    const codeBase = [10000,100,1];
    let curCode = 0;
    let latestCode = 0;
    for (let i = 0; i < 3 && i < curVerList.length && i < latestVerList.length; i++) {
      curCode += (parseInt(curVerList[i]) || 0)*codeBase[i];
      latestCode += (parseInt(latestVerList[i]) || 0)*codeBase[i];
    }
    return (latestCode > curCode);
  }

  public getCurrentVersionName() {
    if( this.currentVersion ){
      return Promise.resolve(this.currentVersion);
    }
    return this.appVersion.getVersionNumber().then( name => {
      this.currentVersion = name;
      return name;
    });

  }

  public getLatestVersionName() {
    if(this.latestVersion && this.latestVersion['name']){
      return Promise.resolve(this.latestVersion['name']);
    }
    this.latestVersion['name'] = '1.0.0';
    return Promise.resolve('1.0.0')
  }

  private downloadApk() {
    let apiUrl = "http://www.51hawk.com/fx/site/";
    (<any>window).YbUpdate.start([{
      downLoadUrl: apiUrl + "Home/AppDownload?appType=1",
      installNow: true
    }]);

  }
}

