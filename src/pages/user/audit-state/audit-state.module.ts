import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuditStatePage } from './audit-state';

@NgModule({
  declarations: [
    AuditStatePage,
  ],
  imports: [
    IonicPageModule.forChild(AuditStatePage),
  ],
  exports: [
    AuditStatePage
  ]
})
export class AuditStatePageModule {}
