import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MDBBootstrapModule, DropdownModule } from 'angular-bootstrap-md';
import { BlockUIModule } from 'ng-block-ui';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatPaginatorIntl } from '@angular/material';

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
import { ConfirmationDialogComponent } from './common/confirmationDialog/confirmationDialog.component';
import { ComplianceModule } from './compliance/complianceModule.module';
import { BreadcrumbsComponent } from './common/breadcrumbs/breadcrumbs.component';
import { CalendarComponent } from './common/calendar/calendar.component';
import { ConfirmationModalComponent } from './common/confirmationModal/confirmationModal.component';
import { HomeComponent } from './common/home/home.component';
//import { HomeComponent } from './comun/home/home.component';
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
import { ComplianceTypesComponent } from './compliance/catalogs/compliance/types/complianceTypes.component';
import { DashboardAComponent } from './compliance/dashboards/dashboard-a/dashboard-a.component';
import { DashboardBComponent } from './compliance/dashboards/dashboard-b/dashboard-b.component';
import { DashboardsComponent } from './compliance/business/perfil/dashboards/dashboards.component';
import { ResponsibilitiesComponent } from './compliance/business/perfil/responsibilities/responsibilities.component';
import { ObsyCommentsComponent } from './compliance/business/perfil/obsyComments/obsyComments.component';
import { DepartmentsComponent } from './compliance/catalogs/departments/departments.component';
import { PeriodsComponent } from './compliance/catalogs/periods/periods.component';
import { DaysTypesComponent } from './compliance/catalogs/days/types/daysTypes.component';
import { ActivitiesEditComponent } from './compliance/catalogs/activities/edit/activitiesEdit.component';
import { CompetentStaffComponent } from './compliance/business/acquisitions/competentStaff/competentStaff.component';
import { UploadComponent } from './compliance/business/perfil/upload/upload.component';
import { ComplianceConfigurationComponent } from './compliance/catalogs/compliance/configuration/complianceConfiguration.component';
import { EventService } from './core/services/event.service';
import { LoginComponent } from './common/login/login.component';
//import { LoginComponent } from './comun/login/login.component';
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
import { SafeHeaderComponent } from './safe/common/header/safeHeader.component';
import { SafeSidebarComponent } from './safe/common/sidebar/safeSidebar.component';
import { GrantsComponent } from './security/admin/grants/grants.component';
import { ProductsComponent } from './safe/admin/products/products.component';
import { ProductsEditComponent } from './safe/admin/products/edit/productsEdit.component';
import { ChangePasswordComponent } from './common/changePassword/changePassword.component';
import { GrantsEditComponent } from './security/admin/grants/edit/grantsEdit.component';
import { RolesGrantsComponent } from './security/admin/roles/grants/rolesGrants.component';


import { TreeviewModule } from 'ngx-treeview';
import { Constants } from './core/globals/Constants';
import { ComplianceTypesEditComponent } from './compliance/catalogs/compliance/types/edit/complianceTypesEdit.component';
import { ClientsComponent } from './safe/admin/clients/clients.component';
import { UnityProductsComponent } from './safe/catalogs/unityProducts/unityProducts.component';
import { UnityProductsEditComponent } from './safe/catalogs/unityProducts/edit/unityProductsEdit.component';
import { CatalogGenericComponent } from './safe/catalogs/generic/catalogGeneric.component';
import { CatalogGenericEditComponent } from './safe/catalogs/generic/edit/catalogGenericEdit.component';
import { PmlComponent } from './safe/admin/pml/pml.component';
import { ComplianceWelcomeComponent } from './compliance/home/welcome/complianceWelcome.component';
import { SafeNewEventComponent } from './safe/business/logBook/newEvent/safeNewEvent.component';
import { WeatherComponent } from './safe/admin/weather/weather.component';
import { PlannedPowersPPAComponent } from './safe/business/mdaPlanningProcess/plannedPowersPpa/plannedPowersPpa.component';
import { HeatRateRecordComponent } from './safe/business/mdaPlanningProcess/heatRateRecord/heatRateRecord.component';
import { SalesOffersComponent } from './safe/business/mdaPlanningProcess/salesOffers/salesOffers.component';
import { PerfilHomeComponent } from './compliance/business/perfil/home/perfilHome.component';
import { PlantsComponent } from './safe/admin/plants/plants.component';
import { FiscalRegimensSatComponent } from './safe/catalogsSat/fiscalRegimeSat/fiscalRegimensSat.component';
import { MoneysSatComponent } from './safe/catalogsSat/moneysSat/moneysSat.component';
import { PaymentMethodsSatComponent } from './safe/catalogsSat/paymentMethodsSat/paymentMethodsSat.component';
import { PaymentWaysSatComponent } from './safe/catalogsSat/paymentWaysSat/paymentWaysSat.component';
import { ProductsSatComponent } from './safe/catalogsSat/productsSat/productsSat.component';
import { RatesIvaSatComponent } from './safe/catalogsSat/ratesIvaSat/ratesIvaSat.component';
import { UnityProductsSatComponent } from './safe/catalogsSat/unityProductsSat/unityProductsSat.component';
import { UsesCfdiSatComponent } from './safe/catalogsSat/usesCfdiSat/usesCfdiSat.component';
import { TypesRelationSatComponent } from './safe/catalogsSat/typesRelationSat/typesRelationSat.component';
import { StatesComponent } from './safe/catalogs/states/states.component';
import { StatesEditComponent } from './safe/catalogs/states/edit/statesEdit.component';
import { MoneysComponent } from './safe/catalogs/moneys/moneys.component';
import { MoneysEditComponent } from './safe/catalogs/moneys/edit/moneysEdit.component';
import { BranchInvoiceSeriesComponent } from './safe/admin/branchInvoiceSeries/branchInvoiceSeries.component';
import { BranchInvoiceSeriesEditComponent } from './safe/admin/branchInvoiceSeries/edit/branchInvoiceSeriesEdit.component';
import { ClientsEditComponent } from './safe/admin/clients/edit/clientsEdit.component';
import { PlantsEditComponent } from './safe/admin/plants/edit/plantsEdit.component';
import { InvoicesEditComponent } from './safe/admin/invoices/edit/invoicesEdit.component';

import { MockUpHomeComponent } from './mockUp/home/mockUpHome.component';
import { MockUpHeaderComponent } from './mockUp/comun/header/mockUpHeader.component';
import { MatPaginatorIntlSpanish } from './core/helpers/apanishPaginatorIntl';
import { SalesOffersV2Component } from './safe/business/mdaPlanningProcess/salesOffersV2/salesOffersV2.component';
import { registerLocaleData } from '@angular/common';



import localePy from '@angular/common/locales/es-PY';
import { InvoicesComponent } from './safe/admin/invoices/invoices.component';
import { FuecdEditComponent } from './safe/admin/fuecd/edit/fuecdEdit.component';
import { FileUploadComponent } from './common/fileUpload/fileUpload.component';
import { ProgressComponent } from './common/progress/progress.component';
import { FuecdComponent } from './safe/admin/fuecd/fuecd.component';
import { FuecdInvoiceComponent } from './safe/admin/fuecd/invoice/fuecdInvoice.component';
import { FinancialIndexesComponent } from './safe/admin/financialIndexes/financialIndexes.component';
import { InppComponent } from './safe/admin/inpp/inpp.component';
import { UsppiComponent } from './safe/admin/usppi/usppi.component';
import { PlannedPowersPpaBComponent } from './safe/business/mdaPlanningProcess/planned-powers-ppa-b/planned-powers-ppa-b.component';
import { PlannedPowersPpaCComponent } from 'src/app/safe/business/mdaPlanningProcess/planned-powers-ppa-c/planned-powers-ppa-c.component';
import { PlannedPowersPPADComponent } from 'src/app/safe/business/mdaPlanningProcess/plannedPowersPpaD/plannedPowersPpaD.component';
import { PlannedPowersPPAEComponent } from 'src/app/safe/business/mdaPlanningProcess/plannedPowersPpaE/plannedPowersPpaE.component';
import { PlannedPowersPPAFComponent } from 'src/app/safe/business/mdaPlanningProcess/plannedPowersPpaF/plannedPowersPpaF.component';
import { PlannedPowersPPAGComponent } from 'src/app/safe/business/mdaPlanningProcess/plannedPowersPpaG/plannedPowersPpaG.component';
import { PlannedPowersPPAHComponent } from 'src/app/safe/business/mdaPlanningProcess/plannedPowersPpaH/plannedPowersPpaH.component';
import { PlannedPowersPPAIComponent } from 'src/app/safe/business/mdaPlanningProcess/plannedPowersPpaI/plannedPowersPpaI.component';
import { CreditNotesEditComponent } from './safe/admin/creditNotes/edit/creditNotesEdit.component';
import { DebitNotesEditComponent } from './safe/admin/debitNotes/edit/debitNotesEdit.component';
import { CreditNotesComponent } from './safe/admin/creditNotes/creditNotes.component';
import { DebitNotesComponent } from './safe/admin/debitNotes/debitNotes.component';
import { WeatherEditComponent } from './safe/admin/weather/edit/weatherEdit.component';
import { WeatherPpaComponent } from './safe/admin/weather/ppa/weatherPpa.component';
import { ChargeEditComponent } from './safe/admin/charge/edit/chargeEdit.component';
import { ChargePpaComponent } from './safe/admin/charge/ppa/chargePpa.component';
import { EnergyEditComponent } from './safe/admin/energy/edit/energyEdit.component';
import { EnergyPpaComponent } from './safe/admin/energy/ppa/energyPpa.component';
import { ModelMarketComponent } from './safe/admin/modelMarket/modelMarket.component';
import { BranchCreditNoteSeriesComponent } from './safe/admin/branchCreditNoteSeries/branchCreditNoteSeries.component';
import { BranchCreditNoteSeriesEditComponent } from './safe/admin/branchCreditNoteSeries/edit/branchCreditNoteSeriesEdit.component';

import { MenuItemsComponent }       from './compliance/comun/menu-items/menu-items.component';

//Se agregan al ejecutar ng build --prod
import { MonitoringJobsEditComponent } from '../app/safe/admin/monitoring/edit/monitoringJobsEdit.component';
import { DetailJobsComponent } from '../app/safe/admin/monitoring/detail/detailJobs.component';
import { MonitoringJobsComponent } from '../app/safe/admin/monitoring/monitoringJobs.component';
import { TwelveDigitsDirective } from '../app/core/helpers/twelve-digits';

import { PpaComponent } from '../app/safe/admin/modelMarket/ppa/ppa.component';

/* Module Monitoring */
import { MonitoringBaseSocketOnComponent }     from 'src/app/monitoring/class/monitoringBaseSocketOn.component';
import { MonitoringHomeComponent }             from 'src/app/monitoring/home/monitoringHome.component';
import { MonitoringHeaderComponent }           from 'src/app/monitoring/common/header/monitoringHeader.component';
import { MonitoringWelcomeComponent }          from 'src/app/monitoring/home/welcome/monitoringWelcome.component';
import { MonitoringSidebarComponent }          from 'src/app/monitoring/common/sidebar/monitoringSidebar.component';
import { MonitoringMenuItemsComponent }        from 'src/app/monitoring/common/menuItems/monitoringMenuItems.component';
import { MonitoringPhase3Component }           from 'src/app/monitoring/boards/phase3/monitoringPhase3.component';
import { MonitoringPhase2MockupComponent }     from 'src/app/monitoring/boards/phase2Mockup/monitoringPhase2Mockup.component';
import { MonitoringPhase2Component }           from 'src/app/monitoring/boards/phase2/monitoringPhase2.component';
import { MonitoringChartsControlsComponent }   from 'src/app/monitoring/common/chartsControls/monitoringChartsControls.component';

/* ./Module Monitoring */


registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    ProgressComponent,
    PerfilComponent,
    BehaviorComponent,
    SkillsComponent,
    LoginComponent,
    HomeComponent,
    ComplianceHomeComponent,
    ComplianceWelcomeComponent,
    AcquisitionsComponent,
    ConfigActivitiesComponent,
    LegalAgreementComponent,
    TablesLegalAgreementComponent, 
    ComplianceHeaderComponent,
    ComplianceSidebarComponent,
    EmployeesComponent,
    ActivitiesComponent,
    ComplianceTypesComponent,
    ComplianceTypesEditComponent,
    DashboardAComponent,
    DashboardBComponent,
    DashboardsComponent,
    ResponsibilitiesComponent,
    ObsyCommentsComponent,
    DepartmentsComponent,
    PeriodsComponent,
    DaysTypesComponent,
    ActivitiesEditComponent,
    CompetentStaffComponent,
    ComplianceTypesComponent,
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
    ClientsComponent,
    ClientsEditComponent,
    CatalogGenericComponent,
    CatalogGenericEditComponent,
    PmlComponent,
    WeatherComponent,
    PerfilHomeComponent,
    PlantsComponent,
    PlantsEditComponent,
    FiscalRegimensSatComponent,
    MoneysSatComponent,
    PaymentMethodsSatComponent,
    PaymentWaysSatComponent,
    ProductsSatComponent,
    RatesIvaSatComponent,
    UnityProductsSatComponent,
    UsesCfdiSatComponent,
    TypesRelationSatComponent,
    StatesComponent,
    StatesEditComponent,
    MoneysComponent,
    MoneysEditComponent,
    BranchInvoiceSeriesComponent,
    BranchInvoiceSeriesEditComponent,
    InvoicesEditComponent,
    InvoicesComponent,
    FuecdComponent,
    FuecdEditComponent,
    FuecdInvoiceComponent,
    FinancialIndexesComponent,
    InppComponent,
    UsppiComponent,
    CreditNotesEditComponent,
    DebitNotesEditComponent,
    CreditNotesComponent,
    DebitNotesComponent,
    WeatherEditComponent,
    WeatherPpaComponent,
    ChargeEditComponent,
    ChargePpaComponent,
    EnergyEditComponent,
    EnergyPpaComponent,
    ModelMarketComponent,
    BranchCreditNoteSeriesComponent,
    BranchCreditNoteSeriesEditComponent,


    MockUpHomeComponent,
    MockUpHeaderComponent,

    PlannedPowersPPAComponent,
    HeatRateRecordComponent,
    SalesOffersComponent,
    SalesOffersV2Component,
    SafeNewEventComponent,
    PlannedPowersPpaBComponent,
    PlannedPowersPpaCComponent,
    PlannedPowersPPADComponent,
    PlannedPowersPPAEComponent,
    PlannedPowersPPAFComponent,
    PlannedPowersPPAGComponent,
    PlannedPowersPPAHComponent,
    PlannedPowersPPAIComponent

    ,MenuItemsComponent    
    ,MonitoringJobsEditComponent
    ,DetailJobsComponent
    ,MonitoringJobsComponent
    ,TwelveDigitsDirective
    ,PpaComponent

    ,MonitoringHomeComponent
    ,MonitoringHeaderComponent
    ,MonitoringWelcomeComponent
    ,MonitoringSidebarComponent
    ,MonitoringMenuItemsComponent
    ,MonitoringPhase3Component
    ,MonitoringPhase2Component
    ,MonitoringPhase2MockupComponent
    ,MonitoringBaseSocketOnComponent
    ,MonitoringChartsControlsComponent
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
    EventService,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlSpanish },
    { provide: LOCALE_ID, useValue: 'es' } 
  ],
  entryComponents: [ ConfirmationDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }