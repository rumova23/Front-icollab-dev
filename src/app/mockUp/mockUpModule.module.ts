import { NgModule } from "@angular/core";
import { SharedModule } from '../shared/shared.module';
import { MOCKUP_ROUTES } from './mockUp.routes';
import { MockUpHomeComponent } from './home/mockUpHome.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations:[
        MockUpHomeComponent
    ],
    exports:[

    ],
    imports:[
        MOCKUP_ROUTES,
        BrowserModule,
        SharedModule,
    ]
})
export class MockUpModule{}