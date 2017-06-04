import { Component ,Inject} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { RoomListPage } from '../room-list/room-list';
import { Items } from '../../../providers/providers';
import { MapPage } from '../map/map';

import { Item } from '../../../models/item';



@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  public curAddress = 'nes';
  public startDate = '2017-05-27';
  public endDate = '2017-06-01';
  public isBannerOpening = true;
  private api:any;
  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, @Inject('Api') api) {
    this.currentItems = this.items.query();
    this.api = api;
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    //this.api.get("test");
  }

  public toggleBanner () {
    this.isBannerOpening = !this.isBannerOpening;
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(RoomListPage, {
      item: item
    });
  }

  openMap() {
    console.info("open map page");
    this.navCtrl.push(MapPage);
  }
}
