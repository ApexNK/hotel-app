import { NgModule } from '@angular/core';
import { OrderItemComponentModule }  from './order-item/order-item.module';

import {ScaleItem} from './scale-item/scale-size.componet';
import { PipeModule } from '../pipes/pipe.module';
import { IonicModule } from 'ionic-angular';
//import { PaySuccessComponent } from "./pay-success/pay-success"
@NgModule({
  declarations: [

    ScaleItem
    //PaySuccessComponent
  ],
  imports: [
    IonicModule,
    OrderItemComponentModule,
    PipeModule
  ],
  exports: [

    ScaleItem
    //PaySuccessComponent
  ]
})
export class ComponentModule {}
