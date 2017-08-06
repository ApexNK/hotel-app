import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutWoKePage } from './about-woke';

@NgModule({
  declarations: [
    AboutWoKePage,
  ],
  imports: [
    IonicPageModule.forChild(AboutWoKePage),
  ],
  exports: [
    AboutWoKePage
  ]
})
export class AboutWoKePageModule {}
