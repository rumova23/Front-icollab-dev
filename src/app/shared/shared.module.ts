import { NgModule                    } from "@angular/core";
import { BrowserModule               } from '@angular/platform-browser';
import { SharedHeaderComponent       } from './header/shared-header.component';
import { SharedFooterComponent       } from './footer/shared-footer.component';
import { SharedSidebarComponent      } from './sidebar/sidebar/shared-sidebar.component';
import { SharedSidebarMenuComponent  } from './sidebar/menu/shared-sidebar-menu.component';
import { SharedSidebarItemsComponent } from './sidebar/items/shared-sidebar-items.component';
import { CssComponent                } from './css/css.component';
import { ConnectSocketComponent      } from './socket/connectSocket.component';
import { TranslationComponent        } from './translation/translation.component';

import { MDBBootstrapModule          } from 'angular-bootstrap-md';
import { MaterialModule              } from 'src/app/modules/material-module';


/* translate */
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader              } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule     } from '@angular/common/http';
import { ConnectSocketChannelComponent    } from './socket/connectSocketChannel.component';
/*./translate */


@NgModule({
    declarations:[
        SharedHeaderComponent,
        SharedFooterComponent,
        SharedSidebarComponent,
        SharedSidebarMenuComponent,
        SharedSidebarItemsComponent,
        CssComponent,
        ConnectSocketComponent,
        ConnectSocketChannelComponent,
        TranslationComponent
    ],
    exports:[
        SharedHeaderComponent,
        SharedFooterComponent,
        SharedSidebarComponent,
        CssComponent,
        ConnectSocketComponent,
        ConnectSocketChannelComponent,
        TranslationComponent,
        TranslateModule
    ],
    imports:[
        BrowserModule
        
        ,HttpClientModule
        ,TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => {
                    return new TranslateHttpLoader(http);
                },
                deps: [ HttpClient ]
            }
        })

        ,MDBBootstrapModule.forRoot()
        ,MaterialModule
    ]

})
export class SharedModule{}