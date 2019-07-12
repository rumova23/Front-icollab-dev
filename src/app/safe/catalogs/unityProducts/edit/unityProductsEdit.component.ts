import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { Entity } from 'src/app/core/models/Entity';
import { Product } from 'src/app/safe/models/Product';
import { UnityProductSat } from 'src/app/safe/models/UnityProductSat';
import { Constants } from 'src/app/core/globals/Constants';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { UnityProduct } from 'src/app/safe/models/UnityProduct';
import { CatalogService } from 'src/app/core/services/catalog.service';



@Component({
  selector: 'app-unityProductsEdit',
  templateUrl: './unityProductsEdit.component.html',
  styleUrls: ['./unityProductsEdit.component.scss']
})
export class UnityProductsEditComponent implements OnInit {
  unityProductForm: FormGroup;
  entity: Entity;
  unityProduct: UnityProduct;
  unityProductSelect: UnityProduct;
  unityProductsSat: Array<UnityProductSat>
  count: number;
  constructor(
    public toastr: ToastrManager,
    private router: Router,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private catalogService: CatalogService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.loadUnityProductsSat();
    this.unityProductForm = this.fb.group({
      'code': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'active': new FormControl(false),
      'order': new FormControl('', Validators.required),
      'unityProductSat': new FormControl('', Validators.required)
    });
    if (this.entity.readOnly) {
      this.unityProductForm.patchValue(this.unityProductSelect);
      this.unityProductForm.disable()
    } else if (this.entity.edit) {
      this.unityProductForm.patchValue(this.unityProductSelect);
    } else {
      this.unityProduct = {} as Product;
    }
  }

  loadUnityProductsSat() {
    this.catalogService.getSat('unityProduct')
      .subscribe(
        data => {
          this.unityProductsSat = data;
          console.log(this.unityProductSelect);
            if (this.entity.readOnly) {
              this.unityProductSelect.unityProductSat = this.unityProductsSat.filter(unity =>
                unity.id === this.unityProductSelect.idUnityProductSat)[0];
              this.unityProductForm.patchValue(this.unityProductSelect);
              this.unityProductForm.disable()
            } else if (this.entity.edit) {
              this.unityProductSelect.unityProductSat = this.unityProductsSat.filter(unity =>
                unity.id === this.unityProductSelect.idUnityProductSat)[0];
              this.unityProductForm.patchValue(this.unityProductSelect);
            } else {
              this.unityProduct = {} as Product;
            }
          console.log(this.unityProductsSat);
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');

        });
  }

  getTitle() {
    return ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : "Agregar ") + " Unidad de Producto";
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  save(value) {
    this.unityProduct = value;
    this.unityProduct.id = (this.unityProductSelect !== null && this.unityProductSelect !== undefined &&
      this.unityProductSelect.id !== null && this.unityProductSelect.id !== undefined
    ) ? this.unityProductSelect.id : 0;
    this.unityProduct.save = this.entity.new;
    this.unityProduct.idUnityProductSat = this.unityProduct.unityProductSat.id;
    this.catalogService.saveUnityProduct(this.unityProduct)
      .subscribe(
        data => {
          this.eventService.sendMainSafe(new EventMessage(5, null));
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
        });
  }

}
