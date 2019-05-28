import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplianceBusinessModule } from './business/complianceBusiness.module';
import { ComplianceCatalogsModule } from './catalogs/complianceCatalogs.module';
import { ComplianceHomeComponent } from './home/complianceHome.component';
import { DashBoardsModule } from './dashboards/complianceDashboards.module';

@NgModule({
  imports: [
    CommonModule,
    ComplianceBusinessModule,
    ComplianceCatalogsModule,
    DashBoardsModule
  ],
  declarations: [
    ComplianceHomeComponent
  ],
  exports: [
    ComplianceHomeComponent
  ]
})
export class ComplianceModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComplianceModule
    }
  }
}