import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorComponent } from './behavior/behavior.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { ObsyCommentsComponent } from './obsyComments/obsyComments.component';
import { ResponsibilitiesComponent } from './responsibilities/responsibilities.component';
import { SkillsComponent } from './skills/skills.component';
import { UploadComponent } from './upload/upload.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BehaviorComponent,
    DashboardsComponent,
    ObsyCommentsComponent,
    ResponsibilitiesComponent,
    SkillsComponent,
    UploadComponent
  ],
  exports: [
    BehaviorComponent,
    DashboardsComponent,
    ObsyCommentsComponent,
    ResponsibilitiesComponent,
    SkillsComponent,
    UploadComponent
  ]
})
export class PerfilModule { }