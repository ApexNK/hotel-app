import { Component , ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HotelMap } from "../../models/hotelmap";
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the HotelMapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment: 'hotel-map'
})
@Component({
  selector: 'page-hotel-map',
  templateUrl: 'hotel-map.html',
})
export class HotelMapPage {
  @ViewChild('map') mapElement: ElementRef;
  showHeader: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelMapPage');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
    this.showHeader = false;
  }

  ionViewDidLeave() {
    console.info('ionViewDidLeave');
  }

  ionViewWillEnter() {
    this.showMap();
  }

  showMap () {
    let map = new HotelMap(this.mapElement.nativeElement);
    /*    this.geolocation.getCurrentPosition().then( (location:any) => {
     let long = location.coords.longitude;
     let lati = location.coords.latitude;
     console.info('long:' + long);
     map.createMapByCoordinate(long,lati);
     map.customMark(long,lati,"¥162起 | 32套");
     }).catch((error) => {
     console.info('error:'+ error.toString());
     });*/
    /*    if (baidu_location) {
     baidu_location.getCurrentPosition(function (result) {
     console.log(JSON.stringify(result, null, 4));
     console.info(result);
     let long = result.lontitude;
     let lati = result.latitude;
     console.info('long:' + long);
     map.createMapByCoordinate(long,lati);
     map.customMark(long,lati,"¥162起 | 32套");

     }, function (error) {
     });
     }else{
     map.createMapByCity("北京");
     map.markLocation();
     }*/
    map.createMapByCity("北京");
    map.markLocation();
  }

  getCurrentPosition() {
    return this.geolocation.getCurrentPosition().then((resp) => {
      console.info(resp);
      return {latitude:resp.coords.latitude,longitude:resp.coords.longitude};
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  watchPosition() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }
}
