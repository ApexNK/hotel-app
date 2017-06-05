import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ImgUrlPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'imgUrl',
})
export class ImgUrlPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return "http://www.baidu.com" + value;
  }
}
