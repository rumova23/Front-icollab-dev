import { NgModule                    } from "@angular/core";
import { BrowserModule               } from '@angular/platform-browser';
import { FormsModule                 } from '@angular/forms';
import { SharedModule                } from 'src/app/shared/shared.module';
import { ROMS_ROUTES                 } from './roms.routes';
import { RomsHomeComponent           } from './home/roms-home.component';

@NgModule({
    declarations:[
        RomsHomeComponent
    ],
    exports:[
    ],
    imports:[
        ROMS_ROUTES,
        BrowserModule,
        FormsModule,
        SharedModule
    ]
})
export class RomsModule{}