import { NgModule                    } from "@angular/core";
import { BrowserModule               } from '@angular/platform-browser';
import { MonitoringHomeComponent     } from './home/monitoringHome.component';
import { MONITORING_ROUTES           } from './monitoring.routes';
import { SharedModule                } from 'src/app/shared/shared.module';
import { MonitoringWelcomeComponent  } from './welcome/monitoring-welcome.component';
import { MonitoringPhase2Component   } from './boards/phase2/monitoring-phase2.component';
import { MonitoringPhase3Component   } from './boards/phase3/monitoring-phase3.component';

@NgModule({
    declarations:[
        MonitoringHomeComponent,
        MonitoringWelcomeComponent,
        MonitoringPhase2Component,
        MonitoringPhase3Component
    ],
    exports:[
    ],
    imports:[
        BrowserModule,
        MONITORING_ROUTES,
        SharedModule
    ]
})
export class MonitoringModule{}