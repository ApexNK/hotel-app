import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MonthComponent } from './month';

@NgModule({
  declarations: [
    MonthComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    MonthComponent
  ]
})
export class MonthComponentModule {}
