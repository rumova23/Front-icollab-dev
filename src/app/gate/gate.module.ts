import { NgModule                    } from "@angular/core";
import { BrowserModule               } from '@angular/platform-browser';
import { FormsModule                 } from '@angular/forms';
import { SharedModule                } from 'src/app/shared/shared.module';
import { GATE_ROUTES                 } from './gate.routes';
import { GateHomeComponent           } from './home/gate-home.component';

@NgModule({
    declarations:[
        GateHomeComponent
    ],
    exports:[
    ],
    imports:[
        GATE_ROUTES,
        BrowserModule,
        FormsModule,
        SharedModule
    ]
})
export class GateModule{}