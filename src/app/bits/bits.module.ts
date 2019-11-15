import { NgModule                    } from "@angular/core";
import { BrowserModule               } from '@angular/platform-browser';
import { FormsModule                 } from '@angular/forms';
import { SharedModule                } from 'src/app/shared/shared.module';
import { BITS_ROUTES                 } from './bits.routes';
import { BitsHomeComponent           } from './home/bits-home.component';

@NgModule({
    declarations:[
        BitsHomeComponent
    ],
    exports:[
    ],
    imports:[
        BITS_ROUTES,
        BrowserModule,
        FormsModule,
        SharedModule
    ]
})
export class BitsModule{}