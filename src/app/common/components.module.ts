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
import { BtnBlockComponent } from './btn/btn-block/btn-block.component';
import { BtnBlockDownloadComponent } from './btn/btn-block/btn-block-download.component';
import { BtnBlockImportComponent } from './btn/btn-block/btn-block-import.component';
import { BtnBlockCancelComponent } from './btn/btn-block/btn-block-cancel.component';
import { BtnBlockAceptComponent } from './btn/btn-block/btn-block-acept.component';
import { BtnBlockFinishComponent } from './btn/btn-block/btn-block-finish.component';
import { BtnBlockSaveUpdateComponent } from './btn/btn-block/btn-block-save-update.component';
import { BtnBlockSaveComponent } from './btn/btn-block/btn-block-save.component';
import { MatInputTextAutocompleteComponent } from './inputs/mat-input-text-autocomplete/mat-input-text-autocomplete.component';
import { MatInputDatepickerYearAndMonthComponent } from './inputs/mat-input-datepicker-year-and-month/mat-input-datepicker-year-and-month.component';
import { MatTableComponent } from './tables/mat-table/mat-table.component';
import { BtnBlockGraphComponent } from './btn/btn-block/btn-block-graph.component';
import { MatSelectComponent } from './inputs/mat-select/mat-select.component';
import { MatSelectMultipleComponent } from './inputs/mat-select-multiple/mat-select-multiple.component';
import { BtnBlockAddComponent } from './btn/btn-block/btn-block-add.component';
import { MatInputTimeComponent } from './inputs/mat-input-time/mat-input-time.component';
import { MatInputDatepickerComponent } from './inputs/mat-input-datepicker/mat-input-datepicker.component';
import { MatInputNumberComponent } from './inputs/mat-input-number/mat-input-number.component';
import { MatInputTextComponent } from './inputs/mat-input-text/mat-input-text.component';
import { MatDatetimelocalComponent } from './inputs/mat-datetimelocal/mat-datetimelocal.component';
import { MatInputPasswordComponent } from './inputs/mat-input-password/mat-input-password.component';
import { MatInputTextareaComponent } from './inputs/mat-input-textarea/mat-input-textarea.component';
import { BtnBlockBackComponent } from './btn/btn-block/btn-block-back.component';
import { BtnBlockDownloadLayoutComponent } from './btn/btn-block/btn-block-download-layout.component';
import { MatInputCheckboxComponent } from './inputs/mat-input-checkbox/mat-input-checkbox.component';
import { CheckboxWithSelectMultipleComponent } from './inputs/checkbox-with-select-multiple/checkbox-with-select-multiple.component';
import { CheckboxWithSelectComponent } from './inputs/checkbox-with-select/checkbox-with-select.component';
import { CheckboxWithNumberComponent } from './inputs/checkbox-with-number/checkbox-with-number.component';
import { CheckboxWithInputTextComponent } from './inputs/checkbox-with-input-text/checkbox-with-input-text.component';
import { BtnBlockSearchComponent } from './btn/btn-block/btn-block-search.component';
import { BtnBlockConsultComponent } from './btn/btn-block/btn-block-consult.component';
import { BtnBlockCleanComponent } from './btn/btn-block/btn-block-clean.component';
import { MatRadioButtonComponent } from './inputs/mat-radio-button/mat-radio-button.component';
import { ChartLineComponent } from './graphics/chart-line/chart-line.component';
import { BtnBlockSendComponent } from './btn/btn-block/btn-block-send.component';
import { BtnBlockRejectComponent } from './btn/btn-block/btn-block-reject.component';
import { MatInputDatepickerYearComponent } from './inputs/mat-input-datepicker-year/mat-input-datepicker-year.component';

@NgModule({
	declarations: [
		 ProgressComponent
		, FileUploadComponent
		, ConfirmationModalComponent
		, BreadcrumbsComponent
		, ChangePasswordComponent
		, ConfirmationDialogComponent
		, CalendarComponent
		, BtnBlockComponent
		, BtnBlockDownloadComponent
		, BtnBlockImportComponent
		, BtnBlockCancelComponent
		, BtnBlockAceptComponent
		, BtnBlockFinishComponent
		, BtnBlockSaveUpdateComponent
		, BtnBlockSaveComponent
		, MatInputTextAutocompleteComponent
		, MatInputDatepickerYearAndMonthComponent
		, MatTableComponent
		, BtnBlockGraphComponent
		, MatSelectComponent
		, MatSelectMultipleComponent
		, BtnBlockAddComponent
		, BtnBlockBackComponent
		, MatInputTimeComponent
		, MatInputDatepickerComponent
		, MatInputNumberComponent
		, MatInputTextComponent
		, MatDatetimelocalComponent
		, MatInputPasswordComponent
		, MatInputTextareaComponent
		, BtnBlockDownloadLayoutComponent
		, MatInputCheckboxComponent
		, CheckboxWithSelectMultipleComponent
		, CheckboxWithSelectComponent
		, CheckboxWithNumberComponent
		, CheckboxWithInputTextComponent
		, BtnBlockSearchComponent
		, BtnBlockConsultComponent
		, BtnBlockCleanComponent
		, MatRadioButtonComponent
		, ChartLineComponent
		, BtnBlockSendComponent
		, BtnBlockRejectComponent
		, MatInputDatepickerYearComponent
	],
	exports: [
		 ProgressComponent
		, FileUploadComponent
		, ConfirmationModalComponent
		, BreadcrumbsComponent
		, ChangePasswordComponent
		, ConfirmationDialogComponent
		, CalendarComponent
		, BtnBlockComponent
		, BtnBlockDownloadComponent
		, BtnBlockImportComponent
		, BtnBlockCancelComponent
		, BtnBlockAceptComponent
		, BtnBlockFinishComponent
		, BtnBlockSaveUpdateComponent
		, BtnBlockSaveComponent
		, BtnBlockBackComponent
		, MatInputTextAutocompleteComponent
		, MatInputDatepickerYearAndMonthComponent
		, MatTableComponent
		, BtnBlockGraphComponent
		, MatSelectComponent
		, MatSelectMultipleComponent
		, BtnBlockAddComponent
		, MatInputTimeComponent
		, MatInputDatepickerComponent
		, MatInputNumberComponent
		, MatInputTextComponent
		, MatDatetimelocalComponent
		, MatInputPasswordComponent
		, MatInputTextareaComponent
		, BtnBlockDownloadLayoutComponent
		, MatInputCheckboxComponent
		, CheckboxWithSelectMultipleComponent
		, CheckboxWithSelectComponent
		, CheckboxWithNumberComponent
		, CheckboxWithInputTextComponent
		, BtnBlockSearchComponent
		, BtnBlockConsultComponent
		, BtnBlockCleanComponent
		, MatRadioButtonComponent
		, ChartLineComponent
		, BtnBlockSendComponent
		, BtnBlockRejectComponent
		, MatInputDatepickerYearComponent

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