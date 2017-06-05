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
  @Input() keyInfo: KeyInfo;

  constructor() {

  }

}
