import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
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

  constructor(private viewCtrl: ViewController) {
    console.log('Hello DateContainerComponent Component');
    this.text = 'Hello World';
  }

}
