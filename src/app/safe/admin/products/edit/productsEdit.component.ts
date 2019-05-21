import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { Entity } from 'src/app/core/models/Entity';
import { User } from 'src/app/security/models/User';
import { Product } from 'src/app/safe/models/Product';
import { ProductService } from 'src/app/safe/services/product.service';
import { TypeProduct } from 'src/app/safe/models/TypeProduct.';
import { ProductSat } from 'src/app/safe/models/ProductSat';
import { Constants } from 'src/app/core/globals/Constants';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { UnityProduct } from 'src/app/safe/models/UnityProduct';



@Component({
  selector: 'app-productsEdit',
  templateUrl: './productsEdit.component.html',
  styleUrls: ['./productsEdit.component.scss']
})
export class ProductsEditComponent implements OnInit {
  productForm: FormGroup;
  entity: Entity;
  product: Product;
  typeProducts: Array<TypeProduct>;
  productsSat: Array<ProductSat>
  unityProducts: Array<UnityProduct>
  productSelected: User;
  count: number;
  constructor(
    public toastr: ToastrManager,
    private router: Router,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private productService: ProductService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.loadTypeProducts();
    this.loadProductsSat();
    this.loadUnityProductsSat();
    this.productForm = this.fb.group({
      'code': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'active': new FormControl(false),
      'typeProduct': new FormControl('', Validators.required),
      'unityProduct': new FormControl('', Validators.required),
      'productSat': new FormControl('', Validators.required),
      'price': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1)
      ]),
      'rateIvaTransfer': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1)
      ])

    });
    if (this.entity.readOnly) {
      this.productForm.patchValue(this.productSelected);
      this.productForm.disable()
    } else if (this.entity.edit) {
      this.productForm.patchValue(this.productSelected);
      console.log(this.productForm.value);
    } else {
      this.product = {} as Product;
    }
  }

  loadTypeProducts() {
    this.productService.loadTypeProducts()
      .subscribe(
        data => {
          this.typeProducts = data.resultado;
          console.log(this.typeProducts);
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Tipos Productos ');
        });
  }

  loadProductsSat() {
    this.productService.loadProductsSat()
      .subscribe(
        data => {
          this.productsSat = data.resultado;
          for (var i = 0; i <= this.count; i++) {
            /*
            this.products[i].idUnityProductSat = this.product.unityProductSat.id;
            this.products[i].idTypeProduct = this.product.typeProduct.id; */
          }
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Productos Sat');

        });
  }

  loadUnityProductsSat() {
    this.productService.loadUnityProducts()
      .subscribe(
        data => {
          this.unityProducts = data.resultado;
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Unidas de Producto');

        });
  }

  getTitle() {
    return ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : "Agregar ") + "Producto";
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
    this.productService.saveProduct(this.product)
      .subscribe(
        data => {
          console.log(data);
          this.eventService.sendMainSafe(new EventMessage(3, null));
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, '');
        });
  }

}
