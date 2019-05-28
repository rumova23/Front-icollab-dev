import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivitiesEditComponent } from './activities/edit/activitiesEdit.component';
import { ActivitiesTypesComponent } from './activities/types/activitiesTypes.component';
import { ActivitiesTypesEditComponent } from './activities/types/edit/activitiesTypesEdit.component';
import { DepartmentsComponent } from './departments/departments.component';
import { ComplianceConfigurationComponent } from './compliance/configuration/complianceConfiguration.component';
import { PeriodsComponent } from './periods/periods.component';
import { ApplicationsTypesComponent } from './applications/types/applicationsTypes.component';
import { ApplicationsTypesEditComponent } from './applications/types/edit/applicationsTypesEdit.component';
import { DaysTypesComponent } from './days/types/daysTypes.component';
import { ComplianceTypesComponent } from './compliance/types/complianceTypes.component';
import { ComplianceTypesEditComponent } from './compliance/types/edit/complianceTypesEdit.component';
import { AuthoritiesComponent } from './authorities/authorities.component';
import { AuthoritiesEditComponent } from './authorities/edit/authoritiesEdit.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ActivitiesComponent,
    ActivitiesEditComponent,
    ActivitiesTypesComponent,
    ActivitiesTypesEditComponent,
    DepartmentsComponent,
    ComplianceConfigurationComponent,
    ComplianceTypesComponent,
    ComplianceTypesEditComponent,
    PeriodsComponent,
    ApplicationsTypesComponent,
    ApplicationsTypesEditComponent,
    DaysTypesComponent,
    AuthoritiesComponent,
    AuthoritiesEditComponent,
    ComplianceConfigurationComponent,
    ComplianceTypesComponent,
    ComplianceTypesEditComponent
  ],
  exports: [
    ActivitiesComponent,
    ActivitiesEditComponent,
    ActivitiesTypesComponent,
    ActivitiesTypesEditComponent,
    DepartmentsComponent,
    ComplianceConfigurationComponent,
    ComplianceTypesComponent,
    ComplianceTypesEditComponent,
    PeriodsComponent,
    ApplicationsTypesComponent,
    ApplicationsTypesEditComponent,
    DaysTypesComponent,
    AuthoritiesComponent,
    AuthoritiesEditComponent,
    ComplianceConfigurationComponent,
    ComplianceTypesComponent,
    ComplianceTypesEditComponent
  ]
})
export class ComplianceCatalogsModule { }