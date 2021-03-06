import {Component, Input, Output, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {WkDate} from '../../../util';
import {DatePickModal} from '../service/date-picker-modal.service';
import { Events } from 'ionic-angular';
/**
 * Generated class for the DatePickerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'date-picker',
  templateUrl: 'date-picker.html'
})
export class DatePickerComponent implements OnDestroy, OnInit{

  @Input() curDate = WkDate.getToday();
  // @Output() ngModel = new EventEmitter<string>()
  @Output() onDateChange = new EventEmitter<string>();
  public uuid = (Math.random() + new Date().getTime()).toString().replace('.', '');
  // public curDate =  WkDate.getToday();
  constructor(private modal: DatePickModal, private ev: Events) {

  }
  ngOnInit () {
    this.listenDateChange();
  }
  ngOnDestroy () {
    this.ev.unsubscribe('onDateSelected' + this.uuid, this.dateChangeHandle);
  }
  public click () {
    this.modal.show({curDate: this.curDate, uuid: this.uuid})
  }
  private listenDateChange () {
    this.ev.subscribe('onDateSelected' + this.uuid, this.dateChangeHandle)
  }
  private dateChangeHandle = (date) => {
    if (this.curDate) {
      this.ev.publish('removeOldActiveClassByOldDate' + this.uuid, this.curDate);
    }
    this.curDate = date;

    this.onDateChange.emit(this.curDate);
    console.log(this.curDate);
    this.ev.publish('hideDatePickerModal' + this.uuid);
  }
}
