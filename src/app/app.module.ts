import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MDBBootstrapModule, DropdownModule } from 'angular-bootstrap-md';
import { BlockUIModule } from 'ng-block-ui';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatPaginatorIntl } from '@angular/material';

import { APP_ROUTES } from './app-routing.module';
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
import { ConfirmationDialogComponent } from './common/confirmationDialog/confirmationDialog.component';
import { BreadcrumbsComponent } from './common/breadcrumbs/breadcrumbs.component';
import { CalendarComponent } from './common/calendar/calendar.component';
import { HomeComponent } from './common/home/home.component';
import { PerfilComponent } from './compliance/business/perfil/perfil.component';
import { BehaviorComponent } from './compliance/business/perfil/behavior/behavior.component';
import { SkillsComponent } from './compliance/business/perfil/skills/skills.component';
import { DashboardAComponent } from './compliance/dashboards/dashboard-a/dashboard-a.component';
import { DashboardBComponent } from './compliance/dashboards/dashboard-b/dashboard-b.component';
import { DashboardsComponent } from './compliance/business/perfil/dashboards/dashboards.component';
import { DepartmentsComponent } from './compliance/catalogs/departments/departments.component';
import { PeriodsComponent } from './compliance/catalogs/periods/periods.component';
import { DaysTypesComponent } from './compliance/catalogs/days/types/daysTypes.component';
import { EventService } from './core/services/event.service';
import { LoginComponent } from './common/login/login.component';
import { SecurityHomeComponent } from './security/home/securityHome.component';
import { SecurityHeaderComponent } from './security/comun/header/securityHeader.component';
import { SecuritySidebarComponent } from './security/comun/sidebar/securitySidebar.component';
import { UsersComponent } from './security/admin/users/users.component';
import { UsersEditComponent } from './security/admin/users/edit/usersEdit.component';
import { RolesComponent } from './security/admin/roles/roles.component';
import { RolesEditComponent } from './security/admin/roles/edit/rolesEdit.component';
import { GrantsComponent } from './security/admin/grants/grants.component';
import { ChangePasswordComponent } from './common/changePassword/changePassword.component';
import { GrantsEditComponent } from './security/admin/grants/edit/grantsEdit.component';
import { RolesGrantsComponent } from './security/admin/roles/grants/rolesGrants.component';


import { TreeviewModule } from 'ngx-treeview';
import { Constants } from './core/globals/Constants';
import { SafeNewEventComponent } from './safe/business/logBook/newEvent/safeNewEvent.component';
import { PlannedPowersPPAComponent } from './safe/business/mdaPlanningProcess/plannedPowersPpa/plannedPowersPpa.component';
import { HeatRateRecordComponent } from './safe/business/mdaPlanningProcess/heatRateRecord/heatRateRecord.component';
import { SalesOffersComponent } from './safe/business/mdaPlanningProcess/salesOffers/salesOffers.component';

import { MockUpHomeComponent } from './mockUp/home/mockUpHome.component';
import { MockUpHeaderComponent } from './mockUp/comun/header/mockUpHeader.component';
import { MatPaginatorIntlSpanish } from './core/helpers/apanishPaginatorIntl';
import { SalesOffersV2Component } from './safe/business/mdaPlanningProcess/salesOffersV2/salesOffersV2.component';
import { registerLocaleData } from '@angular/common';



import localePy from '@angular/common/locales/es-MX';


//Se agregan al ejecutar ng build --prod
import { MonitoringJobsEditComponent } from '../app/safe/admin/monitoring/edit/monitoringJobsEdit.component';
import { DetailJobsComponent } from '../app/safe/admin/monitoring/detail/detailJobs.component';
import { MonitoringJobsComponent } from '../app/safe/admin/monitoring/monitoringJobs.component';
import { TwelveDigitsDirective } from '../app/core/helpers/twelve-digits';

/* Common */
/*
import { HeaderComponent }                     from 'src/app/common/header/header.component';
import { FooterComponent }                     from 'src/app/common/footer/footer.component';
import { SidebarMenuComponent }                from 'src/app/common/sidebar/menu/sidebarMenu.component';
import { SidebarItemsComponent }               from 'src/app/common/sidebar/items/sidebarItems.component';
import { SidebarComponent }                    from 'src/app/common/sidebar/sidebar/sidebar.component';//*/
/* ./Common */
/* Module Monitoring */
import { MonitoringModule } from 'src/app/monitoring/monitoring.module';
import { SafeModule       } from 'src/app/safe/safe.module';
import { ComplianceModule } from './compliance/complianceModule.module';
/* ./Module Monitoring */


registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    BehaviorComponent,
    SkillsComponent,
    LoginComponent,
    HomeComponent,
    DashboardAComponent,
    DashboardBComponent,
    DashboardsComponent,
    DepartmentsComponent,
    PeriodsComponent,
    DaysTypesComponent,

    CalendarComponent,
    BreadcrumbsComponent,
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

   
    ChangePasswordComponent,

    MockUpHomeComponent,
    MockUpHeaderComponent,

    PlannedPowersPPAComponent,
    HeatRateRecordComponent,
    SalesOffersComponent,
    SalesOffersV2Component,
    SafeNewEventComponent

    ,MonitoringJobsEditComponent
    ,DetailJobsComponent
    ,MonitoringJobsComponent
    ,TwelveDigitsDirective

    /*
    ,HeaderComponent
    ,FooterComponent
    ,SidebarComponent
    ,SidebarMenuComponent
    ,SidebarItemsComponent//*/

  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
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
    ,MonitoringModule
    ,SafeModule
    ,ComplianceModule
  ],
  exports:[ BrowserAnimationsModule, MatDatepickerModule, MatNativeDateModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ConfirmationDialogService,
    EventService,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlSpanish },
    { provide: LOCALE_ID, useValue: 'es' } 
  ],
  entryComponents: [ ConfirmationDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }