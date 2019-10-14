import { NgModule                    } from "@angular/core";
import { BrowserModule               } from '@angular/platform-browser';
import { SharedModule                } from 'src/app/shared/shared.module';
import { MDBBootstrapModule,DropdownModule          } from 'angular-bootstrap-md';
import { MaterialModule              } from 'src/app/modules/material-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SECURITY_ROUTES } from './security.routes';
import { SecurityHomeComponent } from './home/securityHome.component';
import { SecurityHeaderComponent } from './comun/header/securityHeader.component';
import { SecuritySidebarComponent } from './comun/sidebar/securitySidebar.component';
import { UsersComponent } from './admin/users/users.component';
import { UsersEditComponent } from './admin/users/edit/usersEdit.component';
import { RolesComponent } from './admin/roles/roles.component';
import { RolesEditComponent } from './admin/roles/edit/rolesEdit.component';
import { GrantsComponent } from './admin/grants/grants.component';
import { GrantsEditComponent } from './admin/grants/edit/grantsEdit.component';
import { RolesGrantsComponent } from './admin/roles/grants/rolesGrants.component';





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
import { ComponentsModule } from '../common/components.module';







@NgModule({
    declarations:[
         SecurityHomeComponent
        ,SecurityHeaderComponent
        ,SecuritySidebarComponent
        ,UsersComponent
        ,UsersEditComponent
        ,RolesComponent
        ,RolesEditComponent
        ,GrantsComponent
        ,GrantsEditComponent
        ,RolesGrantsComponent
    ],
    exports:[
    ],
    imports:[
        BrowserModule,
        MDBBootstrapModule.forRoot(),
        NgbModule,
        FormsModule,
        MaterialModule,
        SECURITY_ROUTES,
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
        



    ]
})
export class SecurityModule{}