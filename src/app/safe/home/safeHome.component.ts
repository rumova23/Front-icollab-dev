import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { ProductsComponent } from '../admin/products/products.component';
import { ProductsEditComponent } from '../admin/products/edit/productsEdit.component';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ChangePasswordComponent } from 'src/app/comun/changePassword/changePassword.component';

@Component({
  selector: 'app-safeHome',
  templateUrl: './safeHome.component.html',
  styleUrls: ['./safeHome.component.scss'],
  entryComponents: [
    ProductsComponent, ProductsEditComponent,ChangePasswordComponent
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
