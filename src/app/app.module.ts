import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule, DropdownModule } from 'angular-bootstrap-md';
import { BlockUIModule } from 'ng-block-ui';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ng6-toastr-notifications';
import { MaterialModule } from './modules/material-module';
import { ConfirmationDialogService } from './core/services/confirmation-dialog.service';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { ConfirmationDialogComponent } from './comun/confirmationDialog/confirmationDialog.component';
import { ComplianceModule } from './compliance/complianceModule.module';
import { BreadcrumbsComponent } from './comun/breadcrumbs/breadcrumbs.component';
import { CalendarComponent } from './comun/calendar/calendar.component';
import { CatalogsComponent } from './compliance//catalogs/catalogs.component';
import { ConfirmationModalComponent } from './comun/confirmationModal/confirmationModal.component';
import { HomeComponent } from './comun/home/home.component';
import { PerfilComponent } from './compliance/business/perfil/perfil.component';
import { BehaviorComponent } from './compliance/business/perfil/behavior/behavior.component';
import { SkillsComponent } from './compliance/business/perfil/skills/skills.component';
import { ComplianceHomeComponent } from './compliance/home/complianceHome.component';
import { AcquisitionsComponent } from './compliance/business/acquisitions/acquisitions.component';
import { ConfigActivitiesComponent } from './compliance/catalogs/compliance/configuration/configActivities/configActivities.component';
import { LegalAgreementComponent } from './compliance/business/legalAgreement/legalAgreement.component';
import { TablesLegalAgreementComponent } from './compliance/business/legalAgreement/content/tablesLegalAgreement.component';
import { EmployeesComponent } from './compliance/business/employees/employees.component';
import { ActivitiesComponent } from './compliance/catalogs/activities/activities.component';
import { ActivitiesTypesComponent } from './compliance/catalogs/activities/types/activitiesTypes.component';
import { ComplianceTypesComponent } from './compliance/catalogs/compliance/types/complianceTypes.component';
import { DashboardAComponent } from './compliance/dashboards/dashboard-a/dashboard-a.component';
import { DashboardBComponent } from './compliance/dashboards/dashboard-b/dashboard-b.component';
import { DashboardsComponent } from './compliance/business/perfil/dashboards/dashboards.component';
import { ResponsibilitiesComponent } from './compliance/business/perfil/responsibilities/responsibilities.component';
import { ObsyCommentsComponent } from './compliance/business/perfil/obsyComments/obsyComments.component';
import { AuthoritiesComponent } from './compliance/catalogs/authorities/authorities.component';
import { ApplicationsTypesComponent } from './compliance/catalogs/applications/types/applicationsTypes.component';
import { DepartmentsComponent } from './compliance/catalogs/departments/departments.component';
import { PeriodsComponent } from './compliance/catalogs/periods/periods.component';
import { DaysTypesComponent } from './compliance/catalogs/days/types/daysTypes.component';
import { ActivitiesEditComponent } from './compliance/catalogs/activities/edit/activitiesEdit.component';
import { CompetentStaffComponent } from './compliance/business/acquisitions/competentStaff/competentStaff.component';
import { ActivitiesTypesEditComponent } from './compliance/catalogs/activities/types/edit/activitiesTypesEdit.component';
import { AuthoritiesEditComponent } from './compliance/catalogs/authorities/edit/authoritiesEdit.component';
import { ApplicationsTypesEditComponent } from './compliance/catalogs/applications/types/edit/applicationsTypesEdit.component';
import { UploadComponent } from './compliance/business/perfil/upload/upload.component';
import { ComplianceConfigurationComponent } from './compliance/catalogs/compliance/configuration/complianceConfiguration.component';
import { EventService } from './core/services/event.service';
import { LoginComponent } from './comun/login/login.component';
import { SecurityHomeComponent } from './security/home/securityHome.component';
import { ComplianceHeaderComponent } from './compliance/comun/header/complianceHeader.component';
import { ComplianceSidebarComponent } from './compliance/comun/sidebar/complianceSidebar.component';
import { SecurityHeaderComponent } from './security/comun/header/securityHeader.component';
import { SecuritySidebarComponent } from './security/comun/sidebar/securitySidebar.component';
import { UsersComponent } from './security/admin/users/users.component';
import { UsersEditComponent } from './security/admin/users/edit/usersEdit.component';
import { RolesComponent } from './security/admin/roles/roles.component';
import { RolesEditComponent } from './security/admin/roles/edit/rolesEdit.component';
import { SafeHomeComponent } from './safe/home/safeHome.component';
import { SafeHeaderComponent } from './safe/comun/header/safeHeader.component';
import { SafeSidebarComponent } from './safe/comun/sidebar/safeSidebar.component';
import { GrantsComponent } from './security/admin/grants/grants.component';
import { ProductsComponent } from './safe/admin/products/products.component';
import { ProductsEditComponent } from './safe/admin/products/edit/productsEdit.component';
import { ChangePasswordComponent } from './comun/changePassword/changePassword.component';
import { GrantsEditComponent } from './security/admin/grants/edit/grantsEdit.component';
import { RolesGrantsComponent } from './security/admin/roles/grants/rolesGrants.component';

import { TreeviewModule } from 'ngx-treeview';
import { Constants } from './core/globals/Constants';
import { ComplianceTypesEditComponent } from './compliance/catalogs/compliance/types/edit/complianceTypesEdit.component';
import { PlannedPowersPPAComponent } from './safe/mda-planning-process/planned-powers-ppa/planned-powers-ppa.component';
import { SafeLinkMockUp } from './safe/links-mock-up/safeLinkMockUp';
import { HeatRateRecordComponent } from './safe/mda-planning-process/heat-rate-record/heat-rate-record.component';
import { SalesOffersComponent } from './safe/mda-planning-process/sales-offers/sales-offers.component';
import { ClientsComponent } from './safe/admin/clients/clients.component';
import { UnityProductsComponent } from './safe/catalogs/unityProducts/unityProducts.component';
import { UnityProductsEditComponent } from './safe/catalogs/unityProducts/edit/unityProductsEdit.component';




@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    BehaviorComponent,
    SkillsComponent,
    LoginComponent,
    HomeComponent,
    ComplianceHomeComponent,
    AcquisitionsComponent,
    ConfigActivitiesComponent,
    LegalAgreementComponent,
    TablesLegalAgreementComponent, 
    ComplianceHeaderComponent,
    ComplianceSidebarComponent,
    EmployeesComponent,
    ActivitiesComponent,
    ActivitiesTypesComponent,
    ComplianceTypesComponent,
    ComplianceTypesEditComponent,
    DashboardAComponent,
    DashboardBComponent,
    DashboardsComponent,
    ResponsibilitiesComponent,
    ObsyCommentsComponent,
    CatalogsComponent,
    AuthoritiesComponent,
    ApplicationsTypesComponent,
    DepartmentsComponent,
    PeriodsComponent,
    DaysTypesComponent,
    ActivitiesEditComponent,
    CompetentStaffComponent,
    ActivitiesTypesEditComponent,
    ComplianceTypesComponent,
    AuthoritiesEditComponent,
    ApplicationsTypesEditComponent,
    UploadComponent,
    CalendarComponent,
    ConfirmationModalComponent,
    BreadcrumbsComponent,
    ComplianceHomeComponent,
    ComplianceConfigurationComponent,
    ConfirmationDialogComponent,
    SecurityHomeComponent,
    SecurityHeaderComponent,
    SecuritySidebarComponent,
    UsersComponent,
    UsersEditComponent,
    RolesComponent,
    RolesEditComponent,
    GrantsComponent,
    GrantsEditComponent,
    RolesGrantsComponent,

    SafeHomeComponent,
    SafeHeaderComponent,
    SafeSidebarComponent,
    ProductsComponent,
    ProductsEditComponent,
    ChangePasswordComponent,
    UnityProductsComponent,
    UnityProductsEditComponent,


    
    SafeLinkMockUp,
    PlannedPowersPPAComponent,
    HeatRateRecordComponent,
    SalesOffersComponent,
    ClientsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    DropdownModule.forRoot(),
    MaterialModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule, ReactiveFormsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModule,
    ToastrModule.forRoot(),
    TreeviewModule.forRoot(),
    BlockUIModule.forRoot({
      message: Constants.LOADING_MEESSAGE
    })

  ],
  exports:[ BrowserAnimationsModule, MatDatepickerModule, MatNativeDateModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ConfirmationDialogService,
    EventService
  ],
  entryComponents: [ ConfirmationDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }