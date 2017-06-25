import {Component, Inject} from '@angular/core';
import {NavController, ModalController, IonicPage} from 'ionic-angular';
import {WkDate} from '../../../util';
import {Items} from '../../../providers/providers';
//import { Api } from '../../../providers/api';
import {ShowConfirmProvider, HotelManager, ShowLoadingProvider, HotelItem} from '../../../providers/index';
import {Item} from '../../../models/item';


// @IonicPage({
//   name:"RoomListPage",
//   segment: 'RoomListPage'
// })
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  public areaCode = '120104';
  public today = WkDate.getToday();
  public startDate = WkDate.getToday();
  public endDate = WkDate.getTomorrow();
  public isBannerOpening = true;
  public days = 1;
  public api: any;
  public hotelList: HotelItem[] = [];
  public queryKeyWord = '';
  public curHotelListPage = 1;
  public notLoadOver = true;
  private curStartDate: string;
  private curEndDate: string;
  private curKeyWord = '';
  private curAreaCode = '120104';
  constructor(public navCtrl: NavController,
              public items: Items,
              public modalCtrl: ModalController,
              public loading: ShowLoadingProvider,
              private hotelManger: HotelManager,
              public confirm: ShowConfirmProvider,
              @Inject('ApiService') api) {
    this.currentItems = this.items.query();
    this.api = api;
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.searchHotel();
    // this.getHotelList();
  }

  public getHotelList($event?) {
    return this.hotelManger
      .getHotelList(
        {pageNo: this.curHotelListPage,
          beginDate: this.curStartDate,
          endDate: this.curEndDate,
          queryString: this.curKeyWord
        }
      )
      .then((res) => {
        if (res.list.length) {
          this.hotelList = [...this.hotelList, ...res.list];
          this.curHotelListPage++;
        }
        if (this.hotelList.length >= res.count) {
          this.notLoadOver = false;
        }
        return Promise.resolve(true);
      });
  }

  public toggleBanner() {
    this.isBannerOpening = !this.isBannerOpening;
  }

  public searchHotel() {
    this.resetQuery();
    this.getHotelList();
  }
  private resetQuery () {
    this.days = WkDate.getDays(new Date(this.endDate), new Date(this.startDate));
    this.hotelList = [];
    this.curStartDate = this.startDate;
    this.curEndDate = this.endDate;
    this.curHotelListPage = 1;
    this.notLoadOver = true;
    this.curKeyWord = this.queryKeyWord;
    this.curAreaCode = this.areaCode;
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
    this.navCtrl.push("RoomListPage", {
      item: item
    });
  }

  openMap() {
    /*    this.api.wkHttp({
     servicekey: "mem-0003",
     parameter:{sjhm:"15850591859"}
     }).then( res => {console.info(res)});*/
    this.navCtrl.push("HotelMapPage");
    /*    this.confirm.showConfirm({message: '是否跳转到地图页面'}).subscribe(result => {
     if (result === true) {

     }
     });*/
  }


}
