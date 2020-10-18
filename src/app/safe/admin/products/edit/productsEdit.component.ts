import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { Entity } from 'src/app/core/models/Entity';
import { Product } from 'src/app/safe/models/Product';
import { MarketService } from 'src/app/safe/services/market.service';
import { ProductSat } from 'src/app/safe/models/ProductSat';
import { Constants } from 'src/app/core/globals/Constants';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { UnityProduct } from 'src/app/safe/models/UnityProduct';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { CatalogOrder } from 'src/app/core/models/CatalogOrder';
import { CatalogOrderGeneric } from 'src/app/core/models/CatalogOrderGeneric';
import { CatalogOrderFind } from 'src/app/core/models/CatalogOrderFind';
import { CatalogOrderSat } from 'src/app/core/models/CatalogOrderSat';
import { CatalogOrderSatFind } from 'src/app/core/models/CatalogOrderSatFind';
import { RateIvaSat } from 'src/app/safe/models/RateIvaSat';



@Component({
  selector: 'app-productsEdit',
  templateUrl: './productsEdit.component.html',
  styleUrls: ['./productsEdit.component.scss']
})
export class ProductsEditComponent implements OnInit {
  productForm: FormGroup;
  entity: Entity;
  idProduct: number;
  product: Product;
  typesProduct: Array<CatalogOrderGeneric>;
  productsSat: Array<ProductSat>;
  unityProducts: Array<UnityProduct>;
  systems: Array<CatalogOrderGeneric>;
  ratesIvaSat: Array<RateIvaSat>
  productSelected: Product;
  count: number;
  catalogs: Array<CatalogOrder> = new CatalogOrderFind().product;
  catalogsSat: Array<CatalogOrderSat> = new CatalogOrderSatFind().product;
  constructor(
    public toastr: ToastrManager,
    private router: Router,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private marketService: MarketService,
    private catalogService: CatalogService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.loadCatalogs();
    this.productForm = this.fb.group({
      'code': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'active': new FormControl(false),
      'typeProduct': new FormControl('', Validators.required),
      'unityProduct': new FormControl('', Validators.required),
      'productSat': new FormControl('', Validators.required),
      'rateIvaSat': new FormControl('', Validators.required),
      'systems': new FormControl('', Validators.required),
      'price': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1)
      ])
    });
  }

  private loadCatalogs() {
    this.catalogService.list(this.catalogs)
      .subscribe(
        data => {
          const result = data;
          this.typesProduct = result.filter(entity =>
            entity.catalog === 'typeProduct')[0].data;
          this.systems = result.filter(entity =>
            entity.catalog === 'sys')[0].data;
          this.catalogService.listSat(this.catalogsSat)
            .subscribe(
              dat => {
                const res = dat;
                this.productsSat = res.filter(entity =>
                  entity.catalog === 'product')[0].data;
                this.ratesIvaSat = res.filter(entity =>
                  entity.catalog === 'rateIva')[0].data;
                this.catalogService.listUnityProduct(3)
                  .subscribe(
                    da => {
                      this.unityProducts = da;
                    },
                    errorDa => {
                      this.toastr.errorToastr(Constants.ERROR_LOAD, 'Unidad de productos');
                    });
                if (this.entity.readOnly) {
                  this.setData(1);
                } else if (this.entity.edit) {
                  this.setData(2);
                } else {
                  this.product = {} as Product;
                }
              },
              errorDat => {
                this.toastr.errorToastr(Constants.ERROR_LOAD, 'Catálogos del Sat');
              });
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Catálogos');
        });
  }

  setData(option: number) {
    this.marketService.getProduct(this.idProduct)
      .subscribe(
        data => {
          this.productSelected = data;
          this.productSelected.typeProduct = this.typesProduct.filter(entity =>
            entity.id === this.productSelected.idTypeProduct)[0];
          this.productSelected.productSat = this.productsSat.filter(entity =>
            entity.id === this.productSelected.idProductSat)[0];
          this.productSelected.unityProduct = this.unityProducts.filter(entity =>
            entity.id === this.productSelected.idUnityProduct)[0];
          this.productSelected.rateIvaSat = this.ratesIvaSat.filter(entity =>
              entity.id === this.productSelected.idRateIvaSat)[0];
          this.productForm.patchValue(this.productSelected);
          if (option == 1) {
            this.productForm.disable();
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Client');
        });
  }

  getTitle() {
    return ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : "Agregar ") + "Producto / Servicio";
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.code === o2.code && o1.id === o2.id;
  }

  save(value) {
    this.product = value;
    this.product.id = (this.productSelected !== null && this.productSelected !== undefined &&
      this.productSelected.id !== null && this.productSelected.id !== undefined
    ) ? this.productSelected.id : 0;
    this.product.save = this.entity.new;
    this.product.idProductSat = this.product.productSat.id;
    this.product.idUnityProduct = this.product.unityProduct.id;
    this.product.idTypeProduct = this.product.typeProduct.id;
    this.product.idRateIvaSat = this.product.rateIvaSat.id;
    this.marketService.saveProduct(this.product)
      .subscribe(
        data => {
          this.eventService.sendMainSafe(new EventMessage(3, null));
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
        });
  }

}
