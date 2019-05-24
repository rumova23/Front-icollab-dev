import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAComponent } from './dashboard-a/dashboard-a.component';
import { DashboardBComponent } from './dashboard-b/dashboard-b.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DashboardAComponent,
    DashboardBComponent
  ],
  exports: [
    DashboardAComponent,
    DashboardBComponent
  ]
})
export class DashBoardsModule { }