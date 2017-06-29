import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MonthListComponent } from './month-list';
import {MonthComponentModule} from '../month/month.module';
@NgModule({
  declarations: [
    MonthListComponent,
  ],
  imports: [
    IonicModule,
    MonthComponentModule
  ],
  exports: [
    MonthListComponent
  ]
})
export class MonthListComponentModule {}
