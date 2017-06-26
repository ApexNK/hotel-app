import { Component, Input} from '@angular/core';

/**
 * Generated class for the PaySuccessComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'pay-success',
  templateUrl: 'pay-success.html'
})
export class PaySuccessComponent {
  @Input()  total : Number;

  constructor() {
  }

}
