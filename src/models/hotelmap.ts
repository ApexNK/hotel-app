
declare var BMap;
declare var BMap_Symbol_SHAPE_FORWARD_CLOSED_ARROW;
declare var BMAP_STATUS_SUCCESS;


class CustomOverlay {
  point: typeof BMap.Point;
  content: string;
  map: any;
  div: any;
  arrow: any;
  __proto__: any;

  constructor(point: typeof BMap.Point, content: string) {
    //super(point,content);
    this.point = point;
    this.content = content;
    this.__proto__ = new BMap.Overlay();
    this.__proto__.initialize = (map) => {
      this.map = map;
      let div = this.div = document.createElement("div");
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this.point.lat);
      div.style.backgroundColor = "#4dbada";
      div.style.border = "1px solid";
      div.style.borderRadius = "10px";
      div.style.color = "white";
      div.style.height = "24px";
      div.style.padding = "2px 5px";
      div.style.lineHeight = "18px";
      div.style.whiteSpace = "nowrap";
      div.style.fontSize = "12px";
      let span = document.createElement("span");
      div.appendChild(span);
      span.appendChild(document.createTextNode(this.content));

      let arrow = this.arrow = document.createElement("div");
      arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
      arrow.style.position = "absolute";
      arrow.style.width = "11px";
      arrow.style.height = "10px";
      arrow.style.top = "22px";
      arrow.style.left = "10px";
      arrow.style.overflow = "hidden";
      arrow.style.backgroundPosition = "0px -20px";
      div.appendChild(arrow);

      // 将div添加到覆盖物容器中
      map.getPanes().labelPane.appendChild(div);

      return div;
    };
    this.__proto__.draw = () => {
      let pixel = this.map.pointToOverlayPixel(this.point);
      this.div.style.left = pixel.x - parseInt(this.arrow.style.left) + "px";
      this.div.style.top  = pixel.y - 30 + "px";
    };
  }

}

export class HotelMap {

  container: string;
  map: any;

  constructor(container: string) {
      this.container = container;
      this.map = null;
  }

  createMapInstance(): void {
    this.map = this.map || new BMap.Map(this.container, { enableMapClick: true });
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
    if(geolocation.getStatus() == BMAP_STATUS_SUCCESS){
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
      this.createMapInstance();
      let marker = new BMap.Marker(position.point,{icon:icon});  // 创建标注
      this.map.addOverlay(marker);
      this.map.panTo(position.point);

    }else {
      console.log(position);
    }
   });
  }

  customMark(longitude:number, latitude:number, content?:string):void {
    let myCompOverlay = new CustomOverlay(new BMap.Point(longitude,latitude), content);
    this.map.addOverlay(myCompOverlay);
  }


}

