import { NgModule }                 from '@angular/core';
import { ModuleWithProviders }      from '@angular/core';
import { CommonModule }             from '@angular/common';
import { ComplianceBusinessModule } from './business/complianceBusiness.module';
import { ComplianceCatalogsModule } from './catalogs/complianceCatalogs.module';
import { DashBoardsModule }         from './dashboards/complianceDashboards.module';
import { TaskObservacionComponent } from './administration/task-planning/home-edit/task-observacion/task-observacion.component';
 
@NgModule({
  imports: [
    CommonModule,
    ComplianceBusinessModule,
    ComplianceCatalogsModule,
    DashBoardsModule
  ],
})
export class ComplianceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComplianceModule
    }
  }
}
