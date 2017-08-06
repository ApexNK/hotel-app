import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import {ORDER_STATE_ENUM, OrderManager, OrderItem, Toast} from '../../../providers';
// import { ItemDetailPage } from '../hotel/room-detail/item-detail';
import { ShowConfirmProvider } from '../../../providers/show-confirm/show-confirm';

@Component({
  selector: 'order-list',
  templateUrl: 'order-list.html'
})
export class OrderListPage {
  public readonly ORDER_ENUM = ORDER_STATE_ENUM;
  public orderItems: OrderItem[] = [];
  public curTab = ORDER_STATE_ENUM.WAIT_PAY;
  public curPage = 1;
  public notLoadOver = true;
  constructor(public navCtrl: NavController, private orderManager: OrderManager,
              navParams: NavParams,private events:Events, private confirmCtrl: ShowConfirmProvider,private toast:Toast) {
    events.subscribe('updateOrder',(tabName)=>{
      setTimeout( (function () {
        console.info("update order");
        if(tabName && tabName !== this.curTab){
          this.curTab = tabName;
        }else{
          this.tabChange();
        }
      }).bind(this),1000);

    })
  }
  ionViewDidLoad() {
    this.getOrder();
    // this.getHotelList();
  }

  ionViewWillEnter () {
    //this.getOrder();
  }

  public goPay (orderNo,index) {
    this.navCtrl.push('OrderPayPage',{orderNo});
  }

  public cancelOrder(ddbh, index) {
    this.confirmCtrl.show({message:"请确认是否申请退订",okText:"确定", cancelText:"取消"}).then(
      result => {
        if(result){
          this.applyCancelOrder(ddbh,index);
        }
      });
  }

  public async applyCancelOrder (ddbh, index) {
    try {
      let result = await this.orderManager.cancelOrder(ddbh);
      this.toast.show(result.message);
      if( result.code === '0'){
        this.orderItems.splice(index,1);
      }
    }catch (e) {
      console.error(e);
      this.toast.show("出错了，请稍后再试");
    }
  }
  public leaveRoom (ddbh, index) {
    this.confirmCtrl.show({message:"请确认是否提交退房申请",okText:"确定", cancelText:"取消"}).then(
      result => {
        if(result){
          this.applyToleave(ddbh,index);
        }
      }
    );

  }
  private async applyToleave(ddbh, index) {
    try {
      let result = await this.orderManager.leaveRoom(ddbh);
      this.toast.show(result.message);
      if( result.code === '0'){
        this.orderItems.splice(index,1);
      }

    }catch (e) {
      console.error(e);
      this.toast.show("出错了，请稍后再试");
    }
  }

  public tabChange () {
    console.info('tab changed');
    this.curPage = 1;
    this.orderItems = [];
    this.notLoadOver = true;
    this.getOrder();
  }
  public async getOrder () {
    try {
      const result = await this.orderManager.getOrderList(this.curTab, this.curPage);
      this.orderItems = this.orderItems.concat(result.list);
      this.notLoadOver = this.orderItems.length < result.total;
      this.curPage ++;
    }catch (e) {
      this.notLoadOver = false;
    }

  }
}
