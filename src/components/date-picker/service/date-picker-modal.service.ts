import {Injectable} from '@angular/core';
import {ModalController} from 'ionic-angular';
import {DateContainerComponent} from '../date-container/date-container';
@Injectable()
export class DatePickModal {
  private modal;
  constructor(public modalCtrl: ModalController) {

  }

  public show(curDate) {
    this.modal = this.modalCtrl.create(DateContainerComponent, {curDate});
    return this.modal.present()
  }

}
