import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BreadcrumbModule, IconsModule} from 'angular-bootstrap-md';
import {MatDatepickerModule, MatFormFieldModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../../common/components.module';
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
  declarations: [],
  exports: [
  ]
})
export class SafeAdminModule { }
