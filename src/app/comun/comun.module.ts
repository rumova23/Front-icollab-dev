import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'angular-bootstrap-md';
import { CalendarComponent } from './calendar/calendar.component';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { ConfirmationModalComponent } from './confirmationModal/confirmationModal.component';
import { HomeComponent } from './home/home.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ConfirmationDialogComponent } from './confirmationDialog/confirmationDialog.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BreadcrumbsComponent,
    CalendarComponent,
    CatalogsComponent,
    ConfirmationModalComponent,
    ConfirmationDialogComponent,
    HomeComponent
  ],
  exports: [
    BreadcrumbsComponent,
    CalendarComponent,
    CatalogsComponent,
    ConfirmationModalComponent,
    ConfirmationDialogComponent,
    HomeComponent
  ]
})
export class ComunModule2 { }