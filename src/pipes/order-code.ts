import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the orderCode pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'orderCode',
})
export class OrderCodePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if(value.length < 20){
      return value;
    }
    return value.substr(0,1) + value.substring(value.length-6);
  }
}
