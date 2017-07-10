import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetailPage } from './item-detail';
import {PipeModule} from '../../../pipes/pipe.module';

@NgModule({
  declarations: [
    ItemDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetailPage),
    PipeModule
  ],
  exports: [
    ItemDetailPage
  ]
})
export class ItemDetailPageModule {}
