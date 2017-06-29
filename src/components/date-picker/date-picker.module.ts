import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MonthListComponent } from './month-list/month-list'
import {DateContainerComponent} from './date-container/date-container';
import {MonthComponent} from './month/month';
import  {DatePickModal} from './service/date-picker-modal.service';
import {DatePickerComponent} from './date-pick/date-picker';
@NgModule({
  declarations: [
    MonthComponent,
    MonthListComponent,
    DateContainerComponent,
    DatePickerComponent
  ],
  imports: [
    IonicModule],
  exports: [
    DateContainerComponent,
    DatePickerComponent
  ],
  entryComponents: [DateContainerComponent],
  providers: [
    DatePickModal
  ]
})
export class DatePickerModule {}
