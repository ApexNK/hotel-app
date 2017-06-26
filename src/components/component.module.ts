import { NgModule } from '@angular/core';
import { OrderItemComponentModule }  from './order-item/order-item.module';
import { KeyItemComponent } from '../pages/key/key-item/key-item';
import { PipeModule } from '../pipes/pipe.module';
import { IonicModule } from 'ionic-angular';
//import { PaySuccessComponent } from "./pay-success/pay-success"
@NgModule({
  declarations: [
    KeyItemComponent,
    //PaySuccessComponent
  ],
  imports: [
    IonicModule,
    OrderItemComponentModule,
    PipeModule
  ],
  exports: [
    KeyItemComponent,
    //PaySuccessComponent
  ]
})
export class ComponentModule {}
