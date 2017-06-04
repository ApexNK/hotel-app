import { Component, ViewChild, ElementRef} from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { HotelMap } from "../../../models/hotelmap";
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  ionViewWillEnter() {
    this.showMap();
  }

  showMap () {
    let map = new HotelMap(this.mapElement.nativeElement);
    this.getCurrentPosition().then( (location:any) => {
      map.createMapByCoordinate(location.longitude,location.latitude);
      map.customMark(location.longitude,location.latitude,"¥162起 | 32套");

    });
    //map.createMapByCity("北京");
    //map.markLocation();

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

