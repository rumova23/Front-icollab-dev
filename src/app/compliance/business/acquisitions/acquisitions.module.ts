import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcquisitionsComponent } from './acquisitions.component';
import { CompetentStaffComponent } from './competentStaff/competentStaff.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AcquisitionsComponent,
    CompetentStaffComponent
  ],
  exports: [
    AcquisitionsComponent,
    CompetentStaffComponent
  ]
})
export class AcquisitionsModule { }