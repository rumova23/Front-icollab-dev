import { NgModule                    } from "@angular/core";
import { BrowserModule               } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule                 } from '@angular/forms';
import { SharedModule                } from 'src/app/shared/shared.module';
import { BITS_ROUTES                 } from './bits.routes';
import { BitsHomeComponent           } from './home/bits-home.component';
import { BitsWelcomeComponent } from './views/welcome/bits-welcome/bits-welcome.component';
import { BitsIncidentsEnvironmentalComponent } from './views/incidents/bits-incidents-environmental/bits-incidents-environmental.component';
import { BitsIncidentsEnvironmentalABCComponent } from './views/incidents/bits-incidents-environmental-abc/bits-incidents-environmental-abc.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ComponentsModule } from '../common/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../modules/material-module';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BlockUIModule } from 'ng-block-ui';
import { Constants } from '../core/globals/Constants';

@NgModule({
    declarations:[
        BitsHomeComponent,
        BitsWelcomeComponent,
        BitsIncidentsEnvironmentalComponent,
        BitsIncidentsEnvironmentalABCComponent
    ],
    exports:[
    ],
    imports:[
        BITS_ROUTES,
        BrowserModule,
        FormsModule,
        SharedModule,

        MDBBootstrapModule.forRoot(),
        ComponentsModule,
        NgbModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FlatpickrModule.forRoot(),
        ToastrModule.forRoot(),
        BlockUIModule.forRoot({message: Constants.LOADING_MEESSAGE})
    ]
})
export class BitsModule{}