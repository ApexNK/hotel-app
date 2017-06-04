import { NgModule } from '@angular/core';
import { OrderItemComponentModule }  from './order-item/order-item.module';
import { KeyItemComponentModule } from "../pages/key/key-item/key-item.module";
import { KeyItemComponent } from '../pages/key/key-item/key-item';

@NgModule({
  declarations: [

  ],
  imports: [
    OrderItemComponentModule,
    KeyItemComponentModule
  ],
  exports: [
    KeyItemComponent
  ]
})
export class ComponentModule {}
