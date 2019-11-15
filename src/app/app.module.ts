import { AppComponent              } from './app.component';
import { APP_ROUTES                } from './app-routing.module';
import { BrowserModule             } from '@angular/platform-browser';
import { registerLocaleData        } from '@angular/common';
import { LOCALE_ID, NgModule       } from '@angular/core';
import { BlockUIModule             } from 'ng-block-ui';

import { MatNativeDateModule       } from '@angular/material';
import { MatPaginatorIntl          } from '@angular/material';

import { HTTP_INTERCEPTORS         } from '@angular/common/http';

import { BrowserAnimationsModule   } from '@angular/platform-browser/animations';
import { MatDatepickerModule       } from '@angular/material/datepicker';

import { Constants                 } from './core/globals/Constants';
import { ConfirmationDialogService } from './core/services/confirmation-dialog.service';
import { EventService              } from './core/services/event.service';
import { JwtInterceptor            } from './core/helpers/jwt.interceptor';
import { ErrorInterceptor          } from './core/helpers/error.interceptor';
import { MatPaginatorIntlSpanish   } from './core/helpers/apanishPaginatorIntl';
import { TwelveDigitsDirective     } from './core/helpers/twelve-digits';


/* Modules */
import { LoginModule               } from 'src/app/login/login.module';
import { MonitoringModule          } from 'src/app/monitoring/monitoring.module';
import { SafeModule                } from 'src/app/safe/safe.module';
import { ComplianceModule          } from 'src/app/compliance/complianceModule.module';
import { SecurityModule            } from 'src/app/security/security.module';
import { RomsModule                } from 'src/app/roms/roms.module';
import { MockUpModule              } from 'src/app/mockUp/mockUpModule.module';
import { GateModule                } from './gate/gate.module';
/* ./Modules */
import  localePy                     from '@angular/common/locales/es-MX';


registerLocaleData(localePy, 'es');
@NgModule({
	declarations: [
		 AppComponent
		,TwelveDigitsDirective  //  ¿¿ ??
	],
	imports: [
		APP_ROUTES
		,BrowserModule
		,BlockUIModule.forRoot({message: Constants.LOADING_MEESSAGE})
		,MonitoringModule
		,SafeModule
		,ComplianceModule
		,SecurityModule
		,RomsModule
		,GateModule
		,MockUpModule
		,LoginModule // poner siempre al final
	],
	exports: [ BrowserAnimationsModule, MatDatepickerModule, MatNativeDateModule],
	providers: [
		ConfirmationDialogService,
		EventService,
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,   multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{ provide: MatPaginatorIntl,  useClass: MatPaginatorIntlSpanish },
		{ provide: LOCALE_ID, useValue: 'es' }
	],
	entryComponents: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
