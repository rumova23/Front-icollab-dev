import { AppComponent                          } from './app.component';
import { APP_ROUTES                            } from './app-routing.module';
import { BrowserModule                         } from '@angular/platform-browser';
import { registerLocaleData                    } from '@angular/common';
import { LOCALE_ID, NgModule                   } from '@angular/core';
import { MDBBootstrapModule, DropdownModule    } from 'angular-bootstrap-md';
import { BlockUIModule                         } from 'ng-block-ui';

import { MatNativeDateModule, MatPaginatorIntl } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS   } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule      } from '@angular/forms';

import { BrowserAnimationsModule               } from '@angular/platform-browser/animations';
import { MatDatepickerModule                   } from '@angular/material/datepicker';
import { NgbModule                             } from '@ng-bootstrap/ng-bootstrap';


import { FlatpickrModule                       } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter           } from 'angular-calendar';
import { adapterFactory                        } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule                          } from 'ng6-toastr-notifications';

import { ConfirmationDialogService             } from './core/services/confirmation-dialog.service';
import { JwtInterceptor                        } from './core/helpers/jwt.interceptor';
import { ErrorInterceptor                      } from './core/helpers/error.interceptor';
import { EventService                          } from './core/services/event.service';
import { Constants                             } from './core/globals/Constants';
import { MatPaginatorIntlSpanish               } from './core/helpers/apanishPaginatorIntl';
import { TwelveDigitsDirective                 } from './core/helpers/twelve-digits';


import { TreeviewModule                        } from 'ngx-treeview';


import { LoginComponent                        } from './common/login/login.component';
import { ConfirmationDialogComponent           } from './common/confirmationDialog/confirmationDialog.component';
import { CalendarComponent                     } from './common/calendar/calendar.component';
import { ChangePasswordComponent               } from './common/changePassword/changePassword.component';


import localePy from '@angular/common/locales/es-MX';



/* Modules */
import { MaterialModule   } from './modules/material-module';
import { MonitoringModule } from 'src/app/monitoring/monitoring.module';
import { SafeModule       } from 'src/app/safe/safe.module';
import { ComplianceModule } from 'src/app/compliance/complianceModule.module';
import { SecurityModule   } from 'src/app/security/security.module';
import { MockUpModule     } from 'src/app/mockUp/mockUpModule.module';
/* ./Modules */


registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmationDialogComponent,
    CalendarComponent,
    ChangePasswordComponent,
    TwelveDigitsDirective

  ],
  imports: [
    APP_ROUTES,
    BrowserModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    DropdownModule.forRoot(),
    MaterialModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule, ReactiveFormsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModule,
    ToastrModule.forRoot(),
    TreeviewModule.forRoot(),
    BlockUIModule.forRoot({
      message: Constants.LOADING_MEESSAGE
    })
    ,MonitoringModule
    ,SafeModule
    ,ComplianceModule
    ,SecurityModule
    ,MockUpModule
  ],
  exports:[ BrowserAnimationsModule, MatDatepickerModule, MatNativeDateModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ConfirmationDialogService,
    EventService,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlSpanish },
    { provide: LOCALE_ID, useValue: 'es' } 
  ],
  entryComponents: [ ConfirmationDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }