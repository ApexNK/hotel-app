import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeyItemComponent } from './key-item';


@NgModule({
  declarations: [
    KeyItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(KeyItemComponent),
  ],
  exports: [
    KeyItemComponent
  ]
})
export class KeyItemComponentModule {}
