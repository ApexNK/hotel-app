
declare var BMap;
declare var BMap_Symbol_SHAPE_FORWARD_CLOSED_ARROW;

export class HotelMap {

  container: string;
  map: any;

  constructor(container: string) {
      this.container = container;
      this.map = null;
  }

  createMapInstance(): void {
    this.map = this.map || new BMap.map(this.container, { enableMapClick: true });
    this.map.enableScrollWheelZoom();//启动滚轮放大缩小，默认禁用
    this.map.enableContinuousZoom();//连续缩放效果，默认禁用
  }

  createMapByCity(city:string): void {
    this.createMapInstance ();
    this.map.centerAndZoom(city,15);
  }

  createMapByCoordinate(longitude:number, latitude:number): void {
    this.createMapInstance ();
    let point = new BMap.Point(longitude, latitude);// 创建点坐标
    this.map.centerAndZoom(point,15);//设置中心和地图显示级别
  }

  markLocation(): void {
    let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition((position)=>{
      //0代表调用成功，具体状态可见百度地图api
    if(geolocation.getStatus() == 0){
      //经度
      let longitude =position.longitude;
      //纬度
      let latitude = position.latitude;
      let pPoint = new BMap.Point(longitude,latitude);
      let heading = 0;
      if(position.heading !=null && position.heading != ''){
        heading = position.heading;
      }
      let icon = new BMap.Symbol(BMap_Symbol_SHAPE_FORWARD_CLOSED_ARROW, {
        scale: 2,
        strokeWeight: 1,
        rotation: heading,//顺时针旋转30度
        fillColor: '#1794f6',
        fillOpacity: 0.8
      });
      this.map = this.map || new BMap.map(this.container);
      let marker = new BMap.Marker(pPoint,{icon:icon});  // 创建标注
      this.map.addOverlay(marker);

    }else {
      console.log(position);
    }
  });
  }
}

