import { NgModule } from '@angular/core';
import { BrowserModule               } from '@angular/platform-browser';

import { FileUploadComponent } from './fileUpload/fileUpload.component';
import { ProgressComponent } from './progress/progress.component';
import { ConfirmationModalComponent } from './confirmationModal/confirmationModal.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ChangePasswordComponent } from './changePassword/changePassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule, DropdownModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../modules/material-module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule,DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ng6-toastr-notifications';
import { TreeviewModule } from 'ngx-treeview';
import { BlockUIModule } from 'ng-block-ui';
import { Constants } from '../core/globals/Constants';
import { ConfirmationDialogComponent } from './confirmationDialog/confirmationDialog.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
	declarations: [
		 ProgressComponent
		,FileUploadComponent
		,ConfirmationModalComponent
		,BreadcrumbsComponent
		,ChangePasswordComponent
		,ConfirmationDialogComponent
		,CalendarComponent
	],
	exports: [
		 ProgressComponent
		,FileUploadComponent
		,ConfirmationModalComponent
		,BreadcrumbsComponent
		,ChangePasswordComponent
		,ConfirmationDialogComponent
		,CalendarComponent

	],
	imports: [
		BrowserModule,
		
		BrowserModule,
		FormsModule,
		
        MDBBootstrapModule.forRoot(),
        NgbModule,
        MaterialModule,
        SharedModule,


        
        

    HttpClientModule,
    DropdownModule.forRoot(),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule, ReactiveFormsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ToastrModule.forRoot(),
    TreeviewModule.forRoot(),
    BlockUIModule.forRoot({
      message: Constants.LOADING_MEESSAGE
    })
	],
	entryComponents: [ ConfirmationDialogComponent ],
})
export class ComponentsModule { }