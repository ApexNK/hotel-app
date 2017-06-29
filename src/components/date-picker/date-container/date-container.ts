import { Component } from '@angular/core';

/**
 * Generated class for the DateContainerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'date-container',
  templateUrl: 'date-container.html'
})
export class DateContainerComponent {

  text: string;

  constructor() {
    console.log('Hello DateContainerComponent Component');
    this.text = 'Hello World';
  }

}
