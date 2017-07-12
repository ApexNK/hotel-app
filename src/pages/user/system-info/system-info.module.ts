import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SystemInfoPage } from './system-info';

@NgModule({
  declarations: [
    SystemInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(SystemInfoPage),
  ],
  exports: [
    SystemInfoPage
  ]
})
export class SystemInfoPageModule {}
