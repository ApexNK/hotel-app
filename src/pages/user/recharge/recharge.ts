import { Component } from '@angular/core';

/**
 * Generated class for the RechargeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'recharge',
  templateUrl: './recharge.html'
})
export class RechargePage {

  public activeNum = 0;
  constructor() {
    console.log('Hello RechargeComponent Component');
  }

}
