import { Component ,Inject} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { RoomListPage } from '../room-list/room-list';
import { Items } from '../../../providers/providers';
//import { Api } from '../../../providers/api';
import { MapPage } from '../map/map';
import { ShowConfirmProvider} from '../../../providers/show-confirm/show-confirm';
import { ShowLoadingProvider} from '../../../providers/show-loading/show-loading';
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
  public api:any;
  constructor(public navCtrl: NavController,
              public items: Items,
              public modalCtrl: ModalController,
              public loading: ShowLoadingProvider,
              public confirm: ShowConfirmProvider,
              @Inject('ApiService') api) {
    this.currentItems = this.items.query();
    this.api = api;
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    // this.loading.show();
    // this.loading.show({delay: 100, duration: 100000});
    // this.loading.hide(200);
    this.api.get("queryGy/list").then( res => {
     console.info(res);
     });
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
    this.confirm.showConfirm({message: '是否跳转到地图页面'}).subscribe(result => {
      if (result === true) {
        this.navCtrl.push(MapPage);
      }
    });
  }
}
