import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalanceDetailPage } from './balance-detail';

@NgModule({
  declarations: [
    BalanceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BalanceDetailPage),
  ],
  exports: [
    BalanceDetailPage
  ]
})
export class BalanceDetailPageModule {}
