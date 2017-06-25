import {Injectable} from '@angular/core';
import {Api} from '../api';
@Injectable()
export class GeoManager {
  constructor(private http: Api) {

  }

  public getLatitudeAndLongitude(): {
    Latitude: number;
    Longitude: number
  } {
    // return {
    //   Latitude: 23.2922 ,
    //   Longitude: 39.542637
    // };
    return {
      Latitude: 39.913673,
      "Longitude": 116.330696
    }
  }
}
