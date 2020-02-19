import { NgModule                            } from "@angular/core";
import { BrowserModule                       } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule    } from '@angular/forms';
import { NgbModule                           } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule                  } from 'angular-bootstrap-md';
import { SharedModule                        } from 'src/app/shared/shared.module';
import { MaterialModule                      } from 'src/app/modules/material-module';
import { MONITORING_ROUTES                   } from './monitoring.routes';
import { MonitoringBaseSocketOnComponent     } from './class/monitoringBaseSocketOn.component';
import { MonitoringChartTR                   } from './class/monitoringChartTR.component';
import { MonitoringChartsControlsComponent   } from './common/chartsControls/monitoringChartsControls.component';
import { MonitoringHomeComponent             } from './home/monitoringHome.component';
import { MonitoringWelcomeComponent          } from './welcome/monitoring-welcome.component';
import { MonitoringPhase2Component           } from './boards/phase2/monitoring-phase2.component';
import { MonitoringPhase3Component           } from './boards/phase3/monitoring-phase3.component';
import { InteractiveImageTurbineCT1Component } from './boards/phase3/components/interactive-image-turbine-ct1/interactive-image-turbine-ct1.component';
import { MonitoringMmMarketComponent         } from './boards/mmMarket/monitoringMmMarket.component';
import { Phase2v1Component } from './boards/phase2v1/phase2v1.component';
import {GaugesModule} from 'ng-canvas-gauges';
import { Phase2v2Component } from './boards/phase2v2/phase2v2.component';

@NgModule({
    declarations:[
        MonitoringHomeComponent,
        MonitoringWelcomeComponent,
        MonitoringPhase2Component,
        MonitoringPhase3Component,
        MonitoringChartsControlsComponent,
        MonitoringMmMarketComponent,
        MonitoringBaseSocketOnComponent,
        MonitoringChartTR,
        InteractiveImageTurbineCT1Component,
        Phase2v1Component,
        Phase2v2Component
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
        SharedModule,
        GaugesModule
    ]
})
export class MonitoringModule{}