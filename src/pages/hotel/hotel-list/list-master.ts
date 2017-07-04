import {Component, Inject} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {WkDate} from '../../../util';

import {ShowConfirmProvider, HotelManager, ShowLoadingProvider, HotelItem} from '../../../providers';

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  public areaCode = '120104';
  public areaList;
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
  public showHeader = true;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public loading: ShowLoadingProvider,
              private hotelManger: HotelManager,
              public confirm: ShowConfirmProvider,
              @Inject('ApiService') api) {

    this.api = api;
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.searchHotel();
    this.getAreaList();
    // this.getHotelList();
  }

  ionViewWillLeave() {
    this.showHeader = false;
  }

  ionViewWillEnter () {
    this.showHeader = true;
  }

  public getHotelList($event?) {
    return this.hotelManger
      .getHotelList(
        {
          pageNo: this.curHotelListPage,
          beginDate: this.curStartDate,
          endDate: this.curEndDate,
          queryString: this.curKeyWord
        }
      )
      .then((res) => {
        try {
          let hotels = res.list.flats;
          let count = res.list.count;
          if (hotels.length) {
            this.hotelList = [...this.hotelList, ...hotels];
            this.curHotelListPage++;
          }
          if (this.hotelList.length >= count) {
            this.notLoadOver = false;
          }
          return Promise.resolve(true);
        } catch (err) {
          return Promise.reject(err);
        }
      });
  }

  public toggleBanner() {
    this.isBannerOpening = !this.isBannerOpening;
  }

  public searchHotel() {
    this.resetQuery();
    this.getHotelList();
  }

  private resetQuery() {

    this.hotelList = [];
    this.curStartDate = this.startDate;
    this.curEndDate = this.endDate;
    this.curHotelListPage = 1;
    this.notLoadOver = true;
    this.curKeyWord = this.queryKeyWord;
    this.curAreaCode = this.areaCode;
  }

  public beginDateChange(beginDate) {
    this.startDate = beginDate;
    this.getDays();
  }

  public endDateChange(endDate) {
    this.endDate = endDate;
    this.getDays();
  }

  public getDays() {
    this.days = WkDate.getDays(new Date(this.endDate), new Date(this.startDate));
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(id) {
    this.navCtrl.push("RoomListPage", {
      flatId: id,
      beginDate: this.curStartDate,
      endDate: this.curEndDate
    });
  }

  openMap() {
    //this.navCtrl.push('ApplyRefundPage');
    /*    this.api.wkHttp({
     servicekey: "mem-0003",
     parameter:{sjhm:"15850591859"}
     }).then( res => {console.info(res)});*/
    this.navCtrl.push("HotelMapPage");
    /*    this.confirm.showConfirm({message: '是否跳转到地图页面'}).subscribe(result => {
     if (result === true) {

     }
     });*/

    /*    Wechat.share({
     text: "This is just a plain string",
     scene: Wechat.Scene.TIMELINE   // share to Timeline
     }, function () {
     alert("Success");
     }, function (reason) {
     alert("Failed: " + reason);
     });*/
  }
  private async getAreaList() {
    this.areaList = await this.hotelManger.getAreaList();
}
}
