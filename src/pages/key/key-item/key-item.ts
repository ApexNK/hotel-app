import { Component , Input} from '@angular/core';
import { KeyInfo } from './key-item-models';

/**
 * Generated class for the KeyItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'key-item',
  templateUrl: './key-item.html'
})
export class KeyItemComponent {

  public keyInfo: KeyInfo;
  constructor() {
    this.keyInfo = {
      roomName:'北京华腾美居 1楼103室',
      roomPic : './assets/img/timg.jpg',
      checkInTime : "2017-5-10-2017-5-11",
      address : "西大望路甲16号",
      leaveTime : "2017-05-11 12:00"
    };
  }

}
