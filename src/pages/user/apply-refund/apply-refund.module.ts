import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyRefundPage } from './apply-refund';

@NgModule({
  declarations: [
    ApplyRefundPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyRefundPage),
  ],
  exports: [
    ApplyRefundPage
  ]
})
export class ApplyRefundPageModule {}
