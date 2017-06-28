import {Injectable} from '@angular/core';
import {Api} from '../api';
import {ORDER_LIST} from '../API_MARCO';
declare type OrderType = 1|2|3|4|5;
@Injectable()
export class OrderManager {
  constructor (private http: Api) {

  }
  public getOrderList (orderState: OrderType):Promise <any[]> {
    return this.http.httpPost(ORDER_LIST, {ddzt: orderState})
      .then(res => Promise.resolve(res.datas))
  }
}
