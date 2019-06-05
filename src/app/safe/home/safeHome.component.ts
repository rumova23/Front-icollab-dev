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
import { EditClientsComponent } from '../admin/clients/edit/editClients.component';
import { CatalogGenericComponent } from '../catalogs/generic/catalogGeneric.component';
import { CatalogGenericEditComponent } from '../catalogs/generic/edit/catalogGenericEdit.component';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { PmlComponent } from '../admin/pml/pml.component';
import { WeatherComponent } from '../admin/weather/weather.component';

@Component({
  selector: 'app-safeHome',
  templateUrl: './safeHome.component.html',
  styleUrls: ['./safeHome.component.scss'],
  entryComponents: [
    ProductsComponent, ProductsEditComponent, ChangePasswordComponent,
    UnityProductsComponent, UnityProductsEditComponent, ClientsComponent,
    EditClientsComponent, CatalogGenericComponent, CatalogGenericEditComponent,
    PmlComponent,WeatherComponent
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
    //this.eventService.sendMainSafe(new EventMessage(101, {}));
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
        refProductsEdit.instance.productSelected = event.data.product;
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
        if(Validate(event.data.client)) {
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
          const factoryPml= this.componentFactoryResolver.resolveComponentFactory(PmlComponent);
          const refPml =
            this.viewContainerRef.createComponent(factoryPml);
            refPml.changeDetectorRef.detectChanges();
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
  

    }
  }


}
