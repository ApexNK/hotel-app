import {Injectable} from '@angular/core';
import {Api} from '../api';
import {HOTEL_LIST, HOTEL_DETAIL, ROOM_DETAIL, ORDER_ROOM, AREA_LIST} from '../API_MARCO';
import {WkDate} from '../../util';
import {HotelDetail, HotelListQuery, RoomDetail} from '../index';
@Injectable()
export class HotelManager {
  constructor(private http: Api) {

  }

  public getHotelList(query: HotelListQuery = {}): Promise<{ count: number, list: any }> {
    const today = WkDate.getToday();
    const tomorrow = WkDate.getTomorrow();
    const deafaultParam = {
      "beginDate": today,
      "endDate": tomorrow,
      "pageSize": 10,
      "distance": '100000000',
      "longitude": 39.913673,
      "latitude": 116.330696,
      "queryString": "",
      "pageNo": 1,
      "hasRoom": ''
    };
    const queryParam = {...deafaultParam, ...query};
    let param = {};
    for(let k in queryParam){
      if( k === 'distance'){
        param['distance'] = parseInt(queryParam.distance);
      }else{
        param[k] = queryParam[k];
      }
    }

    return this.http.httpPost(HOTEL_LIST, param)
      .then(res => {
        return Promise.resolve({count: res.count, list: res.datas});
      }).catch(e => console.log(e));
  }

  public getHotelDetail(query: {
    flatId: string;
    beginDate: string;
    endDate: string;
  }): Promise<HotelDetail> {
    return this.http.httpPost(HOTEL_DETAIL, query).then(res => {
      return Promise.resolve(res.datas as HotelDetail);
    }).catch( e => console.info(e));
  }

  public getRoomDetail(roomId): Promise<RoomDetail> {
    return this.http.httpPost(ROOM_DETAIL, {roomId})
      .then(res => {
        return Promise.resolve(res.datas as RoomDetail);
      }).catch(err => console.info(err));
  }
  public reservationRoom (param: {
    fjbh: string;
    // sjhm: string;
    kssj: string;
    jssj: string;
    zfzj: number;
    yhqid?: number;
  }): Promise<string> {
    return this.http.httpByUser(ORDER_ROOM, param)
      .then(res => {
        return Promise.resolve(res.ddbh)
      }).catch(e => Promise.reject(e));
  }

  public getAreaList(areaCode: string = '0'):Promise<any> {
    return this.http.httpPost(AREA_LIST,{cityCode:131}).then(res => {
      return Promise.resolve(res.datas);
    });

/*    return this.http.httpPost(AREA_LIST,{cityCode:131}).then(res => {
      return this.http.httpPost(AREA_LIST,{areaCode:res.datas[0].cityCode}).then(res => {
        return Promise.resolve(res.datas);
      });
    });*/
  }
}
