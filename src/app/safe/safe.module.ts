import { NgModule                    } from "@angular/core";
import { BrowserModule               } from '@angular/platform-browser';
import { SharedModule                } from 'src/app/shared/shared.module';

import { SAFE_ROUTES                 } from './safe.routes';

import { MDBBootstrapModule, DropdownModule          } from 'angular-bootstrap-md';
import { MaterialModule              } from 'src/app/modules/material-module';
import { NgbModule                   } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




import { SafeHomeComponent                } from './home/safeHome.component';
import { ProductsComponent                } from './admin/products/products.component';
import { ProductsEditComponent            } from './admin/products/edit/productsEdit.component';
import { UnityProductsComponent           } from './catalogs/unityProducts/unityProducts.component';
import { UnityProductsEditComponent       } from './catalogs/unityProducts/edit/unityProductsEdit.component';
import { ClientsComponent                 } from './admin/clients/clients.component';
import { ClientsEditComponent             } from './admin/clients/edit/clientsEdit.component';
import { CatalogGenericComponent          } from './catalogs/generic/catalogGeneric.component';
import { CatalogGenericEditComponent      } from './catalogs/generic/edit/catalogGenericEdit.component';
import { PmlComponent                     } from './admin/pml/pml.component';
import { WeatherComponent                 } from './admin/weather/weather.component';
import { PlantsEditComponent              } from './admin/plants/edit/plantsEdit.component';
import { PlantsComponent                  } from './admin/plants/plants.component';
import { FiscalRegimensSatComponent       } from './catalogsSat/fiscalRegimeSat/fiscalRegimensSat.component';
import { MoneysSatComponent               } from './catalogsSat/moneysSat/moneysSat.component';
import { PaymentMethodsSatComponent       } from './catalogsSat/paymentMethodsSat/paymentMethodsSat.component';
import { PaymentWaysSatComponent } from './catalogsSat/paymentWaysSat/paymentWaysSat.component';
import { ProductsSatComponent } from './catalogsSat/productsSat/productsSat.component';
import { RatesIvaSatComponent } from './catalogsSat/ratesIvaSat/ratesIvaSat.component';
import { UnityProductsSatComponent } from './catalogsSat/unityProductsSat/unityProductsSat.component';
import { UsesCfdiSatComponent } from './catalogsSat/usesCfdiSat/usesCfdiSat.component';
import { TypesRelationSatComponent } from './catalogsSat/typesRelationSat/typesRelationSat.component';
import { StatesComponent } from './catalogs/states/states.component';
import { StatesEditComponent } from './catalogs/states/edit/statesEdit.component';
import { MoneysComponent } from './catalogs/moneys/moneys.component';
import { MoneysEditComponent } from './catalogs/moneys/edit/moneysEdit.component';
import { BranchInvoiceSeriesComponent } from './admin/branchInvoiceSeries/branchInvoiceSeries.component';
import { BranchInvoiceSeriesEditComponent } from './admin/branchInvoiceSeries/edit/branchInvoiceSeriesEdit.component';
import { InvoicesEditComponent } from './admin/invoices/edit/invoicesEdit.component';
import { InvoicesComponent } from './admin/invoices/invoices.component';
import { FuecdComponent } from './admin/fuecd/fuecd.component';
import { FuecdEditComponent } from './admin/fuecd/edit/fuecdEdit.component';
import { FuecdInvoiceComponent } from './admin/fuecd/invoice/fuecdInvoice.component';
import { FinancialIndexesComponent } from './admin/financialIndexes/financialIndexes.component';
import { InppComponent } from './admin/inpp/inpp.component';
import { UsppiComponent } from './admin/usppi/usppi.component';
import { CreditNotesComponent } from './admin/creditNotes/creditNotes.component';
import { DebitNotesComponent } from './admin/debitNotes/debitNotes.component';
import { CreditNotesEditComponent } from './admin/creditNotes/edit/creditNotesEdit.component';
import { DebitNotesEditComponent } from './admin/debitNotes/edit/debitNotesEdit.component';
import { WeatherEditComponent } from './admin/weather/edit/weatherEdit.component';
import { WeatherPpaComponent } from './admin/weather/ppa/weatherPpa.component';
import { ChargeEditComponent } from './admin/charge/edit/chargeEdit.component';
import { ChargePpaComponent } from './admin/charge/ppa/chargePpa.component';
import { EnergyEditComponent } from './admin/energy/edit/energyEdit.component';
import { EnergyPpaComponent } from './admin/energy/ppa/energyPpa.component';
import { ModelMarketComponent } from './admin/modelMarket/modelMarket.component';
import { BranchCreditNoteSeriesComponent } from './admin/branchCreditNoteSeries/branchCreditNoteSeries.component';
import { BranchCreditNoteSeriesEditComponent } from './admin/branchCreditNoteSeries/edit/branchCreditNoteSeriesEdit.component';
import { PpaComponent } from './admin/modelMarket/ppa/ppa.component';






import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FlatpickrModule } from 'angularx-flatpickr';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ng6-toastr-notifications';
import { TreeviewModule } from 'ngx-treeview';
import { BlockUIModule } from 'ng-block-ui';
import { Constants } from '../core/globals/Constants';
import { ComunModule2 } from '../common/comun.module';








@NgModule({
    declarations:[

        SafeHomeComponent,
        ProductsComponent, ProductsEditComponent,
        UnityProductsComponent, UnityProductsEditComponent, ClientsComponent,
        ClientsEditComponent, CatalogGenericComponent, CatalogGenericEditComponent,
        PmlComponent, WeatherComponent, PlantsEditComponent, PlantsComponent,
        FiscalRegimensSatComponent, MoneysSatComponent, PaymentMethodsSatComponent,
        PaymentWaysSatComponent, ProductsSatComponent, RatesIvaSatComponent,
        UnityProductsSatComponent, UsesCfdiSatComponent, TypesRelationSatComponent,
        StatesComponent, StatesEditComponent, MoneysComponent, MoneysEditComponent,
        BranchInvoiceSeriesComponent, BranchInvoiceSeriesEditComponent,
        InvoicesEditComponent, InvoicesComponent, FuecdComponent, FuecdEditComponent,
        FuecdInvoiceComponent, FinancialIndexesComponent, InppComponent, UsppiComponent,
        CreditNotesComponent, DebitNotesComponent,
        CreditNotesEditComponent, DebitNotesEditComponent,
        WeatherEditComponent, WeatherPpaComponent,
        ChargeEditComponent, ChargePpaComponent,
        EnergyEditComponent, EnergyPpaComponent,
        ModelMarketComponent, BranchCreditNoteSeriesComponent,
        BranchCreditNoteSeriesEditComponent,
        PpaComponent

    ],
    exports:[
    ],
    imports:[
        BrowserModule,
        MDBBootstrapModule.forRoot(),
        NgbModule,
        FormsModule,
        MaterialModule,
        SAFE_ROUTES,
        SharedModule,


        ComunModule2,
        
        

    HttpClientModule,
    DropdownModule.forRoot(),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule, ReactiveFormsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ToastrModule.forRoot(),
    TreeviewModule.forRoot(),
    BlockUIModule.forRoot({
      message: Constants.LOADING_MEESSAGE
    })
    ]
})
export class SafeModule{}