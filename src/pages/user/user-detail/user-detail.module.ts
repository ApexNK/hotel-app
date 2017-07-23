import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDetailPage } from './user-detail';
import { PipeModule } from '../../../pipes/pipe.module';

@NgModule({
  declarations: [
    UserDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDetailPage),
    PipeModule
  ],
  exports: [
    UserDetailPage
  ]
})
export class UserDetailPageModule {}
