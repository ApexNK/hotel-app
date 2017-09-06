import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

import { Api } from './api';

@Injectable()
export class MapServer {
  private currentLocation = {};
  private currentCity = {};

  constructor(private api: Api, private geolocation: Geolocation) {
  }

  //入参long为经度 lati为纬度
  public getCityByLocation(lati,long){
    let params = {
      ak : 'I6qKjXgv6l10WynfjsMIqt3GqeZD7IOD',
      location:"",
      output:'json',
      posi:0//是否显示周边的poi
    };
    params.location = lati + ',' + long;
    console.info(params);
    let self = this;
    if(this.currentCity['cityCode']){
      return Promise.resolve(this.currentCity);
    }
    return new Promise(function (resolve,reject) {
      self.api.httpGet('http://api.map.baidu.com/geocoder/v2/',params).then(
        res => {
          if(res.status === 0) {
            self.currentCity = {city:res.result.addressComponent.city,adcode:res.result.addressComponent.adcode,cityCode:res.result.cityCode};
            resolve(self.currentCity);
          }else{
            resolve({city:'北京市', adcode:'110100',cityCode:'131'});//39.929986,116.395645
          }

        }, err => {
           resolve({city:'北京市', adcode:'110100',cityCode:'131'});//39.929986,116.395645
        }
      )
    });

   //http://api.map.baidu.com/geocoder/v2/?ak=I6qKjXgv6l10WynfjsMIqt3GqeZD7IOD&location=32.130975,118.89201&output=json&pois=1
  }

  public getCurrentLocation(){
    if(this.currentLocation['lati']){
      return Promise.resolve(this.currentLocation);
    }
    let self = this;

    return new Promise( function(reslove, reject){
      try {
        self.geolocation.getCurrentPosition().then((resp) => {
          // resp.coords.latitude
          // resp.coords.longitude
          if(!!resp){
            //alert(' geolocation latitude' + resp.coords.latitude);
            //alert(' geolocation longitude' + resp.coords.longitude);
            reslove({lati:resp.coords.latitude,long:resp.coords.longitude});
          }
        }).catch((error) => {
          alert('Error getting location'+ error);
          reslove({lati:39.915098,long:116.40398});
        });
      }catch (err) {
        reslove({lati:39.915098,long:116.40398});
      };
    });
  }

  public getCityCenterLocation(name){
    let params = {
      ak : 'I6qKjXgv6l10WynfjsMIqt3GqeZD7IOD',
      address:"",
      output:'json',
      city:""
    };
    params.address = name;
    params.city = name;
    console.info(params);
    let self = this;
    return new Promise(function (resolve,reject) {
      self.api.httpGet('http://api.map.baidu.com/geocoder/v2/',params).then(
        res => {
          if(res.status === 0) {
            resolve({lati:res.result.location.lat,long:res.result.location.lng});
          }else{
            resolve({lati:39.92998577808024,long:116.39564503787867});//北京中心点坐标
          }

        }, err => {
          resolve({lati:39.92998577808024,long:116.39564503787867});//北京中心点坐标
        });
        });
  }
}
