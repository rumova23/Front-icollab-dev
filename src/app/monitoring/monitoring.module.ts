import { NgModule                    } from "@angular/core";
import { BrowserModule               } from '@angular/platform-browser';
import { MonitoringHomeComponent     } from './home/monitoringHome.component';
import { MONITORING_ROUTES           } from './monitoring.routes';
import { SharedModule                } from 'src/app/shared/shared.module';
import { MonitoringWelcomeComponent  } from './welcome/monitoring-welcome.component';
import { MonitoringPhase2Component   } from './boards/phase2/monitoring-phase2.component';
import { MonitoringPhase3Component   } from './boards/phase3/monitoring-phase3.component';
import { MonitoringChartsControlsComponent } from './common/chartsControls/monitoringChartsControls.component';
import { MonitoringMmMarketComponent } from './boards/mmMarket/monitoringMmMarket.component';

import { MDBBootstrapModule          } from 'angular-bootstrap-md';
import { MaterialModule              } from 'src/app/modules/material-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations:[
        MonitoringHomeComponent,
        MonitoringWelcomeComponent,
        MonitoringPhase2Component,
        MonitoringPhase3Component,
        MonitoringChartsControlsComponent,
        MonitoringMmMarketComponent
    ],
    exports:[
    ],
    imports:[
        BrowserModule,
        MDBBootstrapModule.forRoot(),
        NgbModule,
        FormsModule,
        MaterialModule,
        MONITORING_ROUTES,
        SharedModule
    ]
})
export class MonitoringModule{}