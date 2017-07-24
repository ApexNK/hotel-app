import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HotelManager} from '../../../providers/hotel/hotel-manager';
import {MapQueryResult} from '../../../providers/hotel/model/map-hotel.model';
import {HotelMap} from "../../../models/hotelmap";
import {Geolocation} from '@ionic-native/geolocation';

/**
 * Generated class for the HotelMapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment: 'HotelMapPage',
  name: 'HotelMapPage'
})
@Component({
  selector: 'page-hotel-map',
  templateUrl: 'hotel-map.html',
})
export class HotelMapPage {
  @ViewChild('map') mapElement: ElementRef;
  showHeader: boolean = true;
  private queryStr: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private geolocation: Geolocation,
              private hotelSer: HotelManager) {
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

  public searchHotels(query) {
    this.queryStr = query;
    this.showMap();
  }


  async showMap() {
    let map = new HotelMap(this.mapElement.nativeElement);
    // map.testVal.subscribe(data => {
    //   console.log('---' + data);
    // });
    let param = this.navParams.get('queryParam');
    param.queryString = this.queryStr;
    let hotelListInfo: MapQueryResult[] = await this.hotelSer.getMapHotelList(param);
    console.log(hotelListInfo);
    /*    this.geolocation.getCurrentPosition().then( (location:any) => {
     let long = location.coords.longitude;
     let lati = location.coords.latitude;
     console.info('long:' + long);
     map.createMapByCoordinate(long,lati);
     map.customMark(long,lati,"¥162起 | 32套");
     }).catch((error) => {
     console.info('error:'+ error.toString());
     });*/
    map.getCurrentCity();
    map.createMapByCity("北京");
    hotelListInfo.forEach(hotelItem => {
      map.customMark(hotelItem.longitude, hotelItem.latitude, hotelItem.id.toString(), `¥${hotelItem.minPrice}起 | ${hotelItem.availableRooms}套`)
    });
  }

  getCurrentPosition() {
    return this.geolocation.getCurrentPosition().then((resp) => {
      console.info(resp);
      return {latitude: resp.coords.latitude, longitude: resp.coords.longitude};
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
