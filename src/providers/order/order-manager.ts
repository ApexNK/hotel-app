import {Injectable} from '@angular/core';
import {Api} from '../api';
import {ORDER_LIST, ORDER_CANCEL, LEAVE_ROOM, ORDER_CANCEL_UNPAY} from '../API_MARCO';
import {OrderItem} from './model/order-item.model';
import {OrderType} from '../index';
@Injectable()
export class OrderManager {
  constructor (private http: Api) {

  }
  public getOrderList (orderState: OrderType, curPage:number = 1):Promise <{list: OrderItem[]; total:number}> {
    return this.http.httpByUser(ORDER_LIST, {ddzt: orderState, pageSize: 10, curPage})
      .then(res => Promise.resolve({list: res.datas as OrderItem[], total: Number(res.total)}))
      .catch(e => Promise.reject(e));

  }
  public cancelOrder (ddbh) {
    return this.http.httpByUser(ORDER_CANCEL, {ddbh});
  }
  public cancelUnpayOrder (ddbh) {
    return this.http.httpByUser(ORDER_CANCEL_UNPAY, {ddbh});
  }
  public leaveRoom (ddbh) {
    return this.http.httpByUser(LEAVE_ROOM, {ddbh});
  }
}
