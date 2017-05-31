import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelMap } from "../../../models/hotelmap";

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  ionViewWillEnter() {
    let map = new HotelMap(this.mapElement.nativeElement);
    map.createMapByCity("北京");
  }
}
