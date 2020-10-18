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
import { TypeRelationSat } from 'src/app/safe/models/TypeRelationSat';
import { InvoiceProduct } from 'src/app/safe/models/InvoiceProduct';
import { SortUtils } from 'src/app/core/helpers/sort-utils';
import * as moment from 'moment';
import { RateIvaSat } from 'src/app/safe/models/RateIvaSat';
import { Plant } from 'src/app/security/models/Plant';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { ItemCreditNote } from 'src/app/safe/models/ItemCreditNote';
import { CreditNote } from 'src/app/safe/models/CreditNote';
import { CreditNoteProduct } from 'src/app/safe/models/CreditNoteProduct';


@Component({
  selector: 'app-creditsNotesEdit',
  templateUrl: './creditNotesEdit.component.html',
  styleUrls: ['./creditNotesEdit.component.scss']
})

export class CreditNotesEditComponent implements OnInit {
  formControls = new ItemCreditNote().formControls;
  creditNoteForm: FormGroup;
  entity: Entity;
  creditNote: CreditNote;
  creditNoteSelected: CreditNote;
  paymentConditions: Array<CatalogOrderGeneric>;
  moneys: Array<Money>;
  systems: Array<CatalogOrderGeneric>

  paymentMethods: Array<PaymentMethodSat>;
  paymentWays: Array<PaymentWaySat>;
  usesCfdi: Array<UseCfdiSat>;
  typesRelation: Array<TypeRelationSat>;
  ratesIva: Array<RateIvaSat>;

  invoices:Array<Invoice>;
  invoice:Invoice;
  products: Array<Product>;
  clients: Array<Client>;

  catalogs: Array<CatalogOrder> = new CatalogOrderFind().invoice;
  catalogsSat: Array<CatalogOrderSat> = new CatalogOrderSatFind().invoice;

  formControlsProduct = new ItemCreditNote().formControlsProduct;

  productForm: FormGroup;
  creditNoteProducts: Array<CreditNoteProduct> = [];
  productsDatasource = new MatTableDataSource<CreditNoteProduct>();
  productsColumns = ['product', 'quantity', 'unitValue',
    'amount', 'percentageIva', 'amountIva',
    'edit', 'rm'];
  editingProduct: boolean = false;
  idProduct = 0;

  clientSelected: Client = {};
  plantSelected: Plant = {}

  //regex =  "/^\d{1,22}\.\d{1,12}$/";
  regex = "^[0-9]{1,12}?.?[0-9]{1,22}$";


  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(public globalService: GlobalService,
    private ngZone: NgZone, private marketService: MarketService,
    private catalogService: CatalogService,
    private fb: FormBuilder,
    private eventService: EventService,
    private toastr: ToastrManager) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.creditNoteForm = this.fb.group({
      //datos de general
      'invoice': new FormControl('', Validators.required),
      'plantBranchOffice': new FormControl('', Validators.required),
      'plantDirection': new FormControl('', Validators.required),
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
    this.creditNoteForm.controls['yearMarket'].disable();
    this.creditNoteForm.controls['monthMarket'].disable();
    this.creditNoteForm.controls['dayMarket'].disable();
    this.creditNoteForm.controls['yearClosing'].disable();
    this.creditNoteForm.controls['monthClosing'].disable();

    this.creditNoteForm.controls['subtotal'].disable();
    this.creditNoteForm.controls['percentageDiscount'].disable();
    this.creditNoteForm.controls['discountAmount'].disable();
    this.creditNoteForm.controls['subtotal2'].disable();
    this.creditNoteForm.controls['amountRateIvaTransfer'].disable();
    this.creditNoteForm.controls['total'].disable();

    this.productForm = this.fb.group({
      'product': new FormControl('', Validators.required),
      'quantity': new FormControl('', [Validators.required,
      Validators.pattern(this.regex)]),
      'unitValue': new FormControl('', [Validators.required,
      Validators.pattern(this.regex)])
    });

    this.loadCatalogs();
  }

  private loadCatalogs() {
    this.catalogService.list(this.catalogs)
      .subscribe(
        data => {
          const result = data;
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
                  this.creditNoteForm.controls['typeRelation'].setValue(
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
          for (var i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (var a = 0; a < inputs.length; a++) {
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
          this.getInvoices();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Client');
        });
  }

  private getInvoices() {
    this.marketService.getInvoices(1)
      .subscribe(
        data => {
          this.invoices = data;
          for (var i = 0; i < this.formControls.length; i++) {
            const inputs = this.formControls[i].inputs;
            for (var a = 0; a < inputs.length; a++) {
              switch (inputs[a].formControlName) {
                case 'invoice':
                  inputs[a].options = this.invoices;
                  break;
              }
            }
          }
          this.setData();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clients');
        });
  }

  setData() {
    if (this.entity.readOnly) {
      this.getCreditNote();
    }
  }

  getCreditNote() {
    this.marketService.getCreditNote(this.creditNoteSelected.id)
      .subscribe(
        data => {
          this.creditNoteSelected = data;
          this.creditNoteSelected.invoice = this.invoices.filter(entity =>
            entity.id === this.creditNoteSelected.idInvoice)[0];
          this.creditNoteSelected.client = this.clients.filter(entity =>
            entity.id === this.creditNoteSelected.idClient)[0];
          this.creditNoteSelected.sys = this.systems.filter(entity =>
            entity.id === this.creditNoteSelected.idSys)[0];
          this.creditNoteSelected.money = this.moneys.filter(entity =>
              entity.id === this.creditNoteSelected.idMoney)[0];
          this.creditNoteSelected.paymentMethod = this.paymentMethods.filter(entity =>
                entity.id === this.creditNoteSelected.idPaymentMethod)[0];   
          this.creditNoteSelected.paymentWay = this.paymentWays.filter(entity =>
            entity.id === this.creditNoteSelected.idPaymentWay)[0];
          this.creditNoteSelected.paymentCondition = this.paymentConditions.filter(entity =>
            entity.id === this.creditNoteSelected.idPaymentCondition)[0];  
          this.creditNoteSelected.useCfdi =  this.usesCfdi.filter(entity =>
            entity.id === this.creditNoteSelected.idUseCfdi)[0];  
          this.marketService.getClient(this.creditNoteSelected.idClient)
            .subscribe(
              dataC => {
                this.clientSelected = dataC;
                this.creditNoteSelected.plantBranchOffice = this.
                  plantSelected.plantBranches.filter(entity =>
                  entity.id === this.creditNoteSelected.idPlantBranchOffice)[0];
                  this.creditNoteSelected.plantDirection = this.
                  plantSelected.plantDirections.filter(entity =>
                  entity.id === this.creditNoteSelected.idPlantDirection)[0];
                this.creditNoteProducts = this.creditNoteSelected.creditNoteProducts;
                this.marketService.getProductsByClient(this.creditNoteSelected.idClient)
                .subscribe(
                  dataP => {
                    this.products = dataP;
                    for (var a = 0; a < this.formControlsProduct.length; a++) {
                      switch (this.formControlsProduct[a].formControlName) {
                        case 'product':
                          this.formControlsProduct[a].options = this.products;
                          break;
                      }
                    }
                    for(let i =0; i < this.creditNoteProducts.length; i++) {
                      this.creditNoteProducts[i].product = this.products.filter(entity =>
                        entity.id === this.creditNoteProducts[i].idProduct)[0];
                    }
                    this.productsDatasource.data = this.creditNoteProducts;
                    this.creditNoteForm.patchValue(this.creditNoteSelected);
                    this.creditNoteForm.disable();
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
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Obtener NOta de Crédito');
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
      this.creditNoteProducts.splice(product, 1);
      this.editingProduct = false;
    }
    product.id = this.idProduct;
    this.idProduct = 0;
    product.amount = product.quantity * product.unitValue;
    product.amount = Number(product.amount.toFixed(6));
    product.percentageIva = this.ratesIva.filter(entity =>
      entity.id === product.product.idRateIvaSat)[0].percentageIva;
    product.amountIva = Number((product.amount * product.percentageIva) / 100);

    this.creditNoteProducts.push(product);
    const allAmounts = this.creditNoteProducts.map(i => i.amount);

    const allIvas = this.creditNoteProducts.map(i => i.amountIva);

    const subtotal = allAmounts.reduce((a, b) => a + b, 0);
    const amountRateIvaTransfer = allIvas.reduce((a, b) => a + b, 0);


    this.creditNoteForm.controls['subtotal'].setValue(subtotal);
    this.creditNoteForm.controls['subtotal2'].setValue(subtotal);
    this.creditNoteForm.controls['amountRateIvaTransfer'].setValue(amountRateIvaTransfer);
    this.creditNoteForm.controls['total'].setValue(subtotal + amountRateIvaTransfer);


    this.productsDatasource.data = this.creditNoteProducts;
    this.creditNoteProducts.slice();
    this.productForm.reset();
  }

  deleteProduct(i) {
    this.creditNoteProducts.splice(i, 1);
    this.productsDatasource.data = this.creditNoteProducts;
  }


  getTitle() {
    return ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : " Agregar") +
      " Nota Cŕedito";
  }

  onSelect(value, input) {
    switch (input.formControlName) {
      case 'invoice':

        this.invoice = value;
        this.creditNoteForm.patchValue(this.invoice);
          this.creditNoteForm.controls['invoice'].setValue(
            this.invoices.filter(entity =>
              entity.id === value.id)[0]
          );
          this.creditNoteForm.controls['paymentCondition'].setValue(
            this.paymentConditions.filter(entity =>
              entity.id === this.invoice.idPaymentCondition)[0]
          );
          this.creditNoteForm.controls['paymentWay'].setValue(
            this.paymentWays.filter(entity =>
              entity.id === this.invoice.idPaymentWay)[0]
          );
          this.creditNoteForm.controls['account'].setValue(
            this.invoice.account
          );
          this.creditNoteForm.controls['paymentMethod'].setValue(
            this.paymentWays.filter(entity =>
              entity.id === this.invoice.idPaymentMethod)[0]
          );
          this.creditNoteForm.controls['plantBranchOffice'].setValue(
            this.plantSelected.plantBranches.filter(entity =>
              entity.id === this.invoice.idPlantBranchOffice)[0]
          );
          this.creditNoteForm.controls['plantDirection'].setValue(
            this.plantSelected.plantDirections.filter(entity =>
              entity.id === this.invoice.idPlantDirection)[0]
          );
          this.creditNoteForm.controls['money'].setValue(
            this.moneys.filter(entity =>
              entity.id === this.invoice.idMoney)[0]
          );
          this.creditNoteForm.controls['sys'].setValue(
            this.systems.filter(entity =>
              entity.id === this.invoice.idSys)[0]
          );
          this.creditNoteForm.controls['paymentMethod'].setValue(
            this.paymentMethods.filter(entity =>
              entity.id === this.invoice.idPaymentMethod)[0]
          );
          this.creditNoteForm.controls['useCfdi'].setValue(
            this.usesCfdi.filter(entity =>
              entity.id === this.invoice.idUseCfdi)[0]
          );
          this.getProductsByClient(this.invoice.idClient);
          this.getClient(this.invoice.idClient);
        //this.getProductsByClient(value.id);
        //this.getClient(value.id);
        break;
    }
  }
  

  getProductsByClient(id) {
    this.marketService.getProductsByClient(id)
      .subscribe(
        data => {
          this.products = data;
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
          this.clientSelected = data;
          console.log(this.clientSelected);
          this.creditNoteForm.controls['emails'].setValue(this.clientSelected.emailInvoice);
          this.creditNoteForm.controls['paymentCondition'].setValue(
            this.paymentConditions.filter(entity =>
              entity.id === this.clientSelected.idPaymentCondition)[0]
          );
          this.creditNoteForm.controls['paymentWay'].setValue(
            this.paymentWays.filter(entity =>
              entity.id === this.clientSelected.idPaymentWay)[0]
          );
          SortUtils.sortByProperty(this.clientSelected.clientAccounts, 'id', 'DESC');
          this.creditNoteForm.controls['account'].setValue(
            this.clientSelected.clientAccounts[0].account
          );
          this.creditNoteForm.controls['paymentMethod'].setValue(
            this.paymentWays.filter(entity =>
              entity.id === this.clientSelected.fiscalData.idPaymentMethod)[0]
          );
          this.setSysVaue(3);
          this.creditNoteProducts = [];
          this.productsDatasource.data = this.creditNoteProducts;
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Client');
        });
  }

  setSysVaue(value) {
    if (this.entity.new) {
      switch (value) {
        case 1:
          this.creditNoteForm.controls['yearMarket'].setValue(null);
          this.creditNoteForm.controls['monthMarket'].setValue(null);
          this.creditNoteForm.controls['dayMarket'].setValue(null);
          this.creditNoteForm.controls['yearClosing'].setValue(this.getYear());
          this.creditNoteForm.controls['monthClosing'].setValue(this.getMonth());
          break;
        case 2:
          this.creditNoteForm.controls['yearMarket'].setValue(this.getYear());
          this.creditNoteForm.controls['monthMarket'].setValue(this.getMonth());
          this.creditNoteForm.controls['dayMarket'].setValue(this.getDay());
          this.creditNoteForm.controls['yearClosing'].setValue(null);
          this.creditNoteForm.controls['monthClosing'].setValue(null);
          break;
        case 3:
          this.creditNoteForm.controls['yearMarket'].setValue(null);
          this.creditNoteForm.controls['monthMarket'].setValue(null);
          this.creditNoteForm.controls['dayMarket'].setValue(null);
          this.creditNoteForm.controls['yearClosing'].setValue(null);
          this.creditNoteForm.controls['monthClosing'].setValue(null);
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

  getInvoice(invoice) {
    return invoice.serie +  ' - ' + invoice.number;
  }

  getPlantDirection(direction) {
    return direction.colony;
  }

  getPlantBranchOffice(direction) {
    return direction.colony;
  }

  save(value) {
    console.log(value);
    if (!Validate(this.creditNoteProducts)
      || this.creditNoteProducts.length === 0) {
      this.toastr.errorToastr("Los productos de la nota de crédito no pueden ser vacíos",
        'Productos');
      return;
    }
    console.log(this.clientSelected);
    this.creditNote = value;
    this.creditNote.idInvoice = this.invoice.id;
    this.creditNote.invoice = null;
    this.creditNote.idSys = value.sys.id;
    this.creditNote.idPlantBranchOffice = value.plantBranchOffice.id;
    this.creditNote.idPlantDirection = value.plantDirection.id,
    this.creditNote.idClient = this.clientSelected.id;
    this.creditNote.idMoney = value.money.id;
    this.creditNote.idPaymentMethod = value.paymentMethod.id;
    this.creditNote.idPaymentCondition = value.paymentCondition.id;
    this.creditNote.idPaymentWay = value.paymentWay.id;
    this.creditNote.idUseCfdi = value.useCfdi.id;
    this.creditNote.idTypeRelation = value.typeRelation.id;
    this.creditNote.idPlantFiscalData = this.plantSelected.fiscalData.id;
    this.creditNote.idClientFiscalData = this.clientSelected.fiscalData.id;
    this.creditNote.save = this.entity.new;
    for (var i = 0; i < this.creditNoteProducts.length; i++) {
      this.creditNoteProducts[i].idProduct = this.creditNoteProducts[i].product.id;
    }
    this.creditNote.creditNoteProducts = this.creditNoteProducts;
    this.marketService.saveCreditNote(this.creditNote)
      .subscribe(
        data => {
          this.eventService.sendMainSafe(new EventMessage(20, {}));
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, 'Notas de crédito');
        });
  }
}
