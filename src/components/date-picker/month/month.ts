import {Component, Input, OnChanges, SimpleChange} from '@angular/core';

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
export class MonthComponent implements OnChanges {
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

  constructor() {

  }

  ngOnChanges(change: {
    year: SimpleChange,
    month: SimpleChange
  }) {
    if (change.year || change.month) {
      this.createDays();
    }
  }

  private createDays() {
    this.spaceList = this.getSpaceList(this.year, this.month);
    this.dayList = this.getDayList(this.year, this.month);
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
