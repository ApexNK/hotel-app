import { Pipe, PipeTransform } from '@angular/core';
import config from '../../config/config'

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
    return config.imgServerUrl + value;
  }
}
