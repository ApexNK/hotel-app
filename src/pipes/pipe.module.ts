import { NgModule } from '@angular/core';
import { ImgUrlPipe }  from './img-url/img-url';
import { OrderCodePipe } from  './order-code'
import { RoomCodePipe } from  './room-code'

@NgModule({
  declarations: [
    ImgUrlPipe,
    OrderCodePipe,
    RoomCodePipe
  ],
  imports: [
  ],
  exports: [
    ImgUrlPipe,
    OrderCodePipe,
    RoomCodePipe
  ]
})
export class PipeModule {}
