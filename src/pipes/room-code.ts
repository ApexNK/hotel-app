import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the orderCode pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'roomCode',
})
export class RoomCodePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if(value.length < 4){
      return value;
    }
    let roomCode = value.substr(value.length - 4);
    if(roomCode.charAt(0) === '0'){
      return roomCode.substr(1);
    }else{
      return roomCode;
    }
  }
}
