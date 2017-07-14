import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeyDetailPage } from './key-detail';

@NgModule({
  declarations: [
    KeyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(KeyDetailPage),
  ],
  exports: [
    KeyDetailPage
  ]
})
export class KeyDetailPageModule {}
