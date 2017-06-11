import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdentityAuditPage } from './identity-audit';

@NgModule({
  declarations: [
    IdentityAuditPage,
  ],
  imports: [
    IonicPageModule.forChild(IdentityAuditPage),
  ],
  exports: [
    IdentityAuditPage
  ]
})
export class IdentityAuditPageModule {}
