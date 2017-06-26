import {Injectable, Injector} from '@angular/core';
import {Api} from '../api';
import {HOTEL_LIST, HOTEL_DETAIL, ROOM_DETAIL} from '../API_MARCO';
import {GeoManager} from '../geograph/geo-manager';
import {WkDate} from '../../util';
import {HotelDetail, HotelListQuery, RoomDetail} from '../index';
@Injectable()
export class HotelManager {
  constructor(private http: Api, private injector: Injector) {

  }

  public getHotelList(query: HotelListQuery = {}): Promise<{ count: number, list: any[] }> {
    const today = WkDate.getToday();
    const tomorrow = WkDate.getTomorrow();
    const curPos = this.injector.get(GeoManager).getLatitudeAndLongitude();
    const deafaultParam = {
      "beginDate": today,
      "endDate": tomorrow,
      "pageSize": 10,
      "distance": 4000,
      "longitude": curPos.Longitude,
      "latitude": curPos.Latitude,
      "queryString": "",
      "pageNo": 1,

      "areaCode": "120104"
    };
    const queryParam = {...deafaultParam, ...query};
    return this.http.httpPost(HOTEL_LIST, queryParam)
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
    });
  }

  public getRoomDetail(roomId): Promise<RoomDetail> {
    return this.http.httpPost(ROOM_DETAIL, {roomId})
      .then(res => {
        return Promise.resolve(res.datas as RoomDetail);
      });
  }
}
