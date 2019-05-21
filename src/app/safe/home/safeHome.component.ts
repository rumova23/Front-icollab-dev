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

@Component({
  selector: 'app-safeHome',
  templateUrl: './safeHome.component.html',
  styleUrls: ['./safeHome.component.scss'],
  entryComponents: [
    ProductsComponent, ProductsEditComponent, ChangePasswordComponent,
    UnityProductsComponent,UnityProductsEditComponent, ClientsComponent
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
      case 100:
        const factoryChangePasword =
          this.componentFactoryResolver.resolveComponentFactory(ChangePasswordComponent);
        const refChangePasword =
          this.viewContainerRef.createComponent(factoryChangePasword);
        refChangePasword.changeDetectorRef.detectChanges();
        break;

    }
  }


}
