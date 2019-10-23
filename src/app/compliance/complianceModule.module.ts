import { NgModule }                 from '@angular/core';
import { ModuleWithProviders }      from '@angular/core';
import { CommonModule }             from '@angular/common';
import { ComplianceBusinessModule } from './business/complianceBusiness.module';
import { ComplianceCatalogsModule } from './catalogs/complianceCatalogs.module';
import { DashBoardsModule }         from './dashboards/complianceDashboards.module';
import {TemplateEditTaskComponent} from './administration/task-planning/home-edit/template-edit-task/template-edit-task.component';
 
@NgModule({
  imports: [
    CommonModule,
    ComplianceBusinessModule,
    ComplianceCatalogsModule,
    DashBoardsModule
  ],
  declarations: [TemplateEditTaskComponent]
})
export class ComplianceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComplianceModule
    }
  }
}
