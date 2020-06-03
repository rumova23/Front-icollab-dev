import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BreadcrumbModule, IconsModule} from 'angular-bootstrap-md';
import {MatDatepickerModule, MatFormFieldModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../../common/components.module';
import { SafeListBinnacleEventsComponent } from './safe-import-event-log/safe-list-binnacle-events/safe-list-binnacle-events.component';
@NgModule({
    imports: [
        ReactiveFormsModule,
        BreadcrumbModule,
        MatFormFieldModule,
        MatDatepickerModule,
        TranslateModule,
        IconsModule,
        ComponentsModule
    ],
  declarations: [SafeListBinnacleEventsComponent],
  exports: [
  ]
})
export class SafeAdminModule { }
