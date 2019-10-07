import { NgModule                    } from "@angular/core";
import { BrowserModule               } from '@angular/platform-browser';
import { MonitoringHomeComponent     } from './home/monitoringHome.component';
import { MONITORING_ROUTES           } from './monitoring.routes';
import { SharedModule                } from 'src/app/shared/shared.module';
import { MonitoringWelcomeComponent  } from './welcome/monitoring-welcome.component';

@NgModule({
    declarations:[
        MonitoringHomeComponent,
        MonitoringWelcomeComponent
    ],
    exports:[
        MonitoringHomeComponent
    ],
    imports:[
        BrowserModule,
        MONITORING_ROUTES,
        SharedModule
    ]
})
export class MonitoringModule{}