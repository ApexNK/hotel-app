import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderItemComponent } from './order-item';

@NgModule({
  declarations: [
    OrderItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(OrderItemComponent),
  ],
  exports: [
    OrderItemComponent
  ]
})
export class OrderItemComponentModule {}
