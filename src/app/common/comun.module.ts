import { NgModule } from '@angular/core';
import { BrowserModule               } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './fileUpload/fileUpload.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  declarations: [
    ProgressComponent,
    FileUploadComponent,
  ],
  exports: [
    ProgressComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
  ]
})
export class ComunModule2 { }