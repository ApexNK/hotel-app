import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdentityAuditPage } from './identity-audit';
import { PipeModule } from '../../../pipes/pipe.module';

@NgModule({
  declarations: [
    IdentityAuditPage,
  ],
  imports: [
    IonicPageModule.forChild(IdentityAuditPage),
    PipeModule
  ],
  exports: [
    IdentityAuditPage
  ]
})
export class IdentityAuditPageModule {}
