import { NgModule                    } from "@angular/core";
import { BrowserModule               } from '@angular/platform-browser';
import { SharedHeaderComponent       } from './header/shared-header.component';
import { SharedFooterComponent       } from './footer/shared-footer.component';
import { SharedSidebarComponent      } from './sidebar/sidebar/shared-sidebar.component';
import { SharedSidebarMenuComponent  } from './sidebar/menu/shared-sidebar-menu.component';
import { SharedSidebarItemsComponent } from './sidebar/items/shared-sidebar-items.component';

import { MDBBootstrapModule          } from 'angular-bootstrap-md';


@NgModule({
    declarations:[
        SharedHeaderComponent,
        SharedFooterComponent,
        SharedSidebarComponent,
        SharedSidebarMenuComponent,
        SharedSidebarItemsComponent
    ],
    exports:[
        SharedHeaderComponent,
        SharedFooterComponent,
        SharedSidebarComponent,
        SharedSidebarMenuComponent,
        SharedSidebarItemsComponent
    ],
    imports:[
        BrowserModule,
        MDBBootstrapModule.forRoot(),
    ]

})
export class SharedModule{}