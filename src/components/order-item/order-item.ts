import { Component } from '@angular/core';

/**
 * Generated class for the OrderItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'order-item',
  templateUrl: 'order-item.html'
})
export class OrderItemComponent {

  text: string;

  constructor() {
    console.log('Hello OrderItemComponent Component');
    this.text = 'Hello World';
  }

}
