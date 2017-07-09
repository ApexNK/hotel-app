import {Component, Inject} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {WkDate} from '../../../util';
import {CityChoose} from '../modal/city-choose';

import {ShowConfirmProvider, HotelManager, ShowLoadingProvider, HotelItem, MapServer} from '../../../providers';

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  public currentCity = {
    name:"北京",
    id:'110000',
    cityCode:131,
    lati:39.915098,
    long:116.40398
  };
  public areaCode = '110000';
  public area = {id: '110000', text: '全城'};//城市区域
  public distance: string = '1000000'; //距离
  public houseResource: string = ''; //房源
  public areaList: Array<any>;
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
  private curAreaCode = '110000';
  public showHeader = true;
  private centerLocation = {
    lati:39.913673,
    long:116.40398
  };

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public loading: ShowLoadingProvider,
              private hotelManger: HotelManager,
              public confirm: ShowConfirmProvider,
              @Inject('ApiService') api,
              private mapServer: MapServer) {

    this.api = api;
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.getCurrentCityHotels();
    this.getAreaList();
  }

  ionViewWillLeave() {
    this.showHeader = false;
  }

  ionViewWillEnter() {
    this.showHeader = true;
  }

  public async getHotelList(center) {
    return this.hotelManger
      .getHotelList(
        {
          pageNo: this.curHotelListPage,
          beginDate: this.curStartDate,
          endDate: this.curEndDate,
          queryString: this.curKeyWord,
          distance: this.distance,//距离
          longitude: center['long'],
          latitude: center['lati'],
          hasRoom: this.houseResource
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

  private async getCurrentCityHotels(){
    this.centerLocation = await this.getLocation();
    this.searchHotel(this.centerLocation);
  }

  private getLocation() {
    let targetLoca = {
      lati: 39.913673,
      long: 116.330696
    };
    return this.mapServer.getCurrentLocation().then(loc => {
      console.info(loc);
      targetLoca.lati = loc['lati'];
      targetLoca.long = loc['long'];
      return this.mapServer.getCityByLocation(loc['lati'], loc['long']);
    }).then(city => {
      if (city['cityCode'] === '131') { //当前位置在北京地区
        return targetLoca;
      } else {
        targetLoca.lati = this.currentCity.lati;
        targetLoca.long = this.currentCity.long;
        return targetLoca; //不在北京，将北京的中心点位置返回
      }
    });


  }

  public toggleBanner() {
    this.isBannerOpening = !this.isBannerOpening;
  }

  public searchHotelByKey() { //输入关键字搜索
    this.resetQuery();
    this.curKeyWord = this.queryKeyWord;
    this.distance = '1000000';//默认为最大距离
    this.houseResource = '';//全部房源
    this.getHotelList(this.centerLocation);
  }

  public updateHotelsByChange(type){ //select option has changed
    this.resetQuery();
    let center = {
      lati:39.913673,
      long:116.40398
    };
    if(this.area.id === this.currentCity.id){
      center = this.centerLocation;
    }else{
      for(let i = 0,length = this.areaList.length; i < length; i++){
        if(this.area.id === this.areaList[i].id){
          center['long'] = this.areaList[i].longitude;
          center['lati'] = this.areaList[i].latitude;
          break;
        }
      }
    }
    this.getHotelList(center);
  }

  public searchHotel(center) {
    this.resetQuery();
    this.getHotelList(center);
  }

  public cityChoose(){
    let cityChooseModal = this.modalCtrl.create(CityChoose);
    cityChooseModal.present();
  }

  private resetQuery() {

    this.hotelList = [];
    this.curStartDate = this.startDate;
    this.curEndDate = this.endDate;
    this.curHotelListPage = 1;
    this.notLoadOver = true;
    this.curKeyWord = '';
    this.curKeyWord = '';
    //this.curAreaCode = this.areaCode;
  }

  public beginDateChange(beginDate) {
    this.startDate = beginDate;
    this.getDays();
    if(this.days < 1){
      this.endDate = WkDate.getFutureDay(1,new Date(this.startDate));
      this.days = 1;
    }
    this.curStartDate = this.startDate;
    this.curEndDate = this.endDate;
  }

  public endDateChange(endDate) {
    this.endDate = endDate;
    this.getDays();
    if(this.days < 1){
      this.startDate = WkDate.getFutureDay(-1,new Date(this.endDate));
      this.days = 1;
    }
    this.curStartDate = this.startDate;
    this.curEndDate = this.endDate;
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
    console.log(this.areaList);
  }
}
