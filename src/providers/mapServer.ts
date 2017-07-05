import { Injectable } from '@angular/core';


import { Api } from './api';

@Injectable()
export class MapServer {
  private currentLocation = {};
  private currentCity = {};

  constructor(private api: Api) {
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
        if (baidu_location) {
          baidu_location.getCurrentPosition(function (result) {
            console.log(JSON.stringify(result, null, 4));
            console.info(result);
            let long = result.lontitude;
            let lati = result.latitude;
            console.info('long:' + long);
            self.currentLocation = {lati,long};
            alert(JSON.stringify(self.currentLocation));
            reslove(self.currentLocation)

          }, function (error) {
          });
        }
      }catch (err) {
        setTimeout( function () {
          let geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition((position)=>{
            //0代表调用成功，具体状态可见百度地图api
            if(geolocation.getStatus() == BMAP_STATUS_SUCCESS){
              self.currentLocation = {lati:position.latitude,long:position.longitude};
              reslove(self.currentLocation);
            }else {
              console.log(position);
            }
          });
        },3000);

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
