import { NgModule                    } from "@angular/core";
import { BrowserModule               } from '@angular/platform-browser';
import { SharedModule                } from 'src/app/shared/shared.module';

import { MDBBootstrapModule, DropdownModule          } from 'angular-bootstrap-md';
import { MaterialModule              } from 'src/app/modules/material-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { COMPLIANCE_ROUTES } from './compliance.routes';
import { ComunModule2 } from '../common/comun.module';
import { UploadComponent } from './business/perfil/upload/upload.component';





import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FlatpickrModule } from 'angularx-flatpickr';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ng6-toastr-notifications';
import { TreeviewModule } from 'ngx-treeview';
import { BlockUIModule } from 'ng-block-ui';
import { Constants } from '../core/globals/Constants';
import { ObsyCommentsComponent } from './business/perfil/obsyComments/obsyComments.component';
import { ComplianceHomeComponent } from './home/complianceHome.component';







@NgModule({
    declarations:[
      ComplianceHomeComponent,
      UploadComponent,
      ObsyCommentsComponent
    ],
    exports:[
    ],
    imports:[
        BrowserModule,
        MDBBootstrapModule.forRoot(),
        NgbModule,
        FormsModule,
        MaterialModule,
        COMPLIANCE_ROUTES,
        SharedModule,
        ComunModule2,


        
    HttpClientModule,
    DropdownModule.forRoot(),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule, ReactiveFormsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ToastrModule.forRoot(),
    TreeviewModule.forRoot(),
    BlockUIModule.forRoot({
      message: Constants.LOADING_MEESSAGE
    })
    ]
    
})
export class ComplianceModule{}