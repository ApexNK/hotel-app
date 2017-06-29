import {Injectable, Injector} from '@angular/core';
import {ModalController} from 'ionic-angular';
import {DateContainerComponent} from '../date-container/date-container';
@Injectable()
export class DatePickModal {
  constructor(public modalCtrl: ModalController) {

  }

  public show() {
    const modal = this.modalCtrl.create(DateContainerComponent);
    return modal.present()
  }
}
