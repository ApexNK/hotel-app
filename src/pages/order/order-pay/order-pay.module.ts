import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPayPage } from './order-pay';
import { PaySuccessComponent } from "../../../components/pay-success/pay-success";

@NgModule({
  declarations: [
    OrderPayPage,
    PaySuccessComponent,
  ],
  imports: [
    IonicPageModule.forChild(OrderPayPage),
  ],
  exports: [
    OrderPayPage
  ]
})
export class OrderPayPageModule {}
