import {Component, Input, OnChanges, SimpleChange, OnInit, ElementRef} from '@angular/core';
import {WkDate} from '../../../util'
import { Events } from 'ionic-angular';
/**
 * Generated class for the MonthComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'month',
  templateUrl: 'month.html'
})
export class MonthComponent implements OnChanges, OnInit {
  @Input() curDate:string;
  @Input() year: number = new Date().getFullYear();
  @Input() month: number = new Date().getMonth() + 1;
  public dayList: {
    isStart: boolean,
    text: number,
    isInChosenList: boolean,
    isEnd: boolean,
    isOldDay: boolean
  } [] = [];
  public spaceList = [];
  private ele: HTMLDivElement;
  constructor(private ev: Events, private eleRef: ElementRef) {
    this.ele = this.eleRef.nativeElement;
  }
  ngOnInit () {
    this.removeActiveClassByOldChosenDate();
    this.bindClick();
  }
  ngOnChanges(change: {
    year: SimpleChange,
    month: SimpleChange
  }) {
    if (change.year || change.month) {
      this.createDays();
    }
  }
  private bindClick () {
    this.ele.addEventListener('click', this.clickHandle)
  }
  private clickHandle = (ev: Event) =>{
    const srcElement = ev.srcElement;
    const date = Number(srcElement.innerHTML);
    const clickedDay = this.dayList[date-1];
    if (clickedDay.isOldDay === true) {
      return;
    }
    if (srcElement.classList.contains('month-component-day')) {

      const chosenDate = new Date(this.year,this.month - 1, date);
      clickedDay.isInChosenList = true;
      this.ev.publish('onDateSelected', WkDate.toStringDate(chosenDate))
    }
  };
  private removeActiveClassByOldChosenDate () {
    this.ev.subscribe('removeOldActiveClassByOldDate', date => {
      const dateArr = date.split('-');
      const oldChosenYear = Number(dateArr[0]);
      const oldChosenMonth = Number(dateArr[1]);
      const oldChoseDate = Number(dateArr[2]);
      this.removeActiveClass(oldChosenYear, oldChosenMonth, oldChoseDate);
    });
  }
  private removeActiveClass (year, month, date) {
    if (this.year === year && this.month === month) {
      this.dayList[date - 1].isInChosenList = false;
    }
  }
  private createDays() {
    this.spaceList = this.getSpaceList(this.year, this.month);
    this.dayList = this.getDayList(this.year, this.month);
    if (this.curDate) {
      this.setChoseDate(this.curDate)
    }

  }

  private getDayList(year, month): any[] {
    const dayList = [];
    const dayLength = new Date(year, month, 0).getDate();
    const now = new Date();
    const today = now.getDate();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    for (let i = 1; i <= dayLength; i++) {
      dayList.push({
        isStart: false,
        text: i,
        isInChosenList: false,
        isEnd: false,
        isOldDay: i < today && year <= curYear && month <= curMonth
      })
    }
    return dayList;
  }
  public setChoseDate (inputDate) {
    const dateArr = inputDate.split('-');
    const year = Number(dateArr[0]);
    const month = Number(dateArr[1]);
    const date = Number(dateArr[2]);
    if (this.year === year && this.month === month) {
      this.dayList[date - 1].isInChosenList = true;
    }
  }
  private getSpaceList(year, month) {
    const spaceLen = new Date(year, month - 1, 1).getDay();
    const spaces = [];
    if (spaceLen === 0) {
      return spaces;
    }
    for (let i = 0; i < spaceLen; i++) {
      spaces.push(i);
    }
    return spaces;
  }
}
