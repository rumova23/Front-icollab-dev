import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { ConfigActivitiesComponent } from './configActivities/configActivities.component';
import { PerfilModule } from './perfil/perfil.module';
import { ComplianceLegalAgreementModule } from './legalAgreement/complianceLegalAgreement.module';
import { AcquisitionsModule } from './acquisitions/acquisitions.module';

@NgModule({
  imports: [
    CommonModule,
    PerfilModule,
    ComplianceLegalAgreementModule,
    AcquisitionsModule
  ],
  declarations: [
    EmployeesComponent,
    ConfigActivitiesComponent
  ],
  exports: [
    EmployeesComponent,
    ConfigActivitiesComponent
  ]
})
export class ComplianceBusinessModule { }