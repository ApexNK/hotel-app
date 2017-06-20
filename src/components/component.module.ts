import { NgModule } from '@angular/core';
import { OrderItemComponentModule }  from './order-item/order-item.module';
import { KeyItemComponent } from '../pages/key/key-item/key-item';
import { PipeModule } from '../pipes/pipe.module';
import { IonicModule } from 'ionic-angular';
@NgModule({
  declarations: [
    KeyItemComponent
  ],
  imports: [
    IonicModule,
    OrderItemComponentModule,
    PipeModule
  ],
  exports: [
    KeyItemComponent
  ]
})
export class ComponentModule {}
