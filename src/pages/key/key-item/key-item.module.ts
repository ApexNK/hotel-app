import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeyItemComponent } from './key-item';
import { PipeModule } from '../../../pipes/pipe.module';


@NgModule({
  declarations: [
    KeyItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(KeyItemComponent),
    PipeModule
  ],
  exports: [
    KeyItemComponent
  ]
})
export class KeyItemComponentModule {}
