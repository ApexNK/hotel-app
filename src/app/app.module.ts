import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {Storage, IonicStorageModule} from '@ionic/storage';
import {ComponentModule} from '../components/component.module';
import {PipeModule} from '../pipes/pipe.module';
import {MyApp} from './app.component';
import {LoginPage} from  '../pages/user/login/login'
import {Api} from '../providers/api';
import {Items} from '../mocks/providers/items';
import {Settings} from '../providers/settings';
import {User} from '../providers/user';

import {Camera} from '@ionic-native/camera';
// import { GoogleMaps } from '@ionic-native/google-maps';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Geolocation} from '@ionic-native/geolocation';
import { Alipay } from '@ionic-native/alipay';

// localstorage
import {LocalUserInfo} from '../LocalDatas/index';

// provides
import {LoginManagerProvider,
        UserManagerProvider,
        ShowConfirmProvider,
        ShowLoadingProvider,
        GeoManager,
        HotelManager,
        OrderManager,
        Toast} from '../providers'

import config from '../config/config';

import {TabsPage} from '../pages/tabs/tabs';
import {KeyItemComponent} from '../pages/key/key-item/key-item';
import {ListMasterPage} from '../pages/hotel/hotel-list/list-master';
import {OrderListPage} from '../pages/order/order-list/order-list'
import {UserCenterPage} from '../pages/user/user-center/user-center';

//import { PaySuccessComponent } from "../components/pay-success/pay-success";

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default user-center for your app.
   *
   * You can add new user-center options at any time. Once the user-center are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'halo ionic',
    option3: '3',
    option4: 'Hello'
  });
}


/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */

const APP_CONFIG = {
  activator: 'ripple',
  backButtonText: '',
  preloadModules: true,
  // locationStrategy: 'path',
  iconMode: 'ios',
  modalEnter: 'modal-slide-in',
  modalLeave: 'modal-slide-out',
  tabsPlacement: 'bottom',
  pageTransition: 'ios-transition'
};

export function declarations() {
  // return [MyApp].concat(routers.links.map(link => link.component));
  return [
    MyApp,
    TabsPage,
    KeyItemComponent,
    ListMasterPage,
    OrderListPage,
    UserCenterPage,
    LoginPage,

    //PaySuccessComponent
  ];
}

export function entryComponents() {
  return declarations();
}

export function providers() {
  return [
    Items,
    User,
    Camera,
    // GoogleMaps,
    SplashScreen,
    StatusBar,
    Geolocation,
    Toast,
    {provide: Settings, useFactory: provideSettings, deps: [Storage]},
    // Keep this to enable Ionic's runtime error handling during development
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //inject the apiUrl const
    {provide: 'ApiURL', useValue: config.isDev ? config.devUrl : config.proUrl},
    Api,
    {provide: 'ApiService', useClass: Api},
    LoginManagerProvider,
    ShowConfirmProvider,
    ShowLoadingProvider,
    UserManagerProvider,
    OrderManager,
    GeoManager,
    LocalUserInfo,
    HotelManager,
    Alipay
  ];
}

@NgModule({
  declarations: declarations(),
  imports: [
    BrowserModule,
    HttpModule,
    ComponentModule,
    PipeModule,
    IonicModule.forRoot(MyApp, APP_CONFIG),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule {
}
