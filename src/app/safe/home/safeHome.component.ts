import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { ProductsComponent } from '../admin/products/products.component';
import { ProductsEditComponent } from '../admin/products/edit/productsEdit.component';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ChangePasswordComponent } from 'src/app/comun/changePassword/changePassword.component';
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
import { EditClientsComponent } from '../admin/clients/edit/clientsEdit.component';
import { EditPlantsComponent } from '../admin/plants/edit/plantsEdit.component';
import { InvoicesEditComponent } from '../admin/invoices/edit/invoicesEdit.component';

@Component({
  selector: 'app-safeHome',
  templateUrl: './safeHome.component.html',
  styleUrls: ['./safeHome.component.scss'],
  entryComponents: [
    ProductsComponent, ProductsEditComponent, ChangePasswordComponent,
    UnityProductsComponent, UnityProductsEditComponent, ClientsComponent,
    EditClientsComponent, CatalogGenericComponent, CatalogGenericEditComponent,
    PmlComponent, WeatherComponent, EditPlantsComponent, PlantsComponent,
    FiscalRegimensSatComponent, MoneysSatComponent, PaymentMethodsSatComponent,
    PaymentWaysSatComponent, ProductsSatComponent, RatesIvaSatComponent,
    UnityProductsSatComponent, UsesCfdiSatComponent, TypesRelationSatComponent,
    StatesComponent, StatesEditComponent, MoneysComponent, MoneysEditComponent,
    BranchInvoiceSeriesComponent, BranchInvoiceSeriesEditComponent,
    InvoicesEditComponent
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

    /*
    this.eventService.sendMainSafe(new EventMessage(18, {
      readOnly: false,
      new: true,
      edit: false
    })); */

    /*
    this.eventService.sendMainSafe(new EventMessage(18, 'educationLevel'));
    */

  
    this.eventService.sendMainSafe(new EventMessage(20, { 
      readOnly:false,
      new:true,
      edit:false,
      invoice: {
      id:1,
      name:"AGUILA"
    }}));

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
        refProductsEdit.instance.idProduct = event.data.product.id;
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
        const factoryEditClients = this.componentFactoryResolver.resolveComponentFactory(EditClientsComponent);
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
          .resolveComponentFactory(EditPlantsComponent);
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
              const factoryInvoicesEdit = 
              this.componentFactoryResolver.resolveComponentFactory(InvoicesEditComponent);
              const refInvoicesEdit =
                this.viewContainerRef.createComponent(factoryInvoicesEdit);
                refInvoicesEdit.instance.entity = event.data;
                refInvoicesEdit.instance.invoiceSelected = 
                event.data.invoice;
                refInvoicesEdit.changeDetectorRef.detectChanges();
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
