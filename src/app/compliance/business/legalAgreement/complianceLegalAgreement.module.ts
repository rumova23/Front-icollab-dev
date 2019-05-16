import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalAgreementComponent } from './legalAgreement.component';
import { TablesLegalAgreementComponent } from './content/tablesLegalAgreement.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LegalAgreementComponent,
    TablesLegalAgreementComponent
  ],
  exports: [
   
  ]
})
export class ComplianceLegalAgreementModule { }