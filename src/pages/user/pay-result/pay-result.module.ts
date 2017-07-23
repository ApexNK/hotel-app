import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayResultPage } from './pay-result';

@NgModule({
  declarations: [
    PayResultPage,
  ],
  imports: [
    IonicPageModule.forChild(PayResultPage),
  ],
  exports: [
    PayResultPage
  ]
})
export class PayResultPageModule {}
