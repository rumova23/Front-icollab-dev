import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { ProductsComponent } from '../admin/products/products.component';
import { ProductsEditComponent } from '../admin/products/edit/productsEdit.component';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ChangePasswordComponent } from 'src/app/common/changePassword/changePassword.component';
import { UnityProductsComponent } from '../catalogs/unityProducts/unityProducts.component';
import { UnityProductsEditComponent } from '../catalogs/unityProducts/edit/unityProductsEdit.component';
import { ClientsComponent } from '../admin/clients/clients.component';
import { CatalogGenericComponent } from '../catalogs/generic/catalogGeneric.component';
import { CatalogGenericEditComponent } from '../catalogs/generic/edit/catalogGenericEdit.component';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { PmlComponent } from '../admin/pml/pml.component';
import { WeatherComponent } from '../admin/weather/weather.component';
import { PlantsComponent } from '../admin/plants/plants.component';
import { FiscalRegimensSatComponent } from '../catalogsSat/fiscalRegimeSat/fiscalRegimensSat.component';
import { MoneysSatComponent } from '../catalogsSat/moneysSat/moneysSat.component';
import { PaymentMethodsSatComponent } from '../catalogsSat/paymentMethodsSat/paymentMethodsSat.component';
import { PaymentWaysSatComponent } from '../catalogsSat/paymentWaysSat/paymentWaysSat.component';
import { ProductsSatComponent } from '../catalogsSat/productsSat/productsSat.component';
import { RatesIvaSatComponent } from '../catalogsSat/ratesIvaSat/ratesIvaSat.component';
import { UnityProductsSatComponent } from '../catalogsSat/unityProductsSat/unityProductsSat.component';
import { UsesCfdiSatComponent } from '../catalogsSat/usesCfdiSat/usesCfdiSat.component';
import { TypesRelationSatComponent } from '../catalogsSat/typesRelationSat/typesRelationSat.component';
import { StatesComponent } from '../catalogs/states/states.component';
import { StatesEditComponent } from '../catalogs/states/edit/statesEdit.component';
import { MoneysComponent } from '../catalogs/moneys/moneys.component';
import { MoneysEditComponent } from '../catalogs/moneys/edit/moneysEdit.component';
import { BranchInvoiceSeriesComponent } from '../admin/branchInvoiceSeries/branchInvoiceSeries.component';
import { BranchInvoiceSeriesEditComponent } from '../admin/branchInvoiceSeries/edit/branchInvoiceSeriesEdit.component';
import { ClientsEditComponent } from '../admin/clients/edit/clientsEdit.component';
import { PlantsEditComponent } from '../admin/plants/edit/plantsEdit.component';
import { InvoicesEditComponent } from '../admin/invoices/edit/invoicesEdit.component';
import { InvoicesComponent } from '../admin/invoices/invoices.component';
import { FuecdEditComponent } from '../admin/fuecd/edit/fuecdEdit.component';
import { FuecdComponent } from '../admin/fuecd/fuecd.component';
import { FuecdInvoiceComponent } from '../admin/fuecd/invoice/fuecdInvoice.component';
import { FinancialIndexesComponent } from '../admin/financialIndexes/financialIndexes.component';
import { InppComponent } from '../admin/inpp/inpp.component';
import { UsppiComponent } from '../admin/usppi/usppi.component';
import { CreditNotesEditComponent } from '../admin/creditNotes/edit/creditNotesEdit.component';
import { DebitNotesEditComponent } from '../admin/debitNotes/edit/debitNotesEdit.component';
import { CreditNotesComponent } from '../admin/creditNotes/creditNotes.component';
import { DebitNotesComponent } from '../admin/debitNotes/debitNotes.component';
import { WeatherEditComponent } from '../admin/weather/edit/weatherEdit.component';
import { WeatherPpaComponent } from '../admin/weather/ppa/weatherPpa.component';
import { ChargeEditComponent } from '../admin/charge/edit/chargeEdit.component';
import { ChargePpaComponent } from '../admin/charge/ppa/chargePpa.component';
import { EnergyEditComponent } from '../admin/energy/edit/energyEdit.component';
import { EnergyPpaComponent } from '../admin/energy/ppa/energyPpa.component';
import { ModelMarketComponent } from '../admin/modelMarket/modelMarket.component';

@Component({
  selector: 'app-safeHome',
  templateUrl: './safeHome.component.html',
  styleUrls: ['./safeHome.component.scss'],
  entryComponents: [
    ProductsComponent, ProductsEditComponent, ChangePasswordComponent,
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
    ModelMarketComponent
  ]
})
export class SafeHomeComponent implements OnInit {
  @Input() aside_open;
  public serviceSubscription: any;
  @ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(private route: ActivatedRoute,
    private globalService: GlobalService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private eventService: EventService) {
    this.serviceSubscription = this.eventService.onChangeMainSafe.subscribe({
      next: (event: EventMessage) => {
        console.log(event);
        switch (event.id) {
          case 1:
            this.aside_open = !this.aside_open;
            break;
          default:
            this.clickMenu(event);
            break;
        }
      }
    });
  }

  ngOnInit() {
    
    this.eventService.sendMainSafe(new EventMessage(38, {
      typeWeather: 'Humedad'
    })); 
    
    /*
    this.eventService.sendMainSafe(new EventMessage(38, {
      typeEnergy: 'Factor de Potencia'
    })); */

    /*
    this.eventService.sendMainSafe(new EventMessage(33, {
      readOnly: false,
      new: true,
      edit: false
    })); */

    /*
    this.eventService.sendMainSafe(new EventMessage(18, 'educationLevel'));
    */

    /*
     this.eventService.sendMainSafe(new EventMessage(20, { 
       readOnly:false,
       new:true,
       edit:false,
       invoice: {
       id:1,
       name:"AGUILA"
     }})); */

    /*
    this.eventService.sendMainSafe(new EventMessage(12, {
    })); */

  }

  private clickMenu(event: EventMessage): void {
    this.viewContainerRef.clear();
    switch (event.id) {
      case 3:
        const factoryProducts = this.componentFactoryResolver.resolveComponentFactory(ProductsComponent);
        const refProducts =
          this.viewContainerRef.createComponent(factoryProducts);
        refProducts.changeDetectorRef.detectChanges();
        break;
      case 4:
        const factoryProductsEdit = this.componentFactoryResolver.resolveComponentFactory(ProductsEditComponent);
        const refProductsEdit =
          this.viewContainerRef.createComponent(factoryProductsEdit);
        refProductsEdit.instance.entity = event.data;
        if (Validate(event.data.product)) {
          refProductsEdit.instance.idProduct = event.data.product.id;
        }
        refProductsEdit.changeDetectorRef.detectChanges();
        break;
      case 5:
        const factoryUnityProducts = this.componentFactoryResolver.resolveComponentFactory(UnityProductsComponent);
        const refUnityProducts =
          this.viewContainerRef.createComponent(factoryUnityProducts);
        refUnityProducts.changeDetectorRef.detectChanges();
        break;
      case 6:
        const factoryUnityProductsEdit = this.componentFactoryResolver.resolveComponentFactory(UnityProductsEditComponent);
        const refUnityProductsEdit =
          this.viewContainerRef.createComponent(factoryUnityProductsEdit);
        refUnityProductsEdit.instance.entity = event.data;
        refUnityProductsEdit.instance.unityProductSelect = event.data.unityProduct;
        refUnityProductsEdit.changeDetectorRef.detectChanges();
        break;
      case 7:
        const factoryClients = this.componentFactoryResolver.resolveComponentFactory(ClientsComponent);
        const refClients =
          this.viewContainerRef.createComponent(factoryClients);
        refClients.changeDetectorRef.detectChanges();
        break;
      case 8:
        const factoryEditClients = this.componentFactoryResolver.resolveComponentFactory(ClientsEditComponent);
        const refEditClients =
          this.viewContainerRef.createComponent(factoryEditClients);
        refEditClients.instance.entity = event.data;
        if (Validate(event.data.client)) {
          refEditClients.instance.idClient = event.data.client.id;
        }
        refEditClients.changeDetectorRef.detectChanges();
        break;
      case 9:
        const factoryCatalogGeneric = this.componentFactoryResolver.resolveComponentFactory(CatalogGenericComponent);
        const refCatalogGeneric =
          this.viewContainerRef.createComponent(factoryCatalogGeneric);
        refCatalogGeneric.instance.catalog = event.data;
        refCatalogGeneric.changeDetectorRef.detectChanges();
        break;
      case 10:
        const factoryCatalogGenericEdit = this.componentFactoryResolver.resolveComponentFactory(CatalogGenericEditComponent);
        const refCatalogGenericEdit =
          this.viewContainerRef.createComponent(factoryCatalogGenericEdit);
        refCatalogGenericEdit.instance.entity = event.data;
        refCatalogGenericEdit.instance.catalog = event.data.catalog;
        refCatalogGenericEdit.instance.catalogGenericSelected = event.data.generic;
        refCatalogGenericEdit.changeDetectorRef.detectChanges();
        break;
      case 11:
        const factoryPml = this.componentFactoryResolver.resolveComponentFactory(PmlComponent);
        const refPml =
          this.viewContainerRef.createComponent(factoryPml);
        refPml.changeDetectorRef.detectChanges();
        break;
      case 12:
        const factoryPlants = this.componentFactoryResolver
          .resolveComponentFactory(PlantsComponent);
        const refPlants =
          this.viewContainerRef.createComponent(factoryPlants);
        refPlants.changeDetectorRef.detectChanges();
        break;
      case 13:
        const factoryEditPlants = this.componentFactoryResolver
          .resolveComponentFactory(PlantsEditComponent);
        const refEditPlants =
          this.viewContainerRef.createComponent(factoryEditPlants);
        refEditPlants.instance.entity = event.data;
        if (Validate(event.data.plant)) {
          refEditPlants.instance.idPlant = event.data.plant.id;
        }
        refEditPlants.changeDetectorRef.detectChanges();
        break;
      case 14:
        const factoryStates = this.componentFactoryResolver
          .resolveComponentFactory(StatesComponent);
        const refStates =
          this.viewContainerRef.createComponent(factoryStates);
        refStates.changeDetectorRef.detectChanges();
        break;
      case 15:
        const factoryStatesEdit = this.componentFactoryResolver
          .resolveComponentFactory(StatesEditComponent);
        const refStatesEdit =
          this.viewContainerRef.createComponent(factoryStatesEdit);
        refStatesEdit.instance.entity = event.data;
        refStatesEdit.instance.stateSelect = event.data.state;
        refStatesEdit.changeDetectorRef.detectChanges();
        break;
      case 16:
        const factoryMoneys = this.componentFactoryResolver
          .resolveComponentFactory(MoneysComponent);
        const refMoneys =
          this.viewContainerRef.createComponent(factoryMoneys);
        refMoneys.changeDetectorRef.detectChanges();
        break;
      case 17:
        const factoryMoneysEdit = this.componentFactoryResolver
          .resolveComponentFactory(MoneysEditComponent);
        const refMoneysEdit =
          this.viewContainerRef.createComponent(factoryMoneysEdit);
        refMoneysEdit.instance.entity = event.data;
        refMoneysEdit.instance.moneySelect = event.data.money;
        refMoneysEdit.changeDetectorRef.detectChanges();
        break;

      case 18:
        const factoryBrancheInvoiceSeries = this.componentFactoryResolver
          .resolveComponentFactory(BranchInvoiceSeriesComponent);
        const refBrancheInvoiceSeries =
          this.viewContainerRef.createComponent(factoryBrancheInvoiceSeries);
        refBrancheInvoiceSeries.changeDetectorRef.detectChanges();
        break;
      case 19:
        const factoryBrancheInvoiceSeriesEdit =
          this.componentFactoryResolver.resolveComponentFactory(BranchInvoiceSeriesEditComponent);
        const refBrancheInvoiceSeriesEdit =
          this.viewContainerRef.createComponent(factoryBrancheInvoiceSeriesEdit);
        refBrancheInvoiceSeriesEdit.instance.entity = event.data;
        refBrancheInvoiceSeriesEdit.instance.branchOfficeInvoiceSerieSelected =
          event.data.branchOfficeInvoiceSerie;
        refBrancheInvoiceSeriesEdit.changeDetectorRef.detectChanges();
        break;
      case 20:
        const factoryInvoices = this.componentFactoryResolver
          .resolveComponentFactory(InvoicesComponent);
        const refInvoices =
          this.viewContainerRef.createComponent(factoryInvoices);
        refInvoices.changeDetectorRef.detectChanges();
        break;
      case 21:
        const factoryInvoicesEdit =
          this.componentFactoryResolver.resolveComponentFactory(InvoicesEditComponent);
        const refInvoicesEdit =
          this.viewContainerRef.createComponent(factoryInvoicesEdit);
        refInvoicesEdit.instance.entity = event.data;
        if (Validate(event.data.invoice)) {
          refInvoicesEdit.instance.invoiceSelected =
            event.data.invoice;
        }
        refInvoicesEdit.changeDetectorRef.detectChanges();
        break;
      case 22:
        const factoryFuecd =
          this.componentFactoryResolver.resolveComponentFactory(FuecdComponent);
        const refFuecd =
          this.viewContainerRef.createComponent(factoryFuecd);
        refFuecd.changeDetectorRef.detectChanges();
        break;
      case 23:
        const factoryFuecdEdit =
          this.componentFactoryResolver.resolveComponentFactory(FuecdEditComponent);
        const refFuecdEdit =
          this.viewContainerRef.createComponent(factoryFuecdEdit);
        refFuecdEdit.changeDetectorRef.detectChanges();
        break;
      case 24:
        const factoryFuecdInvoice =
          this.componentFactoryResolver.resolveComponentFactory(FuecdInvoiceComponent);
        const refFuecdInvoice =
          this.viewContainerRef.createComponent(factoryFuecdInvoice);
        if (Validate(event.data.fuecd)) {
          refFuecdInvoice.instance.idFuecd = event.data.fuecd.id;
        }
        refFuecdInvoice.changeDetectorRef.detectChanges();
        break;
      case 25:
        const factoryFinancialIndexes =
          this.componentFactoryResolver.resolveComponentFactory(FinancialIndexesComponent);
        const refFinalcialIndexes =
          this.viewContainerRef.createComponent(factoryFinancialIndexes);
        refFinalcialIndexes.changeDetectorRef.detectChanges();
        break;
      case 26:
        const factoryInpp =
          this.componentFactoryResolver.resolveComponentFactory(InppComponent);
        const refInpp =
          this.viewContainerRef.createComponent(factoryInpp);
        refInpp.changeDetectorRef.detectChanges();
        break;

      case 27:
        const factoryUsppi =
          this.componentFactoryResolver.resolveComponentFactory(UsppiComponent);
        const refUsppi =
          this.viewContainerRef.createComponent(factoryUsppi);
        refUsppi.changeDetectorRef.detectChanges();
        break;
      case 28:
        const factoryCreditNotes =
          this.componentFactoryResolver.resolveComponentFactory(CreditNotesComponent);
        const refCreditNotes =
          this.viewContainerRef.createComponent(factoryCreditNotes);
        refCreditNotes.changeDetectorRef.detectChanges();
        break;
      case 29:
        const factoryCreditNotesEdit =
          this.componentFactoryResolver.resolveComponentFactory(CreditNotesEditComponent);
        const refCreditNotesEdit =
          this.viewContainerRef.createComponent(factoryCreditNotesEdit);
        refCreditNotesEdit.instance.entity = event.data;
        if (Validate(event.data.creditNote)) {
          refCreditNotesEdit.instance.creditNoteSelected =
            event.data.creditNote;
        }
        refCreditNotesEdit.changeDetectorRef.detectChanges();
        break;
      case 30:
        const factoryDebitNotes =
          this.componentFactoryResolver.resolveComponentFactory(DebitNotesComponent);
        const refDebitNotes =
          this.viewContainerRef.createComponent(factoryDebitNotes);
        refDebitNotes.changeDetectorRef.detectChanges();
        break;
      case 31:
        const factoryDebitNotesEdit =
          this.componentFactoryResolver.resolveComponentFactory(DebitNotesEditComponent);
        const refDebitNotesEdit =
          this.viewContainerRef.createComponent(factoryDebitNotesEdit);
        refDebitNotesEdit.instance.entity = event.data;
        if (Validate(event.data.debitNote)) {
          refDebitNotesEdit.instance.debitNoteSelected =
            event.data.creditNote;
        }
        refDebitNotesEdit.changeDetectorRef.detectChanges();
        break;
      case 32:
        const factoryWeatherEdit =
          this.componentFactoryResolver.resolveComponentFactory(WeatherEditComponent);
        const refWeatherEdit =
          this.viewContainerRef.createComponent(factoryWeatherEdit);
        if (Validate(event.data)) {
          refWeatherEdit.instance.typeWeather = event.data.typeWeather;
        }
        refWeatherEdit.changeDetectorRef.detectChanges();
        break;
      case 33:
        const factoryWeatherPpa =
          this.componentFactoryResolver.resolveComponentFactory(WeatherPpaComponent);
        const refWeatherPpa =
          this.viewContainerRef.createComponent(factoryWeatherPpa);
        refWeatherPpa.changeDetectorRef.detectChanges();
        break;
      case 34:
        const factoryChargeEdit =
          this.componentFactoryResolver.resolveComponentFactory(ChargeEditComponent);
        const refChargeEdit =
          this.viewContainerRef.createComponent(factoryChargeEdit);
        if (Validate(event.data)) {
          refChargeEdit.instance.typeCharge = event.data.typeCharge;
        }
        refChargeEdit.changeDetectorRef.detectChanges();
        break;
      case 35:
        const factoryChargePpa =
          this.componentFactoryResolver.resolveComponentFactory(ChargePpaComponent);
        const refChargePpa =
          this.viewContainerRef.createComponent(factoryChargePpa);
        refChargePpa.changeDetectorRef.detectChanges();
        break;
      case 36:
        const factoryEnergyEdit =
          this.componentFactoryResolver.resolveComponentFactory(EnergyEditComponent);
        const refEnergyEdit =
          this.viewContainerRef.createComponent(factoryEnergyEdit);
        if (Validate(event.data)) {
          refEnergyEdit.instance.typeEnergy = event.data.typeEnergy;
        }
        refEnergyEdit.changeDetectorRef.detectChanges();
        break;
      case 37:
        const factoryEnergyPpa =
          this.componentFactoryResolver.resolveComponentFactory(EnergyPpaComponent);
        const refEnergyPpa =
          this.viewContainerRef.createComponent(factoryEnergyPpa);
        refEnergyPpa.changeDetectorRef.detectChanges();
        break;
        case 38:
          const factoryModelMarket =
            this.componentFactoryResolver.resolveComponentFactory(ModelMarketComponent);
          const refModelMarket =
            this.viewContainerRef.createComponent(factoryModelMarket);
            refModelMarket.changeDetectorRef.detectChanges();
          break;        
      case 100:
        const factoryChangePasword =
          this.componentFactoryResolver.resolveComponentFactory(ChangePasswordComponent);
        const refChangePasword =
          this.viewContainerRef.createComponent(factoryChangePasword);
        refChangePasword.changeDetectorRef.detectChanges();
        break;

      case 101:
        const factoryWeather =
          this.componentFactoryResolver.resolveComponentFactory(WeatherComponent);
        const refWeather =
          this.viewContainerRef.createComponent(factoryWeather);
        refWeather.changeDetectorRef.detectChanges();
        break;
      case 201:
        const factoryFiscalRegimensSat =
          this.componentFactoryResolver.resolveComponentFactory(FiscalRegimensSatComponent);
        const refFiscalRegimensSat =
          this.viewContainerRef.createComponent(factoryFiscalRegimensSat);
        refFiscalRegimensSat.changeDetectorRef.detectChanges();
        break;
      case 202:
        const factoryMoneysSat =
          this.componentFactoryResolver.resolveComponentFactory(MoneysSatComponent);
        const refMoneysSat =
          this.viewContainerRef.createComponent(factoryMoneysSat);
        refMoneysSat.changeDetectorRef.detectChanges();
        break;
      case 203:
        const factoryPaymentMethodsSat =
          this.componentFactoryResolver.resolveComponentFactory(PaymentMethodsSatComponent);
        const refaymentMethodsSat =
          this.viewContainerRef.createComponent(factoryPaymentMethodsSat);
        refaymentMethodsSat.changeDetectorRef.detectChanges();
        break;
      case 204:
        const factoryPaymentWaysSat =
          this.componentFactoryResolver.resolveComponentFactory(PaymentWaysSatComponent);
        const refPaymentWaysSat =
          this.viewContainerRef.createComponent(factoryPaymentWaysSat);
        refPaymentWaysSat.changeDetectorRef.detectChanges();
        break;
      case 205:
        const factoryProductsSat =
          this.componentFactoryResolver.resolveComponentFactory(ProductsSatComponent);
        const refProductsSat =
          this.viewContainerRef.createComponent(factoryProductsSat);
        refProductsSat.changeDetectorRef.detectChanges();
        break;
      case 206:
        const factoryRatesIvaSat =
          this.componentFactoryResolver.resolveComponentFactory(RatesIvaSatComponent);
        const refRatesIvaSat =
          this.viewContainerRef.createComponent(factoryRatesIvaSat);
        refRatesIvaSat.changeDetectorRef.detectChanges();
        break;
      case 207:
        const factoryUnityProductsSat =
          this.componentFactoryResolver.resolveComponentFactory(UnityProductsSatComponent);
        const refUnityProductsSat =
          this.viewContainerRef.createComponent(factoryUnityProductsSat);
        refUnityProductsSat.changeDetectorRef.detectChanges();
        break;
      case 208:
        const factoryUsesCfdiSat =
          this.componentFactoryResolver.resolveComponentFactory(UsesCfdiSatComponent);
        const refUsesCfdiSat =
          this.viewContainerRef.createComponent(factoryUsesCfdiSat);
        refUsesCfdiSat.changeDetectorRef.detectChanges();
        break;
      case 209:
        const factoryTypesRelationSat =
          this.componentFactoryResolver.resolveComponentFactory(TypesRelationSatComponent);
        const refTypesRelationSat =
          this.viewContainerRef.createComponent(factoryTypesRelationSat);
        refTypesRelationSat.changeDetectorRef.detectChanges();
        break;
    }
  }


}
