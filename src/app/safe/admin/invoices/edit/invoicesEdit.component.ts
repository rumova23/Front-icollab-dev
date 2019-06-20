import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Constants } from 'src/app/core/globals/Constants';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Entity } from 'src/app/core/models/Entity';
import { PaymentMethodSat } from 'src/app/safe/models/PaymentMethodSat';
import { PaymentWaySat } from 'src/app/safe/models/PaymentWaySat';
import { UseCfdiSat } from 'src/app/safe/models/UseCfdiSat';
import { Product } from 'src/app/safe/models/Product';
import { MarketService } from 'src/app/safe/services/market.service';
import { EventService } from 'src/app/core/services/event.service';
import { CatalogOrder } from 'src/app/core/models/CatalogOrder';
import { CatalogOrderFind } from 'src/app/core/models/CatalogOrderFind';
import { CatalogOrderSat } from 'src/app/core/models/CatalogOrderSat';
import { CatalogOrderSatFind } from 'src/app/core/models/CatalogOrderSatFind';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { Client } from 'src/app/safe/models/Client';
import { Money } from 'src/app/safe/models/Money';
import { CatalogOrderGeneric } from 'src/app/core/models/CatalogOrderGeneric';
import { Invoice } from 'src/app/safe/models/Invoice';
import { ItemInvoice } from 'src/app/safe/models/ItemInvoice';
import { TypeRelationSat } from 'src/app/safe/models/TypeRelationSat';
import { InvoiceProduct } from 'src/app/safe/models/InvoiceProduct';
import { SortUtils } from 'src/app/core/helpers/SortUtils';
import * as moment from 'moment';


@Component({
  selector: 'app-invoicesEdit',
  templateUrl: './invoicesEdit.component.html',
  styleUrls: ['./invoicesEdit.component.scss']
})

export class InvoicesEditComponent implements OnInit {
  formControls = new ItemInvoice().formControls;
  invoiceForm: FormGroup;
  entity: Entity;
  invoice: Invoice;
  invoiceSelected: Invoice;
  paymentConditions: Array<CatalogOrderGeneric>;
  moneys: Array<Money>;
  systems: Array<CatalogOrderGeneric>

  paymentMethods: Array<PaymentMethodSat>;
  paymentWays: Array<PaymentWaySat>;
  usesCfdi: Array<UseCfdiSat>;
  typesRelation: Array<TypeRelationSat>;

  products: Array<Product>;
  clients: Array<Client>;

  catalogs: Array<CatalogOrder> = new CatalogOrderFind().invoice;
  catalogsSat: Array<CatalogOrderSat> = new CatalogOrderSatFind().invoice;

  formControlsProduct = new ItemInvoice().formControlsProduct;

  productForm: FormGroup;
  invoiceProducts: Array<InvoiceProduct> = [];
  productsDatasource = new MatTableDataSource<InvoiceProduct>();
  productsColumns = ['product', 'quantity', 'unitValue',
  'amount', 'percentageIva', 'amountIva',
  'edit', 'rm'];
  editingProduct: boolean = false;
  idProduct = 0;

  clientSelected: Client = {};


  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(private globalService: GlobalService,
    private ngZone: NgZone, private marketService: MarketService,
    private catalogService: CatalogService,
    private fb: FormBuilder,
    private eventService: EventService,
    private toastr: ToastrManager) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.invoiceForm = this.fb.group({
      //datos de general
      'client': new FormControl('', Validators.required),
      'money': new FormControl('', Validators.required),
      'yearMarket': new FormControl(''),
      'monthMarket': new FormControl(''),
      'dayMarket': new FormControl(''),
      'yearClosing': new FormControl(''),
      'monthClosing': new FormControl(''),
      'sys': new FormControl('', Validators.required),
      'emails': new FormControl('', Validators.required),
      'paymentMethod': new FormControl('', Validators.required),
      'paymentCondition': new FormControl('', Validators.required),
      'paymentWay': new FormControl('', Validators.required),
      'useCfdi': new FormControl('', Validators.required),
      'typeRelation': new FormControl('', Validators.required),
      'account': new FormControl('', Validators.required),
      'subtotal': new FormControl(''),
      'percentageDiscount': new FormControl(''),
      'discountAmount': new FormControl(''),
      'subtotal2': new FormControl(''),
      'amountRateIvaTransfer': new FormControl(''),
      'total': new FormControl(''),
      'observations': new FormControl('', Validators.required)
    });
    this.invoiceForm.controls['yearMarket'].disable();
    this.invoiceForm.controls['monthMarket'].disable();
    this.invoiceForm.controls['dayMarket'].disable();
    this.invoiceForm.controls['yearClosing'].disable();
    this.invoiceForm.controls['monthClosing'].disable();

    this.invoiceForm.controls['subtotal'].disable();
    this.invoiceForm.controls['percentageDiscount'].disable();
    this.invoiceForm.controls['discountAmount'].disable();
    this.invoiceForm.controls['subtotal2'].disable();
    this.invoiceForm.controls['amountRateIvaTransfer'].disable();
    this.invoiceForm.controls['total'].disable();

    this.productForm = this.fb.group({
      'product': new FormControl('', Validators.required),
      'quantity': new FormControl('', Validators.required),
      'unitValue': new FormControl('', Validators.required)
    });

    this.loadCatalogs();
  }

  private loadCatalogs() {
    this.catalogService.list(this.catalogs)
      .subscribe(
        data => {
          const result = data.result;
          this.paymentConditions = result.filter(entity =>
            entity.catalog === 'paymentCondition')[0].data;
          this.systems = result.filter(entity =>
            entity.catalog === 'sys')[0].data;
          for (var i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (var a = 0; a < inputs.length; a++) {
              switch (inputs[a].formControlName) {
                case 'paymentCondition':
                  inputs[a].options = this.paymentConditions;
                  break;
                case 'sys':
                  inputs[a].options = this.systems;
                  break;
              }
            }
          }
          this.loadCatalogsSat();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Catálogos');
        });
  }

  private loadCatalogsSat() {
    this.catalogService.listSat(this.catalogsSat)
      .subscribe(
        data => {
          const result = data.result;
          this.paymentMethods = result.filter(entity =>
            entity.catalog === 'paymentMethod')[0].data;
          this.paymentWays = result.filter(entity =>
            entity.catalog === 'paymentWay')[0].data;
          this.usesCfdi = result.filter(entity =>
            entity.catalog === 'useCfdi')[0].data;
          this.typesRelation = result.filter(entity =>
            entity.catalog === 'typeRelation')[0].data;

          for (var i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (var a = 0; a < inputs.length; a++) {
              switch (inputs[a].formControlName) {
                case 'paymentMethod':
                  inputs[a].options = this.paymentMethods;
                  break;
                case 'paymentWay':
                  inputs[a].options = this.paymentWays;
                  break;
                case 'useCfdi':
                  inputs[a].options = this.usesCfdi;
                  break;
                case 'typeRelation':
                  inputs[a].options = this.typesRelation;
                  this.invoiceForm.controls['typeRelation'].setValue(
                    this.typesRelation.filter(entity =>
                      entity.id === 8)[0] // no aplica
                  );
                  break;
              }
            }
          }
          this.loadMoneys();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Catálogos del SAT');
        });
  }

  private loadMoneys() {
    this.catalogService.loadMoneys(1)
      .subscribe(
        data => {
          this.moneys = data.result;
          for (var i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (var a = 0; a < inputs.length; a++) {
              switch (inputs[a].formControlName) {
                case 'money':
                  inputs[a].options = this.moneys;
                  break;
              }
            }
          }
          this.loadClients();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Monedas');
        });
  }

  private loadClients() {
    this.marketService.loadClients(3)
      .subscribe(
        data => {
          this.clients = data.result;
          for (var i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (var a = 0; a < inputs.length; a++) {
              switch (inputs[a].formControlName) {
                case 'client':
                  inputs[a].options = this.clients;
                  break;
              }
            }
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clients');
        });
  }
  editProduct(product) {
    this.productForm.reset();
    console.log(product);
    this.idProduct = product.id;
    console.log(product);
    this.productForm.patchValue(product);
    this.editingProduct = true;
  }

  cancelProduct() {
    if (this.editingProduct) {
      this.editingProduct = false;
    }
    this.idProduct = 0;
    this.productForm.reset();
  }

  saveProduct(product) {
    if (this.editingProduct) {
      product.edit = true;
      this.invoiceProducts.splice(product, 1);
      this.editingProduct = false;
    }
    product.id = this.idProduct;
    this.idProduct = 0;
    product.amount = product.quantity * product.unitValue;
    console.log(product);
    this.invoiceProducts.push(product);
    console.log(this.invoiceProducts);
    this.productsDatasource.data = this.invoiceProducts;
    this.invoiceProducts.slice();
    this.productForm.reset();
  }

  deleteProduct(i) {
    this.invoiceProducts.splice(i, 1);
    this.productsDatasource.data = this.invoiceProducts;
  }


  getTitle() {
    return ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : " Agregar") +
      " Factura";
  }

  onSelect(value, input) {
    switch (input.formControlName) {
      case 'client':
        this.getProductsByClient(value.id);
        this.getClient(value.id);
        break;
      case 'sys':
        this.setSysVaue(value.id);
        break;
    }
  }

  getProductsByClient(id) {
    this.marketService.getProductsByClient(id)
      .subscribe(
        data => {
          this.products = data.result;
          for (var a = 0; a < this.formControlsProduct.length; a++) {
            switch (this.formControlsProduct[a].formControlName) {
              case 'product':
                this.formControlsProduct[a].options = this.products;
                break;
            }
          }

        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Estados');
        });
  }

  getClient(id) {
    this.marketService.getClient(id)
      .subscribe(
        data => {
          this.clientSelected = data.result;
          console.log(this.clientSelected);
          this.invoiceForm.controls['emails'].setValue(this.clientSelected.emailInvoice);
          this.invoiceForm.controls['paymentCondition'].setValue(
            this.paymentConditions.filter(entity =>
              entity.id === this.clientSelected.idPaymentCondition)[0]
          );
          this.invoiceForm.controls['paymentWay'].setValue(
            this.paymentWays.filter(entity =>
              entity.id === this.clientSelected.idPaymentWay)[0]
          );
          SortUtils.sortByProperty(this.clientSelected.clientAccounts, 'id', 'DESC');
          this.invoiceForm.controls['account'].setValue(
            this.clientSelected.clientAccounts[0].account
          );
          this.invoiceForm.controls['paymentMethod'].setValue(
            this.paymentWays.filter(entity =>
              entity.id === this.clientSelected.fiscalData.idPaymentMethod)[0]
          );
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Client');
        });
  }

  setSysVaue(value) {
    switch (value) {
      case 1:
        this.invoiceForm.controls['yearMarket'].setValue(null);
        this.invoiceForm.controls['monthMarket'].setValue(null);
        this.invoiceForm.controls['dayMarket'].setValue(null);
        this.invoiceForm.controls['yearClosing'].setValue(this.getYear());
        this.invoiceForm.controls['monthClosing'].setValue(this.getMonth());
        break;
      case 2:
        this.invoiceForm.controls['yearMarket'].setValue(this.getYear());
        this.invoiceForm.controls['monthMarket'].setValue(this.getMonth());
        this.invoiceForm.controls['dayMarket'].setValue(this.getDay());
        this.invoiceForm.controls['yearClosing'].setValue(null);
        this.invoiceForm.controls['monthClosing'].setValue(null);
        break;
    }
  }
  getYear() {
    return moment(new Date()).year();
  }

  getMonth() {
    return moment(new Date()).month() + 1;
  }

  getDay() {
    return moment(new Date()).date();
  }

  save(value) {
    console.log(value);
  }
}
