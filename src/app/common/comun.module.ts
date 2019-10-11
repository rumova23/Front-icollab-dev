import { NgModule } from '@angular/core';
import { BrowserModule               } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './fileUpload/fileUpload.component';
import { ProgressComponent } from './progress/progress.component';
import { ConfirmationModalComponent } from './confirmationModal/confirmationModal.component';

@NgModule({
  declarations: [
    ProgressComponent,
    FileUploadComponent,
    ConfirmationModalComponent,
  ],
  exports: [
    ProgressComponent,
    FileUploadComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    BrowserModule,
  ]
})
export class ComunModule2 { }