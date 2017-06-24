import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { Items } from '../../../providers/providers';

@IonicPage({
  segment: 'item-detail'
})
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  public startDate = '2017-05-27';
  public endDate = '2017-06-01';
  constructor(public navCtrl: NavController, navParams: NavParams, items: Items) {
    this.item = navParams.get('item') || items.defaultItem;
  }
  public goPay () {
    this.navCtrl.push('OrderPayPage',{startDate:this.startDate,endDate:this.endDate, days:1, total: 80});
  }
}
