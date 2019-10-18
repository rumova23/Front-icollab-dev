import { NgModule } from '@angular/core';
import { BrowserModule               } from '@angular/platform-browser';
import { LOGIN_ROUTES } from './login.routes';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule, DropdownModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../modules/material-module';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../common/components.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule, MatPaginatorIntl } from '@angular/material';
import { FlatpickrModule } from 'angularx-flatpickr';

import { CalendarModule, DateAdapter } from 'angular-calendar';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ng6-toastr-notifications';
import { TreeviewModule } from 'ngx-treeview';
import { BlockUIModule } from 'ng-block-ui';
import { Constants } from '../core/globals/Constants';
import { HomeComponent } from './home/home.component';
import { EventService } from '../core/services/event.service';
import { JwtInterceptor } from '../core/helpers/jwt.interceptor';
import { ErrorInterceptor } from '../core/helpers/error.interceptor';
import { MatPaginatorIntlSpanish } from '../core/helpers/apanishPaginatorIntl';



@NgModule({
	declarations: [
		LoginComponent
		,HomeComponent

	],
	exports: [

	],
	imports: [
		LOGIN_ROUTES,
		BrowserModule,
		FormsModule,
		
        MDBBootstrapModule.forRoot(),
        NgbModule,
        MaterialModule,
        SharedModule,


        ComponentsModule,
        
        

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
    ],
    providers: [
    ],
	
})
export class LoginModule { }