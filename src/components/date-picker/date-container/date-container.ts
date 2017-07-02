import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewController ,Events, NavParams} from 'ionic-angular';
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
export class DateContainerComponent implements OnInit, OnDestroy{
  public curDate;
  public uuid;
  constructor(private viewCtrl: ViewController, private ev: Events, navParams: NavParams) {
    this.viewCtrl.showBackButton(true);
    this.curDate = navParams.get('curDate').curDate;
    this.uuid = navParams.get('curDate').uuid;
    this.hide = this.hide.bind(this);
  }
  ngOnInit () {
    this.ev.subscribe('hideDatePickerModal'+ this.uuid, this.hide);
  }
  ngOnDestroy () {
    this.ev.unsubscribe('hideDatePickerModal' + this.uuid, this.hide);
  }
  public hide (){
    this.viewCtrl.dismiss();
  }

}
