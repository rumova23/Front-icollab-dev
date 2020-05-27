import { NgModule } from "@angular/core";
import { SharedModule } from '../shared/shared.module';
import { MOCKUP_ROUTES } from './mockUp.routes';
import { MockUpHomeComponent } from './home/mockUpHome.component';
import { BrowserModule } from '@angular/platform-browser';
import { DocComponent } from './components/doc/doc.component';
import { MaterialModule } from 'src/app/modules/material-module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/common/components.module';

@NgModule({
    declarations:[
        MockUpHomeComponent,
        DocComponent
    ],
    exports:[

    ],
    imports:[
        MOCKUP_ROUTES,
        BrowserModule,
        SharedModule,

        
        FormsModule,
        MaterialModule,
        ComponentsModule,
    ]
})
export class MockUpModule{}