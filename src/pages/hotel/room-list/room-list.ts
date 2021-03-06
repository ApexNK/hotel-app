import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams, IonicPage, ActionSheetController, Platform} from 'ionic-angular';
import {HotelDetail, HotelManager,Toast } from '../../../providers';
import {HotelMap} from "../../../models/hotelmap";

declare const window: Window;

@IonicPage({
  name: "RoomListPage",
  segment: 'RoomListPage/:flatId/:beginDate/:endDate'
})
@Component({
  selector: 'room-list',
  templateUrl: 'room-list.html'
})
export class RoomListPage {
  item: any;
  public beginDate = '';
  public endDate = '';
  public id = '';
  public hotelDetail: HotelDetail;
  @ViewChild('hotelmap') mapElement: ElementRef;

  constructor(public navCtrl: NavController,
              private hotelManager: HotelManager,
              public platform: Platform,
              private actionSheetCtrl: ActionSheetController,
              private navParams: NavParams,private toast: Toast) {
    this.id = navParams.get('flatId');
    this.beginDate = navParams.get('beginDate');
    this.endDate = navParams.get('endDate');
  }

  ionViewDidLoad() {
    this.getHotelDetail();
    // this.getHotelList();
  }

  public getHotelDetail() {
    this.hotelManager.getHotelDetail({beginDate: this.beginDate, endDate: this.endDate, flatId: this.id})
      .then((res) => {
        this.hotelDetail = res as HotelDetail;
        try {
          this.showMap({longitude: this.hotelDetail.longitude, latitude: this.hotelDetail.latitude});
        } catch (err) {
          console.info(err);
        }

      });
  }

  public goRoomDetail(roomId, beginDate, endDate, fjbh) {
    this.navCtrl.push("ItemDetailPage", {
      roomId,
      beginDate,
      endDate,
      fjbh
    });
  }

  public openBaiDuMap() {
    let appSrc = 'com.woke.app';
    let baiduTarget = 'bdapp://map/geocoder?location=' + this.hotelDetail.latitude + ',' + this.hotelDetail.longitude + '&src=' + appSrc;
    let gaoDeTarget = 'androidamap://navi?sourceApplication=' + appSrc + '&amp;lat='+this.hotelDetail.latitude+'&amp;lon='+this.hotelDetail.longitude+'&amp;dev=1&amp;style=2';
    let iosBaiduMap = 'baidumap://map/geocoder?location=' + this.hotelDetail.latitude + ',' + this.hotelDetail.longitude + '&src=' + appSrc;;
    let iosGaodeMap = 'iosamap://navi?sourceApplication=' + appSrc + '&amp;lat='+this.hotelDetail.latitude+'&amp;lon='+this.hotelDetail.longitude+'&amp;dev=1&amp;style=2';;
    if(this.platform.is('ios')){
      baiduTarget = iosBaiduMap;
      gaoDeTarget = iosGaodeMap;
    }
    let actionSheet = this.actionSheetCtrl.create({
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: '百度地图',
          role: 'destructive',
          handler: () => {
            console.log(baiduTarget);
            window.open(baiduTarget);
          }
        },
        {
          text: '高德地图',
          handler: () => {
            window.open(gaoDeTarget);

          }
        },
        {
          text: '取消',
          role: 'cancel', // will always sort to be on the bottom
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  public openDate () {
    this.toast.show("请在首页选择入住和离开时间");
  }

  private showMap(location: any) {
    let map = new HotelMap(this.mapElement.nativeElement);
    let long = location.longitude;
    let lati = location.latitude;
    map.createHotelNearbyMap(long, lati);
  }
}
