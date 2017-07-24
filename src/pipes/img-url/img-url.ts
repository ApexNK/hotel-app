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
    if(!value || value === ''){
      if(args[0] === 'head'){
        return './assets/img/default_avatar.png';
      }else if(args[0] === 'nodefault'){
        return '';
      }else{
        return './assets/img/default.png';
      }
    }
    if( value.indexOf("storage") > 0 || value.indexOf('assets') > 0){
      return value;
    }
    return config.imgServerUrl + value;
  }
}
