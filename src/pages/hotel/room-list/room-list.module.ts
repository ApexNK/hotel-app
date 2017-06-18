import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomListPage } from './room-list';

@NgModule({
  declarations: [
    RoomListPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomListPage),
  ],
  exports: [
    RoomListPage
  ]
})
export class RoomListPageModule {}
