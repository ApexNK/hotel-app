import {Component, Input, Output, EventEmitter} from '@angular/core';
import {WkDate} from '../../../util';
import {DatePickModal} from '../service/date-picker-modal.service';
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
export class DatePickerComponent {

  @Input() date = WkDate.getToday();
  // @Output() ngModel = new EventEmitter<string>()
  @Output() onDateChange = new EventEmitter<string>();

  constructor(private modal: DatePickModal) {

  }
  public click () {
    this.modal.show();
  }
}
