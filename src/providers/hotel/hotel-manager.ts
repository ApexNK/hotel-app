import {Injectable, Injector} from '@angular/core';
import {Api} from '../api';
import {HOTEL_LIST} from '../API_MARCO';
import {HotelListQuery} from './model/HotelListQuery';
import {GeoManager} from '../geograph/geo-manager';
@Injectable()
export class HotelManager {
  constructor(private http: Api, private injector: Injector) {

  }

  public getHotelList(query: HotelListQuery = {}): Promise<{count: number, list: any[]}> {
    const now = new Date();
    const today = this.toStringDate(now);
    const tomorrow = this.toStringDate(new Date(now.getTime() + 60 * 60 * 1000 * 24));
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
    return this.http.httpByUser(HOTEL_LIST, queryParam)
      .then(res => {
        return Promise.resolve({count: res.count, list: res.datas});
      }).catch(e => console.log(e));
  }

  private toDouble(n): string {
    return n < 10 ? `0${n}` : n.toString();
  }

  private toStringDate(time: Date) {
    return `${time.getFullYear()}-${this.toDouble(time.getMonth() + 1)}-${this.toDouble(time.getDate())}`;
  }
}
