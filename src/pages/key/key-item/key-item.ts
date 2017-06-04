import { Component } from '@angular/core';

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

  text: string;
  roomPic: string;
  constructor() {
    this.text = '北京华腾美居 1楼103室';
    this.roomPic = "./assets/img/timg.jpg";
  }

}
