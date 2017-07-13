import { Component , ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams ,IonicPage} from 'ionic-angular';
import {HotelDetail, HotelManager} from '../../../providers';
import { HotelMap } from "../../../models/hotelmap";

@IonicPage({
  name:"RoomListPage",
  segment: 'RoomListPage/:flatId/:beginDate/:endDate'
})
@Component({
  selector: 'room-list',
  templateUrl: 'room-list.html'
})
export class RoomListPage{
  item: any;
  public beginDate = '';
  public endDate = '';
  public id = '';
  public hotelDetail: HotelDetail;
  @ViewChild('hotelmap') mapElement: ElementRef;
  constructor(public navCtrl: NavController,
              private hotelManager:  HotelManager,
              navParams: NavParams) {
    this.id = navParams.get('flatId');
    this.beginDate = navParams.get('beginDate');
    this.endDate = navParams.get('endDate');
  }
  ionViewDidLoad() {
    this.getHotelDetail();
    // this.getHotelList();
  }

  public getHotelDetail () {
    this.hotelManager.getHotelDetail({beginDate: this.beginDate, endDate: this.endDate, flatId: this.id})
      .then((res) => {
        this.hotelDetail = res as HotelDetail;
        try{
          this.showMap({longitude:this.hotelDetail.longitude,latitude: this.hotelDetail.latitude});
        }catch (err){
           console.info(err);
        }

      });
  }
  public goRoomDetail (roomId, beginDate, endDate, fjbh) {
    this.navCtrl.push("ItemDetailPage", {
      roomId,
      beginDate,
      endDate,
      fjbh
    });
  }
  public openBaiDuMap() {
    let target = 'bdapp://map/geocoder?location=' + this.hotelDetail.latitude + ',' + this.hotelDetail.longitude;
    console.log(target);
    window.location.href = target;
  }

  private showMap (location:any) {
    let map = new HotelMap(this.mapElement.nativeElement);
    let long = location.longitude;
    let lati = location.latitude;
    map.createHotelNearbyMap(long,lati);
  }
}
