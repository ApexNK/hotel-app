import {Component} from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'modal-city-choose',
  templateUrl: 'city-choose.html'
})
export class CityChoose {

  constructor(private viewCtrl:ViewController) {
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
