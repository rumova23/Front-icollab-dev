import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { Entity } from 'src/app/core/models/Entity';
import { User } from 'src/app/security/models/User';
import { Product } from 'src/app/safe/models/Product';
import { MarketService } from 'src/app/safe/services/market.service';
import { TypeProduct } from 'src/app/safe/models/TypeProduct.';
import { ProductSat } from 'src/app/safe/models/ProductSat';
import { Constants } from 'src/app/core/globals/Constants';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { UnityProduct } from 'src/app/safe/models/UnityProduct';
import { System } from 'src/app/safe/models/System';
import { RateIvaSat } from 'src/app/safe/models/RateIvaSat';



@Component({
  selector: 'app-productsEdit',
  templateUrl: './productsEdit.component.html',
  styleUrls: ['./productsEdit.component.scss']
})
export class ProductsEditComponent implements OnInit {
  productForm: FormGroup;
  entity: Entity;
  product: Product;
  typesProduct: Array<TypeProduct>;
  productsSat: Array<ProductSat>;
  unityProducts: Array<UnityProduct>;
  systems: Array<System>;
  ratesIvaSat: Array<RateIvaSat>
  productSelected: Product;
  count: number;
  constructor(
    public toastr: ToastrManager,
    private router: Router,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private marketService: MarketService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.loadDataProducts();
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

  private loadDataProducts() {
    this.marketService.loadDataProducts(1)
      .subscribe(
        data => {
          this.typesProduct = data.resultado.typesProduct;
          this.productsSat = data.resultado.productsSat;
          this.unityProducts = data.resultado.unityProducts;
          this.systems = data.resultado.systems;
          this.ratesIvaSat = data.resultado.ratesIvaSat;
          if (this.entity.readOnly) {
            this.setData(1);
          } else if (this.entity.edit) {
            this.setData(2);
          } else {
            this.product = {} as Product;
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
        });
  }

  setData(option: number) {
    this.productSelected.typeProduct = this.typesProduct.filter(entity =>
      entity.id === this.productSelected.idTypeProduct)[0];
    this.productSelected.productSat = this.productsSat.filter(entity =>
      entity.id === this.productSelected.idProductSat)[0];
    this.productSelected.unityProduct = this.unityProducts.filter(entity =>
      entity.id === this.productSelected.idUnityProduct)[0];
    this.productForm.patchValue(this.productSelected);
    if (option == 1) {
      this.productForm.disable();
    }
  }

  getTitle() {
    return ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : "Agregar ") + "Producto / Servicio";
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  save(value) {
    console.log(value);
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
