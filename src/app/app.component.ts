import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config , App, Keyboard , Events  } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import {TabsPage as FirstRunPage } from '../pages/tabs/tabs';
// import { LoginPage as FirstRunPage } from '../pages/user/login/login';

import { Settings, Toast } from '../providers';



@Component({
  template: `<div>
                <ion-nav #content [root]="rootPage"></ion-nav>
             </div>
              `
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;
  constructor(private platform: Platform, settings: Settings, private config: Config, statusBar: StatusBar, splashScreen: SplashScreen,
              private app: App, private keyboard: Keyboard,private toast:Toast, private events:Events) {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      setTimeout(() => {
        splashScreen.hide();
      }, 300);
      this.registerBackButtonAction();//注册物理回退事件
    });

  }

  private registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      debugger;
      this.events.publish('goback');
      if (this.keyboard.isOpen()) {
        this.keyboard.close();
        return;
      }

      const overlay = this.app._appRoot._overlayPortal.getActive();
      if(overlay && overlay.dismiss) {
        overlay.dismiss();
        return;
      }

      const nav = this.app.getActiveNav();
      let activeVC = nav.getActive();
      let page = activeVC.instance;

      console.log(page);

      //if (page instanceof IonTabsPage) {
       // this.app.goBack();
       // return;
     // }

      if(nav.canGoBack()){
        nav.pop();
      } else {
        if(nav.id === 't0-0'){//在首页
          this.showExit();
        }　else {
          //返回首页
          //this.app.goBack();
          nav.parent.select(0);
        }

      }
    });
  }

//双击退出提示框
  private backButtonPressed: boolean = false;
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toast.show('再按一次退出应用');
      this.backButtonPressed = true;
      setTimeout(() => { //2秒内没有再次点击返回则将触发标志标记为false
        this.backButtonPressed = false;
      }, 2000)
    }
  }
}
