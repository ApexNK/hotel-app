import { NgModule } from '@angular/core';
import { ImgUrlPipe }  from './img-url/img-url';
import { OrderCodePipe } from  './order-code'

@NgModule({
  declarations: [
    ImgUrlPipe,
    OrderCodePipe

  ],
  imports: [
  ],
  exports: [
    ImgUrlPipe,
    OrderCodePipe
  ]
})
export class PipeModule {}
