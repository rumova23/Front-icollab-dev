import { BrowserModule                         } from '@angular/platform-browser';
import { registerLocaleData                    } from '@angular/common';
import { LOCALE_ID, NgModule                   } from '@angular/core';
import { MDBBootstrapModule, DropdownModule    } from 'angular-bootstrap-md';
import { BlockUIModule                         } from 'ng-block-ui';

import { MatNativeDateModule, MatPaginatorIntl } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS   } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule      } from '@angular/forms';

import { BrowserAnimationsModule     } from '@angular/platform-browser/animations';
import { MatDatepickerModule         } from '@angular/material/datepicker';
import { NgbModule                   } from '@ng-bootstrap/ng-bootstrap';

import { APP_ROUTES                  } from './app-routing.module';
import { AppComponent                } from './app.component';

import { FlatpickrModule             } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory              } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule                } from 'ng6-toastr-notifications';

import { MaterialModule              } from './modules/material-module';
import { ConfirmationDialogService   } from './core/services/confirmation-dialog.service';
import { JwtInterceptor              } from './core/helpers/jwt.interceptor';
import { ErrorInterceptor            } from './core/helpers/error.interceptor';
import { EventService                } from './core/services/event.service';
import { Constants                   } from './core/globals/Constants';
import { MatPaginatorIntlSpanish     } from './core/helpers/apanishPaginatorIntl';
import { TwelveDigitsDirective       } from './core/helpers/twelve-digits';




//import { SecurityHomeComponent       } from './security/home/securityHome.component';
//import { SecurityHeaderComponent     } from './security/comun/header/securityHeader.component';
//import { SecuritySidebarComponent    } from './security/comun/sidebar/securitySidebar.component';
//import { UsersComponent              } from './security/admin/users/users.component';
//import { UsersEditComponent          } from './security/admin/users/edit/usersEdit.component';
//import { RolesComponent              } from './security/admin/roles/roles.component';
//import { RolesEditComponent          } from './security/admin/roles/edit/rolesEdit.component';
//import { GrantsComponent             } from './security/admin/grants/grants.component';
//import { GrantsEditComponent         } from './security/admin/grants/edit/grantsEdit.component';
//import { RolesGrantsComponent        } from './security/admin/roles/grants/rolesGrants.component';


import { TreeviewModule              } from 'ngx-treeview';

import { MockUpHomeComponent         } from './mockUp/home/mockUpHome.component';
import { MockUpHeaderComponent       } from './mockUp/comun/header/mockUpHeader.component';

import { LoginComponent              } from './common/login/login.component';
import { ConfirmationDialogComponent } from './common/confirmationDialog/confirmationDialog.component';
import { CalendarComponent           } from './common/calendar/calendar.component';
import { ChangePasswordComponent     } from './common/changePassword/changePassword.component';


import localePy from '@angular/common/locales/es-MX';



/* Modules */
import { MonitoringModule } from 'src/app/monitoring/monitoring.module';
import { SafeModule       } from 'src/app/safe/safe.module';
import { ComplianceModule } from 'src/app/compliance/complianceModule.module';
import { SecurityModule } from './security/security.module';
/* ./Modules */


registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmationDialogComponent,
    CalendarComponent,
    ChangePasswordComponent,
    

   

    MockUpHomeComponent,
    MockUpHeaderComponent

 
    ,TwelveDigitsDirective

  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
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