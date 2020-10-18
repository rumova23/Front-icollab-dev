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
import { SortUtils } from 'src/app/core/helpers/sort-utils';
import * as moment from 'moment';
import { RateIvaSat } from 'src/app/safe/models/RateIvaSat';
import { Plant } from 'src/app/security/models/Plant';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { ItemDebitNote } from 'src/app/safe/models/ItemDebitNote';
import { DebitNote } from 'src/app/safe/models/DebitNote';
import { DebitNoteProduct } from 'src/app/safe/models/DebitNoteProduct';


@Component({
  selector: 'app-debitNotesEdit',
  templateUrl: './debitNotesEdit.component.html',
  styleUrls: ['./debitNotesEdit.component.scss']
})

export class DebitNotesEditComponent implements OnInit {
  formControls = new ItemDebitNote().formControls;
  debitNoteForm: FormGroup;
  entity: Entity;
  debitNote: DebitNote;
  debitNoteSelected: DebitNote;
  paymentConditions: Array<CatalogOrderGeneric>;
  moneys: Array<Money>;
  systems: Array<CatalogOrderGeneric>

  paymentMethods: Array<PaymentMethodSat>;
  paymentWays: Array<PaymentWaySat>;
  usesCfdi: Array<UseCfdiSat>;
  typesRelation: Array<TypeRelationSat>;
  ratesIva: Array<RateIvaSat>;

  invoices: Array<Invoice>;
  invoice: Invoice;
  products: Array<Product>;
  clients: Array<Client>;

  catalogs: Array<CatalogOrder> = new CatalogOrderFind().invoice;
  catalogsSat: Array<CatalogOrderSat> = new CatalogOrderSatFind().invoice;

  formControlsProduct = new ItemDebitNote().formControlsProduct;

  productForm: FormGroup;
  debitNoteProducts: Array<DebitNoteProduct> = [];
  productsDatasource = new MatTableDataSource<DebitNoteProduct>();
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
    this.debitNoteForm = this.fb.group({
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
    this.debitNoteForm.controls['yearMarket'].disable();
    this.debitNoteForm.controls['monthMarket'].disable();
    this.debitNoteForm.controls['dayMarket'].disable();
    this.debitNoteForm.controls['yearClosing'].disable();
    this.debitNoteForm.controls['monthClosing'].disable();

    this.debitNoteForm.controls['subtotal'].disable();
    this.debitNoteForm.controls['percentageDiscount'].disable();
    this.debitNoteForm.controls['discountAmount'].disable();
    this.debitNoteForm.controls['subtotal2'].disable();
    this.debitNoteForm.controls['amountRateIvaTransfer'].disable();
    this.debitNoteForm.controls['total'].disable();

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
                  this.debitNoteForm.controls['typeRelation'].setValue(
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
      this.getDebitNote();
    }
  }

  getDebitNote() {
    this.marketService.getDebitNote(this.debitNoteSelected.id)
      .subscribe(
        data => {
          this.debitNoteSelected = data;
          this.debitNoteSelected.invoice = this.invoices.filter(entity =>
            entity.id === this.debitNoteSelected.idInvoice)[0];
          this.debitNoteSelected.client = this.clients.filter(entity =>
            entity.id === this.debitNoteSelected.idClient)[0];
          this.debitNoteSelected.sys = this.systems.filter(entity =>
            entity.id === this.debitNoteSelected.idSys)[0];
          this.debitNoteSelected.money = this.moneys.filter(entity =>
            entity.id === this.debitNoteSelected.idMoney)[0];
          this.debitNoteSelected.paymentMethod = this.paymentMethods.filter(entity =>
            entity.id === this.debitNoteSelected.idPaymentMethod)[0];
          this.debitNoteSelected.paymentWay = this.paymentWays.filter(entity =>
            entity.id === this.debitNoteSelected.idPaymentWay)[0];
          this.debitNoteSelected.paymentCondition = this.paymentConditions.filter(entity =>
            entity.id === this.debitNoteSelected.idPaymentCondition)[0];
          this.debitNoteSelected.useCfdi = this.usesCfdi.filter(entity =>
            entity.id === this.debitNoteSelected.idUseCfdi)[0];
          this.marketService.getClient(this.debitNoteSelected.idClient)
            .subscribe(
              dataC => {
                this.clientSelected = dataC;
                this.debitNoteSelected.plantBranchOffice = this.
                  plantSelected.plantBranches.filter(entity =>
                    entity.id === this.debitNoteSelected.idPlantBranchOffice)[0];
                this.debitNoteSelected.plantDirection = this.
                  plantSelected.plantDirections.filter(entity =>
                    entity.id === this.debitNoteSelected.idPlantDirection)[0];
                this.debitNoteProducts = this.debitNoteSelected.debitNoteProducts;
                this.marketService.getProductsByClient(this.debitNoteSelected.idClient)
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
                      for (let i = 0; i < this.debitNoteProducts.length; i++) {
                        this.debitNoteProducts[i].product = this.products.filter(entity =>
                          entity.id === this.debitNoteProducts[i].idProduct)[0];
                      }
                      this.productsDatasource.data = this.debitNoteProducts;
                      this.debitNoteForm.patchValue(this.debitNoteSelected);
                      this.debitNoteForm.disable();
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
      this.debitNoteProducts.splice(product, 1);
      this.editingProduct = false;
    }
    product.id = this.idProduct;
    this.idProduct = 0;
    product.amount = product.quantity * product.unitValue;
    product.amount = Number(product.amount.toFixed(6));
    product.percentageIva = this.ratesIva.filter(entity =>
      entity.id === product.product.idRateIvaSat)[0].percentageIva;
    product.amountIva = Number((product.amount * product.percentageIva) / 100);
    console.log(product);
    this.debitNoteProducts.push(product);
    const allAmounts = this.debitNoteProducts.map(i => i.amount);
    console.log(allAmounts);
    const allIvas = this.debitNoteProducts.map(i => i.amountIva);
    console.log(allIvas);
    const subtotal = allAmounts.reduce((a, b) => a + b, 0);
    const amountRateIvaTransfer = allIvas.reduce((a, b) => a + b, 0);
    console.log(subtotal)
    console.log(amountRateIvaTransfer);
    this.debitNoteForm.controls['subtotal'].setValue(subtotal);
    this.debitNoteForm.controls['subtotal2'].setValue(subtotal);
    this.debitNoteForm.controls['amountRateIvaTransfer'].setValue(amountRateIvaTransfer);
    this.debitNoteForm.controls['total'].setValue(subtotal + amountRateIvaTransfer);

    console.log(this.debitNoteProducts);
    this.productsDatasource.data = this.debitNoteProducts;
    this.debitNoteProducts.slice();
    this.productForm.reset();
  }

  deleteProduct(i) {
    this.debitNoteProducts.splice(i, 1);
    this.productsDatasource.data = this.debitNoteProducts;
  }


  getTitle() {
    return ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : " Agregar") +
      " Nota Cŕedito";
  }

  onSelect(value, input) {
    switch (input.formControlName) {
      case 'invoice':
        console.log('hacer algo');
        this.invoice = value;
        this.debitNoteForm.patchValue(this.invoice);
        this.debitNoteForm.controls['invoice'].setValue(
          this.invoices.filter(entity =>
            entity.id === value.id)[0]
        );
        this.debitNoteForm.controls['paymentCondition'].setValue(
          this.paymentConditions.filter(entity =>
            entity.id === this.invoice.idPaymentCondition)[0]
        );
        this.debitNoteForm.controls['paymentWay'].setValue(
          this.paymentWays.filter(entity =>
            entity.id === this.invoice.idPaymentWay)[0]
        );
        this.debitNoteForm.controls['account'].setValue(
          this.invoice.account
        );
        this.debitNoteForm.controls['paymentMethod'].setValue(
          this.paymentWays.filter(entity =>
            entity.id === this.invoice.idPaymentMethod)[0]
        );
        this.debitNoteForm.controls['plantBranchOffice'].setValue(
          this.plantSelected.plantBranches.filter(entity =>
            entity.id === this.invoice.idPlantBranchOffice)[0]
        );
        this.debitNoteForm.controls['plantDirection'].setValue(
          this.plantSelected.plantDirections.filter(entity =>
            entity.id === this.invoice.idPlantDirection)[0]
        );
        this.debitNoteForm.controls['money'].setValue(
          this.moneys.filter(entity =>
            entity.id === this.invoice.idMoney)[0]
        );
        this.debitNoteForm.controls['sys'].setValue(
          this.systems.filter(entity =>
            entity.id === this.invoice.idSys)[0]
        );
        this.debitNoteForm.controls['paymentMethod'].setValue(
          this.paymentMethods.filter(entity =>
            entity.id === this.invoice.idPaymentMethod)[0]
        );
        this.debitNoteForm.controls['useCfdi'].setValue(
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
          this.debitNoteForm.controls['emails'].setValue(this.clientSelected.emailInvoice);
          this.debitNoteForm.controls['paymentCondition'].setValue(
            this.paymentConditions.filter(entity =>
              entity.id === this.clientSelected.idPaymentCondition)[0]
          );
          this.debitNoteForm.controls['paymentWay'].setValue(
            this.paymentWays.filter(entity =>
              entity.id === this.clientSelected.idPaymentWay)[0]
          );
          SortUtils.sortByProperty(this.clientSelected.clientAccounts, 'id', 'DESC');
          this.debitNoteForm.controls['account'].setValue(
            this.clientSelected.clientAccounts[0].account
          );
          this.debitNoteForm.controls['paymentMethod'].setValue(
            this.paymentWays.filter(entity =>
              entity.id === this.clientSelected.fiscalData.idPaymentMethod)[0]
          );
          this.setSysVaue(3);
          this.debitNoteProducts = [];
          this.productsDatasource.data = this.debitNoteProducts;
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
          this.debitNoteForm.controls['yearMarket'].setValue(null);
          this.debitNoteForm.controls['monthMarket'].setValue(null);
          this.debitNoteForm.controls['dayMarket'].setValue(null);
          this.debitNoteForm.controls['yearClosing'].setValue(this.getYear());
          this.debitNoteForm.controls['monthClosing'].setValue(this.getMonth());
          break;
        case 2:
          this.debitNoteForm.controls['yearMarket'].setValue(this.getYear());
          this.debitNoteForm.controls['monthMarket'].setValue(this.getMonth());
          this.debitNoteForm.controls['dayMarket'].setValue(this.getDay());
          this.debitNoteForm.controls['yearClosing'].setValue(null);
          this.debitNoteForm.controls['monthClosing'].setValue(null);
          break;
        case 3:
          this.debitNoteForm.controls['yearMarket'].setValue(null);
          this.debitNoteForm.controls['monthMarket'].setValue(null);
          this.debitNoteForm.controls['dayMarket'].setValue(null);
          this.debitNoteForm.controls['yearClosing'].setValue(null);
          this.debitNoteForm.controls['monthClosing'].setValue(null);
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
    return invoice.serie + ' - ' + invoice.number;
  }

  getPlantDirection(direction) {
    return direction.colony;
  }

  getPlantBranchOffice(direction) {
    return direction.colony;
  }

  save(value) {
    console.log(value);
    if (!Validate(this.debitNoteProducts)
      || this.debitNoteProducts.length === 0) {
      this.toastr.errorToastr("Los productos de la nota de debito no pueden ser vacíos",
        'Productos');
      return;
    }
    console.log(this.clientSelected);
    this.debitNote = value;
    this.debitNote.idInvoice = this.invoice.id;
    this.debitNote.invoice = null;
    this.debitNote.idSys = value.sys.id;
    this.debitNote.idPlantBranchOffice = value.plantBranchOffice.id;
    this.debitNote.idPlantDirection = value.plantDirection.id,
      this.debitNote.idClient = this.clientSelected.id;
    this.debitNote.idMoney = value.money.id;
    this.debitNote.idPaymentMethod = value.paymentMethod.id;
    this.debitNote.idPaymentCondition = value.paymentCondition.id;
    this.debitNote.idPaymentWay = value.paymentWay.id;
    this.debitNote.idUseCfdi = value.useCfdi.id;
    this.debitNote.idTypeRelation = value.typeRelation.id;
    this.debitNote.idPlantFiscalData = this.plantSelected.fiscalData.id;
    this.debitNote.idClientFiscalData = this.clientSelected.fiscalData.id;
    this.debitNote.save = this.entity.new;
    for (var i = 0; i < this.debitNoteProducts.length; i++) {
      this.debitNoteProducts[i].idProduct = this.debitNoteProducts[i].product.id;
    }
    this.debitNote.debitNoteProducts = this.debitNoteProducts;
    this.marketService.saveDebitNote(this.debitNote)
      .subscribe(
        data => {
          this.eventService.sendMainSafe(new EventMessage(20, {}));
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, 'Notas de debito');
        });
  }
}
