import {Component} from '@angular/core';

/**
 * Generated class for the MonthListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'month-list',
  templateUrl: 'month-list.html'
})
export class MonthListComponent {

  public now = new Date();
  public weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  public curYear: number = this.now.getFullYear();
  public curMonth: number = this.now.getMonth() + 1;
  public monthList: { year: number; month: number }[] = [{year: this.curYear, month: this.curMonth}];
  private readonly PAGE_SIZE = 3;

  constructor() {
    this.loadFutureMonths();
  }

  public loadFutureMonths() {
    for (let i = 0; i < this.PAGE_SIZE; i++) {
      this.monthList.push(this.getFutureMonths());
    }
    return Promise.resolve(true);
  }

  private getFutureMonths = (() => {
    const now = new Date();
    let nowMonth = now.getMonth() + 1;
    let nowYear = now.getFullYear();
    return () => {
      nowMonth++;
      if (nowMonth > 12) {
        nowMonth = 1;
        nowYear++;
      }
      return {
        year: nowYear,
        month: nowMonth
      }
    }
  })();
}
