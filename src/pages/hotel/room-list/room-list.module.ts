import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomListPage } from './room-list';
import {PipeModule} from '../../../pipes/pipe.module';

@NgModule({
  declarations: [
    RoomListPage,
  ],
  imports: [
    PipeModule,
    IonicPageModule.forChild(RoomListPage),
  ],
  exports: [
    RoomListPage
  ]
})
export class RoomListPageModule {}
