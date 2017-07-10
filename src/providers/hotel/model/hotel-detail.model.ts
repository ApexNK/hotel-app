import {RoomItem} from './room-item.model';
interface roomPicture {
  imgName?:string;//图片名称
  imgPath?:string;//图片路径
};
export interface HotelDetail {
  gymc:string; // 公寓名称
  gydz: string; //公寓地址
  gyms: string; //公寓描述
  kyfj?: RoomItem []; //房间列表
  longitude?: number;//公寓经度
  latitude?: number;//公寓纬度
  nearby?:string;//周边情况描述
  pictures?: roomPicture[];//公寓房间图片列表
}
