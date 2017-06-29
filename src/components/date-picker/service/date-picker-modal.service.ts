import {Injectable, Injector} from '@angular/core';
import {ModalController} from 'ionic-angular';
import {DateContainerComponent} from '../date-container/date-container';
@Injectable()
export class DatePickModal {
  private modal;
  constructor(public modalCtrl: ModalController) {
    this.modal = this.modalCtrl.create(DateContainerComponent);
  }

  public show() {
    return this.modal.present()
  }

}
