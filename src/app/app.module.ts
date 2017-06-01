import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { ComponentModule } from '../components/component.module';
import { getRouter } from '../pages/router';
import { MyApp } from './app.component';
import { Api } from '../providers/api';
import { Items } from '../mocks/providers/items';
import { Settings } from '../providers/settings';
import { User } from '../providers/user';

import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
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
const routers = getRouter();
const APP_CONFIG = {
      activator: 'ripple',
      backButtonText: '',
      preloadModules: true,
      // locationStrategy: 'path',
      iconMode: 'md',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    };
export function declarations() {
  return [MyApp].concat(routers.links.map(link => link.component));
}

export function entryComponents() {
  return [MyApp].concat(routers.links.map(link => link.component));
}

export function providers() {
  return [
    Api,
    Items,
    User,
    Camera,
    GoogleMaps,
    SplashScreen,
    StatusBar,

    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

@NgModule({
  declarations: declarations(),
  imports: [
    BrowserModule,
    HttpModule,
    ComponentModule,
    IonicModule.forRoot(MyApp, APP_CONFIG, {
      links: routers.links
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  // entryComponents: [MyApp].concat(routers.links.map(link => link.component)),
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule { }
