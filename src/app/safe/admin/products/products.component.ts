import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { TypeProduct } from '../../models/TypeProduct.';
import { ProductSat } from '../../models/ProductSat';
import { Constants } from 'src/app/core/globals/Constants';
import { UnityProduct } from '../../models/UnityProduct';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  loading: boolean;
  cols: any[];
  filters = [
    { label: "Actividad", inputtype: "text" },
    { label: "Prefijo", inputtype: "text" },
    { label: "Activo", inputtype: "text" },
  ];
  filterBtn = { label: "buscar" };
  rowsPorPage = [50, 100, 250, 500];
  products: Array<Product>;
  typeProducts: Array<TypeProduct>;
  productsSat: Array<ProductSat>
  unityProducts: Array<UnityProduct>
  count: number;
  constructor(
    private productService: ProductService,
    public toastr: ToastrManager,
    private eventService: EventService,
    private globalService: GlobalService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.loadProductsSat();
    this.cols = [
      'id',
      'name',
      'description',
      'price',
      'active',
      "rateIvaTransfer",
      "ver",
      "modificar"
    ];
    this.loading = false;
  }

  private loadProducts() {
    this.productService.loadProducts()
      .subscribe(
        data => {
          this.products = data.resultado;
          for(var i = 0; i < this.products.length; i++) {
            console.log(this.products[i]);
           this.products[i].typeProduct = this.typeProducts.filter(entity =>
            entity.id === this.products[i].idTypeProduct)[0];
            this.products[i].productSat = this.productsSat.filter(entity =>
              entity.id === this.products[i].idProductSat)[0];
            this.products[i].unityProduct = this.unityProducts.filter(entity =>
                entity.id === this.products[i].idUnityProduct)[0];
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Productos');
        });
  }

  loadProductsSat() {
    this.productService.loadProductsSat()
      .subscribe(
        data => {
          this.productsSat = data.resultado;
          this.loadUnityProducts();
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Productos Sat');

        });
  }

  loadUnityProducts() {
    this.productService.loadUnityProducts()
      .subscribe(
        data => {
          this.unityProducts = data.resultado;
          this.loadTypeProducts();
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Unidas de Producto');

        });
  }

  loadTypeProducts() {
    this.productService.loadTypeProducts()
      .subscribe(
        data => {
          this.typeProducts = data.resultado;
          this.loadProducts();
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Tipos Productos ');
        });
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  newEntity() {
    this.eventService.sendMainSafe(new
      EventMessage(4, { readOnly: false, edit: false, new: true, user: {} }));
  }

  action(product: Product, option: number) {
    switch (option) {
      case 2:
        this.eventService.sendMainSafe(new
          EventMessage(4, { readOnly: true, edit: false, new: false, product: product }));
        break; 
      case 3:
        this.eventService.sendMainSafe(new
          EventMessage(4, { readOnly: false, edit: true, new: false, product: product }));
        break;
    }
  }

}
