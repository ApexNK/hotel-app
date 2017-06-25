import {RoomItem} from './RoomItem';
export interface HotelDetail {
  gymc:string; // 公寓名称
  gydz: string; //公寓地址
  gyms: string; //公寓描述
  kyfj: RoomItem []; //房间列表
}
