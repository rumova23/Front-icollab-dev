import { NgModule } from '@angular/core';
import { PpaComponent } from './modelMarket/ppa/ppa.component';
//import { BranchInvoiceSeriesComponent } from './branchInvoiceSeries/branchInvoiceSeries.component';

@NgModule({
  imports: [
  ],
  declarations: [
    //BranchInvoiceSeriesComponent
  PpaComponent],
  exports: [
    //BranchInvoiceSeriesComponent
  ]
})
export class SafeAdminModule { }