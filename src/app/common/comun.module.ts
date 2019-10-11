import { NgModule } from '@angular/core';
import { BrowserModule               } from '@angular/platform-browser';

import { FileUploadComponent } from './fileUpload/fileUpload.component';
import { ProgressComponent } from './progress/progress.component';
import { ConfirmationModalComponent } from './confirmationModal/confirmationModal.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [
		 ProgressComponent
		,FileUploadComponent
		,ConfirmationModalComponent
		,BreadcrumbsComponent
		,HomeComponent

	],
	exports: [
		 ProgressComponent
		,FileUploadComponent
		,ConfirmationModalComponent
		,BreadcrumbsComponent
		,HomeComponent

	],
	imports: [
		BrowserModule,
	]
})
export class ComunModule2 { }