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
import { SortUtils } from 'src/app/core/helpers/sort-utils';
import * as moment from 'moment';
import { RateIvaSat } from 'src/app/safe/models/RateIvaSat';
import { Plant } from 'src/app/security/models/Plant';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { EventMessage } from 'src/app/core/models/EventMessage';


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
  systems: Array<CatalogOrderGeneric>;

  paymentMethods: Array<PaymentMethodSat>;
  paymentWays: Array<PaymentWaySat>;
  usesCfdi: Array<UseCfdiSat>;
  typesRelation: Array<TypeRelationSat>;
  ratesIva: Array<RateIvaSat>;

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
  editingProduct = false;
  idProduct = 0;

  clientSelected: Client = {};
  plantSelected: Plant = {};

  // regex =  "/^\d{1,22}\.\d{1,12}$/";
  regex = '^[0-9]{1,12}?.?[0-9]{1,22}$';


  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(public globalService: GlobalService,
              private ngZone: NgZone, private marketService: MarketService,
              private catalogService: CatalogService,
              private fb: FormBuilder,
              private eventService: EventService,
              private toastr: ToastrManager) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.invoiceForm = this.fb.group({
      // datos de general
      plantBranchOffice: new FormControl('', Validators.required),
      plantDirection: new FormControl('', Validators.required),
      client: new FormControl('', Validators.required),
      money: new FormControl('', Validators.required),
      yearMarket: new FormControl(''),
      monthMarket: new FormControl(''),
      dayMarket: new FormControl(''),
      yearClosing: new FormControl(''),
      monthClosing: new FormControl(''),
      sys: new FormControl('', Validators.required),
      emails: new FormControl('', Validators.required),
      paymentMethod: new FormControl('', Validators.required),
      paymentCondition: new FormControl('', Validators.required),
      paymentWay: new FormControl('', Validators.required),
      useCfdi: new FormControl('', Validators.required),
      typeRelation: new FormControl('', Validators.required),
      account: new FormControl('', Validators.required),
      subtotal: new FormControl(''),
      percentageDiscount: new FormControl(''),
      discountAmount: new FormControl(''),
      subtotal2: new FormControl(''),
      amountRateIvaTransfer: new FormControl(''),
      total: new FormControl(''),
      observations: new FormControl('', Validators.required)
    });
    this.invoiceForm.controls.yearMarket.disable();
    this.invoiceForm.controls.monthMarket.disable();
    this.invoiceForm.controls.dayMarket.disable();
    this.invoiceForm.controls.yearClosing.disable();
    this.invoiceForm.controls.monthClosing.disable();

    this.invoiceForm.controls.subtotal.disable();
    this.invoiceForm.controls.percentageDiscount.disable();
    this.invoiceForm.controls.discountAmount.disable();
    this.invoiceForm.controls.subtotal2.disable();
    this.invoiceForm.controls.amountRateIvaTransfer.disable();
    this.invoiceForm.controls.total.disable();

    this.productForm = this.fb.group({
      product: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required,
      Validators.pattern(this.regex)]),
      unitValue: new FormControl('', [Validators.required,
      Validators.pattern(this.regex)])
    });

    this.loadCatalogs();
  }

  private loadCatalogs() {
    this.catalogService.list(this.catalogs)
      .subscribe(
        data => {
          const result = data;
          this.paymentConditions = result.filter(entity => entity.catalog === 'paymentCondition')[0].data;
          this.moneys = result.filter(entity => entity.catalog === 'money')[0].data;
          this.systems = result.filter(entity => entity.catalog === 'sys')[0].data;
          for (let i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (let a = 0; a < inputs.length; a++) {
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
          const result = data;
          this.paymentMethods = result.filter(entity =>
            entity.catalog === 'paymentMethod')[0].data;
          this.paymentWays = result.filter(entity =>
            entity.catalog === 'paymentWay')[0].data;
          this.usesCfdi = result.filter(entity =>
            entity.catalog === 'useCfdi')[0].data;
          this.typesRelation = result.filter(entity =>
            entity.catalog === 'typeRelation')[0].data;
          this.ratesIva = result.filter(entity =>
            entity.catalog === 'rateIva')[0].data;
          for (let i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (let a = 0; a < inputs.length; a++) {
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
                  this.invoiceForm.controls.typeRelation.setValue(
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
          this.moneys = data;
          for (let i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (let a = 0; a < inputs.length; a++) {
              switch (inputs[a].formControlName) {
                case 'money':
                  inputs[a].options = this.moneys;
                  break;
              }
            }
          }
          this.getClients();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Monedas');
        });
  }

  private getClients() {
    this.marketService.getClients(3)
      .subscribe(
        data => {
          this.clients = data;
          for (let i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (let a = 0; a < inputs.length; a++) {
              switch (inputs[a].formControlName) {
                case 'client':
                  inputs[a].options = this.clients;
                  break;
              }
            }
          }
          this.getPlant();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clients');
        });
  }

  private getPlant() {
    this.marketService.getPlant(1)
      .subscribe(
        data => {

            this.plantSelected = data;
            for (let i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (let a = 0; a < inputs.length; a++) {
              switch (inputs[a].formControlName) {
                case 'plantDirection':
                  inputs[a].options = this.plantSelected.plantDirections;
                  break;
                case 'plantBranchOffice':
                  inputs[a].options = this.plantSelected.plantBranches;
                  break;
              }
            }
          }
            this.setData();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, errorData.error.message);
        });
  }

  setData() {
    if (this.entity.readOnly) {
      this.getInvoice();
    }
  }

  getInvoice() {
    this.marketService.getInvoice(this.invoiceSelected.id)
      .subscribe(
        data => {
            this.invoiceSelected = data;
            this.invoiceSelected.client = this.clients.filter(entity =>
            entity.id === this.invoiceSelected.idClient)[0];
            this.invoiceSelected.sys = this.systems.filter(entity =>
            entity.id === this.invoiceSelected.idSys)[0];
            this.invoiceSelected.money = this.moneys.filter(entity =>
              entity.id === this.invoiceSelected.idMoney)[0];
            this.invoiceSelected.paymentMethod = this.paymentMethods.filter(entity =>
                entity.id === this.invoiceSelected.idPaymentMethod)[0];
            this.invoiceSelected.paymentWay = this.paymentWays.filter(entity =>
            entity.id === this.invoiceSelected.idPaymentWay)[0];
            this.invoiceSelected.paymentCondition = this.paymentConditions.filter(entity =>
            entity.id === this.invoiceSelected.idPaymentCondition)[0];
            this.invoiceSelected.useCfdi =  this.usesCfdi.filter(entity =>
            entity.id === this.invoiceSelected.idUseCfdi)[0];
            this.marketService.getClient(this.invoiceSelected.idClient)
            .subscribe(
              dataC => {
                  this.clientSelected = dataC;
                  this.invoiceSelected.plantBranchOffice = this.
                  plantSelected.plantBranches.filter(entity =>
                  entity.id === this.invoiceSelected.idPlantBranchOffice)[0];
                  this.invoiceSelected.plantDirection = this.
                  plantSelected.plantDirections.filter(entity =>
                  entity.id === this.invoiceSelected.idPlantDirection)[0];
                  this.invoiceProducts = this.invoiceSelected.invoiceProducts;
                  this.marketService.getProductsByClient(this.invoiceSelected.idClient)
                .subscribe(
                  dataP => {
                    this.products = dataP;
                    for (let a = 0; a < this.formControlsProduct.length; a++) {
                      switch (this.formControlsProduct[a].formControlName) {
                        case 'product':
                          this.formControlsProduct[a].options = this.products;
                          break;
                      }
                    }
                    for (let i = 0; i < this.invoiceProducts.length; i++) {
                      this.invoiceProducts[i].product = this.products.filter(entity =>
                        entity.id === this.invoiceProducts[i].idProduct)[0];
                    }
                    this.productsDatasource = new MatTableDataSource<any>(this.invoiceProducts);
                    this.invoiceForm.patchValue(this.invoiceSelected);
                    this.invoiceForm.disable();
                  },
                  errorDataP => {
                    this.toastr.errorToastr(Constants.ERROR_LOAD, 'Productos por cliente');
                  });
              },
              errorDataC => {
                this.toastr.errorToastr(Constants.ERROR_LOAD, 'Obtener Cliente');
              });
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, 'Obtener Factura');
        });
  }

  editProduct(product) {
    this.productForm.reset();
    this.idProduct = product.id;
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
    product.amount = Number(product.amount.toFixed(6));
    product.percentageIva = this.ratesIva.filter(entity =>
      entity.id === product.product.idRateIvaSat)[0].percentageIva;
    product.amountIva = Number((product.amount * product.percentageIva) / 100);

    this.invoiceProducts.push(product);
    const allAmounts = this.invoiceProducts.map(i => i.amount);

    const allIvas = this.invoiceProducts.map(i => i.amountIva);

    const subtotal = allAmounts.reduce((a, b) => a + b, 0);
    const amountRateIvaTransfer = allIvas.reduce((a, b) => a + b, 0);

    this.invoiceForm.controls.subtotal.setValue(subtotal);
    this.invoiceForm.controls.subtotal2.setValue(subtotal);
    this.invoiceForm.controls.amountRateIvaTransfer.setValue(amountRateIvaTransfer);
    this.invoiceForm.controls.total.setValue(subtotal + amountRateIvaTransfer);


    this.productsDatasource = new MatTableDataSource<any>(this.invoiceProducts);
    this.invoiceProducts.slice();
    this.productForm.reset();
  }

  deleteProduct(i) {
    this.invoiceProducts.splice(i, 1);
    this.productsDatasource = new MatTableDataSource<any>(this.invoiceProducts);
  }


  getTitle() {
    return ((this.entity.readOnly) ?
      'Consultar ' : (this.entity.edit) ? 'Editar ' : ' Agregar') +
      ' Factura';
  }

  onSelect(value, input) {
    value = this.invoiceForm.value[input.formControlName];
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
          this.products = data;
          for (let a = 0; a < this.formControlsProduct.length; a++) {
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
          this.clientSelected = data;
          this.invoiceForm.controls.emails.setValue(this.clientSelected.emailInvoice);
          this.invoiceForm.controls.paymentCondition.setValue(
            this.paymentConditions.filter(entity =>
              entity.id === this.clientSelected.idPaymentCondition)[0]
          );
          this.invoiceForm.controls.paymentWay.setValue(
            this.paymentWays.filter(entity =>
              entity.id === this.clientSelected.idPaymentWay)[0]
          );
          SortUtils.sortByProperty(this.clientSelected.clientAccounts, 'id', 'DESC');
          this.invoiceForm.controls.account.setValue(
            this.clientSelected.clientAccounts[0].account
          );
          this.invoiceForm.controls.paymentMethod.setValue(
            this.paymentWays.filter(entity =>
              entity.id === this.clientSelected.fiscalData.idPaymentMethod)[0]
          );
          this.setSysVaue(3);
          this.invoiceProducts = [];
          this.productsDatasource = new MatTableDataSource<any>(this.invoiceProducts);
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Client');
        });
  }

  setSysVaue(value) {
    if (this.entity.new) {
      switch (value) {
        case 1:
          this.invoiceForm.controls.yearMarket.setValue(null);
          this.invoiceForm.controls.monthMarket.setValue(null);
          this.invoiceForm.controls.dayMarket.setValue(null);
          this.invoiceForm.controls.yearClosing.setValue(this.getYear());
          this.invoiceForm.controls.monthClosing.setValue(this.getMonth());
          break;
        case 2:
          this.invoiceForm.controls.yearMarket.setValue(this.getYear());
          this.invoiceForm.controls.monthMarket.setValue(this.getMonth());
          this.invoiceForm.controls.dayMarket.setValue(this.getDay());
          this.invoiceForm.controls.yearClosing.setValue(null);
          this.invoiceForm.controls.monthClosing.setValue(null);
          break;
        case 3:
          this.invoiceForm.controls.yearMarket.setValue(null);
          this.invoiceForm.controls.monthMarket.setValue(null);
          this.invoiceForm.controls.dayMarket.setValue(null);
          this.invoiceForm.controls.yearClosing.setValue(null);
          this.invoiceForm.controls.monthClosing.setValue(null);
          break;
      }
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

  getPlantDirection(direction) {
    return direction.colony;
  }

  getPlantBranchOffice(direction) {
    return direction.name;
  }

  save(value) {
    if (!Validate(this.invoiceProducts)
      || this.invoiceProducts.length === 0) {
      this.toastr.errorToastr('Los productos de la factura no pueden ser vacíos',
        'Productos');
      return;
    }
    this.invoice = value;
    this.invoice.idSys = value.sys.id;
    this.invoice.idPlantBranchOffice = value.plantBranchOffice.id;
    this.invoice.idPlantDirection = value.plantDirection.id;
    this.invoice.idClient = value.client.id;
    this.invoice.idMoney = value.money.id;
    this.invoice.idPaymentMethod = value.paymentMethod.id;
    this.invoice.idPaymentCondition = value.paymentCondition.id;
    this.invoice.idPaymentWay = value.paymentWay.id;
    this.invoice.idUseCfdi = value.useCfdi.id;
    this.invoice.idTypeRelation = value.typeRelation.id;
    this.invoice.idPlantFiscalData = this.plantSelected.fiscalData.id;
    this.invoice.idClientFiscalData = this.clientSelected.fiscalData.id;

    this.invoice.subtotal = 0;
    this.invoice.save = this.entity.new;
    for (let i = 0; i < this.invoiceProducts.length; i++) {
      this.invoiceProducts[i].idProduct = this.invoiceProducts[i].product.id;
      this.invoice.subtotal += this.invoiceProducts[i].unitValue * this.invoiceProducts[i].quantity;
      this.invoice.amountRateIvaTransfer += ((this.invoiceProducts[i].unitValue * this.invoiceProducts[i].quantity) * this.invoiceProducts[i].percentageIva) / 100;
    }
    this.invoice.subtotal2 = this.invoice.subtotal;
    this.invoice.total = this.invoice.subtotal + this.invoice.amountRateIvaTransfer;
    this.invoice.invoiceProducts = this.invoiceProducts;
    this.marketService.saveInvoice(this.invoice)
      .subscribe(
        data => {
          this.eventService.sendMainSafe(new EventMessage(20, {}));
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, 'Facturas');
        });
  }

    download() {
        this.marketService.downloadInvoice(
            this.invoiceSelected.id
        ) .subscribe(
            dat => {
                const blob = new Blob([this.base64toBlob(dat.base64,
                    'application/pdf')], {});
                saveAs(blob, dat.nameFile);
                this.toastr.successToastr('Factura generada correctamente', 'Archivo PDF!');
            },
            errorData => {
                this.toastr.errorToastr(Constants.ERROR_LOAD, 'Error al descargar archivo');
            });
    }

    base64toBlob(base64Data, contentType) {
        contentType = contentType || '';
        const sliceSize = 1024;
        const byteCharacters = atob(base64Data);
        const bytesLength = byteCharacters.length;
        const slicesCount = Math.ceil(bytesLength / sliceSize);
        const byteArrays = new Array(slicesCount);
        for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            const begin = sliceIndex * sliceSize;
            const end = Math.min(begin + sliceSize, bytesLength);
            const bytes = new Array(end - begin);
            for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: contentType });
    }
}
