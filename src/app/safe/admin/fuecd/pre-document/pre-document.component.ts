import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SettlementInvoiceDT0} from '../../../models/settlement-invoice-dt0';
import {Constants} from '../../../../core/globals/Constants';
import {CatalogOrderGeneric} from '../../../../core/models/CatalogOrderGeneric';
import {Money} from '../../../models/Money';
import {ToastrManager} from 'ng6-toastr-notifications';
import {CatalogService} from '../../../../core/services/catalog.service';
import {CatalogOrder} from '../../../../core/models/CatalogOrder';
import {PaymentMethodSat} from '../../../models/PaymentMethodSat';
import {PaymentWaySat} from '../../../models/PaymentWaySat';
import {UseCfdiSat} from '../../../models/UseCfdiSat';
import {TypeRelationSat} from '../../../models/TypeRelationSat';
import {RateIvaSat} from '../../../models/RateIvaSat';
import {CatalogOrderSat} from '../../../../core/models/CatalogOrderSat';
import {Client} from '../../../models/Client';
import {MarketService} from '../../../services/market.service';
import {Plant} from '../../../../security/models/Plant';
import {GlobalService} from '../../../../core/globals/global.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SortUtils} from '../../../../core/helpers/sort-utils';
import {MatTableDataSource} from '@angular/material';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {ConceptDTO} from '../../../models/concept-dto';
import {Validate} from '../../../../core/helpers/util.validator.';
import {EventMessage} from '../../../../core/models/EventMessage';
import {Invoice} from '../../../models/Invoice';
import {InvoiceProduct} from '../../../models/InvoiceProduct';
import {Entity} from '../../../../core/models/Entity';
import {EventService} from '../../../../core/services/event.service';
import {Product} from '../../../models/Product';
import {ProductInDTO} from '../../../models/product-in-dto';
import {InvoiceProductDTO} from '../../../models/invoice-product-dto';
import {DebitNote} from '../../../models/DebitNote';
import {CreditNote} from '../../../models/CreditNote';
import {DebitNoteProduct} from '../../../models/DebitNoteProduct';
import {CreditNoteProduct} from '../../../models/CreditNoteProduct';
import {CreditNoteProductOutDTO} from '../../../models/credit-note-product-out-dto';
import {MaestroOpcionDTO} from '../../../../compliance/models/maestro-opcion-dto';
import {Combo} from '../../../../compliance/models/Combo';
import {EntidadEstausDTO} from '../../../../compliance/models/entidad-estaus-dto';

@Component({
  selector: 'app-pre-document',
  templateUrl: './pre-document.component.html',
  styleUrls: ['./pre-document.component.scss']
})
export class PreDocumentComponent implements OnInit {
    @ViewChild('autosize') autosize: CdkTextareaAutosize;
  settlementInvoiceDT0: SettlementInvoiceDT0;

  paymentConditions: Array<CatalogOrderGeneric>;
  moneys: Array<Money>;
  systems: Array<CatalogOrderGeneric>;
  paymentMethods: Array<PaymentMethodSat>;
  paymentWays: Array<PaymentWaySat>;
  usesCfdi: Array<UseCfdiSat>;
  originDocument: Array<Combo>;
  typesRelation: Array<TypeRelationSat>;
  ratesIva: Array<RateIvaSat>;
  clients: Array<Client>;
  clientSelected: Client = {};
  plantSelected: Plant = {};
  products: Array<Product>;

  catalogs: Array<CatalogOrder>;
  catalogsSat: Array<CatalogOrderSat>;
  invoiceForm: FormGroup;

  submitted = false;
  idSys: number;
  idPlantBranchOffice: number;
  idClient: number;
  idPaymentCondition: number;
  idPaymentWay: number;
  idPaymentMethod: number;
  idMoney: number;
  dateDocument: Date;
  dateOperation: Date;
  datePayLimit: Date;

  listFulPlanta: Array<ConceptDTO>;
  colsFul: any[];

  invoice: Invoice;
  invoiceProducts: Array<InvoiceProduct> = [];
  debitNoteProducts: Array<DebitNoteProduct> = [];
  creditNoteProducts: Array<CreditNoteProduct> = [];
  entity: Entity;


  debitNote: DebitNote;
  creditNote: CreditNote;

  timbradoId: number;
  pendienteFacturacionId: number;
  facturadoId: number;

  constructor(
      private eventService: EventService,
      public globalService: GlobalService,
      private marketService: MarketService,
      private catalogService: CatalogService,
      private toastr: ToastrManager,
      private fb: FormBuilder
  ) {
      this.invoiceForm = this.fb.group({
          folioDocument: new FormControl(''),
          fuecd: new FormControl('', Validators.required),
          fuf: new FormControl('', Validators.required),
          dateOperation: new FormControl('', Validators.required),
          dateDocument: new FormControl(''),
          typeChange: new FormControl(''),
          satConfirmation: new FormControl(''),
          userCreate: new FormControl(''),
          userTimbro: new FormControl(''),
          userCanceled: new FormControl(''),
          uuidDocument: new FormControl(''),
          origenDocument: new FormControl(''),
          plantBranchOffice: new FormControl('', Validators.required),
          client: new FormControl('', Validators.required),
          money: new FormControl('', Validators.required),
          sys: new FormControl('false', Validators.required),
          paymentMethod: new FormControl('', Validators.required),
          paymentCondition: new FormControl('', Validators.required),
          paymentWay: new FormControl('', Validators.required),
          useCfdi: new FormControl('', Validators.required),
          typeRelation: new FormControl('', Validators.required),
          account: new FormControl('', Validators.required),
          subtotal: new FormControl(''),
          percentageDiscount: new FormControl(''),
          discountAmount: new FormControl(''),
          amountRateIvaTransfer: new FormControl(''),
          total: new FormControl(''),
          observations: new FormControl('', Validators.required),
          datePayLimit: new FormControl('')
      });
  }
  ngOnInit() {
      this.colsFul = [
          'group',
          'description',
          'ful'
      ];
      this.catalogs = [
      {
        catalog: 'paymentCondition',
        active: 1,
        order: 1
      },
      {
        catalog: 'sys',
        active: 1,
        order: 1
      }
    ];
      this.catalogsSat = [
      {
        catalog: 'useCfdi',
        active: 1,
        order: 1
      },
      {
        catalog: 'paymentMethod',
        active: 1,
        order: 1
      },
      {
        catalog: 'paymentWay',
        active: 1,
        order: 1
      },
      {
        catalog: 'typeRelation',
        active: 1,
        order: 1
      },
      {
        catalog: 'rateIva',
        active: 1,
        order: 1
      }
    ];
      this.idSys = 2;
      this.idPlantBranchOffice = 1;
      this.idClient = 52;
      this.idMoney = 1;
      this.invoiceForm.controls.discountAmount.setValue('0');
      this.dateOperation = new Date(this.settlementInvoiceDT0.dateOperation);
      this.invoiceForm.controls.fuecd.setValue(this.settlementInvoiceDT0.fuecd);
      this.invoiceForm.controls.fuf.setValue(this.settlementInvoiceDT0.fuf);
      if (this.settlementInvoiceDT0.liquidacion === 0 ) {
          this.invoiceForm.controls.subtotal.setValue(this.settlementInvoiceDT0.totalNet);
          this.invoiceForm.controls.amountRateIvaTransfer.setValue(this.settlementInvoiceDT0.iva);
          this.invoiceForm.controls.total.setValue(this.settlementInvoiceDT0.totalAmount);
          this.colsFul.push('subtotal');
          this.colsFul.push('iva');
          this.colsFul.push('total');
      }
      if (this.settlementInvoiceDT0.liquidacion > 0 ) {
          this.invoiceForm.controls.subtotal.setValue(this.settlementInvoiceDT0.totalNetDifference);
          this.invoiceForm.controls.amountRateIvaTransfer.setValue(this.settlementInvoiceDT0.ivaDifference);
          this.invoiceForm.controls.total.setValue(this.settlementInvoiceDT0.totalAmountDifference);
          this.colsFul.push('subtotalDiferencia');
          this.colsFul.push('ivaDiferencia');
          this.colsFul.push('totalDiferencia');
          const fufLiquidacion = this.settlementInvoiceDT0.fuf.substring(0, (this.settlementInvoiceDT0.fuf.length - 2)) + '00';
          this.catalogService.getInvoiceByFUF(fufLiquidacion).subscribe(
              data => {
                  this.invoice = data;
              },
              errorData => {
                  console.dir(errorData);
                  this.toastr.errorToastr(errorData.error.message, 'Error!');
                  this.eventService.sendChangePage(new EventMessage(-1, null , 'Safe.Control Facturas'));
              });

      }

      this.loadCatalogs();
      this.listFulPlanta = this.settlementInvoiceDT0.concepts;
      this.marketService.obtenEntidadEstatus('SETTLEMENT_INVOICE', 'Timbrado').subscribe(
          (entidadEstatus: EntidadEstausDTO) => {
              this.timbradoId = entidadEstatus.entidadEstatusId;
              this.marketService.obtenEntidadEstatus('SETTLEMENT_INVOICE', 'Pendiente Facturacion').subscribe(
                  (entidadEstatusa: EntidadEstausDTO) => {
                      this.pendienteFacturacionId = entidadEstatusa.entidadEstatusId;
                      this.marketService.obtenEntidadEstatus('SETTLEMENT_INVOICE', 'Facturado').subscribe(
                          (entidadEstatusb: EntidadEstausDTO) => {
                              this.facturadoId = entidadEstatusb.entidadEstatusId;
                              this.initDisabled();
                          });
                  });
          });
  }
  private initDisabled() {
      this.invoiceForm.enable({ onlySelf: true, emitEvent: false });
      if (this.settlementInvoiceDT0.entidadEstatusId === this.facturadoId) {
          this.invoiceForm.controls.typeChange.disable();
          this.invoiceForm.controls.userCreate.disable();
          this.invoiceForm.controls.userTimbro.disable();
          this.invoiceForm.controls.userCanceled.disable();
          this.invoiceForm.controls.useCfdi.disable();
          this.invoiceForm.controls.typeRelation.disable();
          this.invoiceForm.controls.observations.disable();
          this.invoiceForm.controls.origenDocument.disable();
          this.invoiceForm.controls.money.disable();
          this.invoiceForm.controls.datePayLimit.disable();
      }
      this.invoiceForm.controls.sys.disable();
      this.invoiceForm.controls.plantBranchOffice.disable();
      this.invoiceForm.controls.client.disable();
      this.invoiceForm.controls.fuecd.disable();
      this.invoiceForm.controls.fuf.disable();
      this.invoiceForm.controls.paymentMethod.disable();
      this.invoiceForm.controls.paymentWay.disable();
      this.invoiceForm.controls.paymentCondition.disable();
      this.invoiceForm.controls.account.disable();
      this.invoiceForm.controls.discountAmount.disable();
      this.invoiceForm.controls.dateOperation.disable();
      this.invoiceForm.controls.folioDocument.disable();
      this.invoiceForm.controls.satConfirmation.disable();
      this.invoiceForm.controls.uuidDocument.disable();
      this.invoiceForm.controls.dateDocument.disable();

      this.invoiceForm.controls.subtotal.disable();
      this.invoiceForm.controls.percentageDiscount.disable();
      this.invoiceForm.controls.discountAmount.disable();
      this.invoiceForm.controls.amountRateIvaTransfer.disable();
      this.invoiceForm.controls.total.disable();

  }
  private loadCatalogs() {
    this.catalogService.list(this.catalogs)
        .subscribe(
            data => {
              const result = data;
              this.paymentConditions = result.filter(entity => entity.catalog === 'paymentCondition')[0].data;
              this.systems = result.filter(entity => entity.catalog === 'sys')[0].data;
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
              this.getClients();
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Catálogos del SAT');
            });
  }
  private getClients() {
    this.marketService.getClients(3)
        .subscribe(
            (data: Array<Client>) => {
              this.clients = data;
              this.getPlant();
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clients');
            });
  }
  private getPlant() {
    this.marketService.getPlant(1)
        .subscribe(
            (data: Plant) => {
              this.plantSelected = data;
              this.getClient(52);
              // this.loadMoneys();
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, errorData.error.message);
            });
  }

    private loadMoneys() {
        this.catalogService.loadMoneys(1)
            .subscribe(
                data => {
                    this.moneys = data;
                },
                errorData => {
                    this.toastr.errorToastr(Constants.ERROR_LOAD, 'Monedas');
                });
    }

    initComboOrigenDocumento() {
        this.marketService.comboOrigenDocumento().subscribe(
            (lista: Array<MaestroOpcionDTO>) => {
                lista.forEach((elemento: MaestroOpcionDTO) => {
                    this.originDocument.push(new Combo(elemento.maestroOpcionId.toString(), elemento.opcion.codigo));
                });
            });
    }

    getClient(id) {
        this.marketService.getClient(id)
            .subscribe(
                (data: Client) => {
                    this.clientSelected = data;
                    this.idPaymentCondition = this.clientSelected.idPaymentCondition;
                    this.idPaymentWay = this.clientSelected.idPaymentWay;
                    this.idPaymentMethod = this.clientSelected.fiscalData.idPaymentMethod;
                    // SortUtils.sortByProperty(this.clientSelected.clientAccounts, 'id', 'DESC');
                    this.invoiceForm.controls.account.setValue(
                        this.clientSelected.clientAccounts[0].account
                    );
                    this.getProductsByClient(id);
                },
                errorData => {
                    this.toastr.errorToastr(Constants.ERROR_LOAD, 'Client');
                });
    }

  download() {
    console.log('trato de hacer algo');
  }

  regresaControlFacturacion() {
      this.eventService.sendChangePage(new EventMessage(-1, null , 'Safe.Control Facturas'));
  }

  dateChange(event) {
    this.dateDocument = event.value;
  }

    getProductsByClient(id) {
        this.marketService.getProductsByClient(id)
            .subscribe(
                data => {
                    this.products = data;
                    this.loadMoneys();
                },
                errorData => {
                    this.toastr.errorToastr(Constants.ERROR_LOAD, 'Estados');
                });
    }

    save(value) {
        this.submitted = true
        this.invoiceForm.enable({ onlySelf: false, emitEvent: true });
        if (!this.invoiceForm.valid) {
            this.initDisabled();
            this.toastr.warningToastr('Ingreso los campos faltantes',
                'Warning!');
            return;
        }
        value = this.invoiceForm.value;
        if (this.settlementInvoiceDT0.type === 'pago') {
            this.saveFactura(value);
        }
        if (this.settlementInvoiceDT0.type === 'pagonotadebito') {
            this.saveDebitNote(value);
        }
        if (this.settlementInvoiceDT0.type === 'pagonotacredito') {
            this.saveCreditNote(value);
        }
    }

    saveFactura(value) {
        let concept: ConceptDTO;
        for (let i = 0; i < this.settlementInvoiceDT0.concepts.length; i++) {
            concept = this.settlementInvoiceDT0.concepts[i];
            if (this.settlementInvoiceDT0.liquidacion === 0 ) {
                const product = new InvoiceProductDTO();
                product.idProduct = this.products.filter(entity =>
                    entity.description.trim() === concept.description.trim())[0].id;
                product.amount = concept.totalAmount;
                product.amount = Number(product.amount.toFixed(6));
                product.amountIva = concept.iva;
                product.quantity = 1;
                product.unitValue = concept.totalNet;
                product.percentageIva = 16;
                this.invoiceProducts.push(product);
            }

            if (this.settlementInvoiceDT0.liquidacion > 0 ) {
                const product = new InvoiceProductDTO();
                product.idProduct = this.products.filter(entity =>
                    entity.description.trim() === concept.description.trim())[0].id;
                product.amount = concept.totalAmountDifference;
                product.amount = Number(product.amount.toFixed(6));
                product.amountIva = concept.ivaDifference;
                product.quantity = 1;
                product.unitValue = concept.totalNetDifference;
                product.percentageIva = 16;
                this.invoiceProducts.push(product);
            }
        }
        if (!Validate(this.invoiceProducts)
            || this.invoiceProducts.length === 0) {
            this.toastr.errorToastr('Los productos de la factura no pueden ser vacíos',
                'Productos');
            this.initDisabled();
            return;
        }
        this.invoice = value;
        this.invoice.idSys = value.sys;
        this.invoice.idPlantBranchOffice = value.plantBranchOffice;
        this.invoice.idPlantDirection = this.plantSelected.plantDirections.id;
        this.invoice.idClient = value.client;
        this.invoice.idMoney = value.money;
        this.invoice.idPaymentMethod = value.paymentMethod;
        this.invoice.idPaymentCondition = value.paymentCondition;
        this.invoice.idPaymentWay = value.paymentWay;
        this.invoice.idUseCfdi = value.useCfdi;
        this.invoice.idTypeRelation = value.typeRelation;
        this.invoice.idPlantFiscalData = this.plantSelected.fiscalData.id;
        this.invoice.idClientFiscalData = this.clientSelected.fiscalData.id;
        this.invoice.subtotal = 0;
        this.invoice.save = true;
        if (this.settlementInvoiceDT0.liquidacion === 0 ) {
            this.invoice.subtotal = this.settlementInvoiceDT0.totalNet;
            this.invoice.amountRateIvaTransfer = this.settlementInvoiceDT0.iva;
            this.invoice.total = this.settlementInvoiceDT0.totalAmount;
        }

        if (this.settlementInvoiceDT0.liquidacion > 0 ) {
            this.invoice.subtotal = this.settlementInvoiceDT0.totalNetDifference;
            this.invoice.amountRateIvaTransfer = this.settlementInvoiceDT0.ivaDifference;
            this.invoice.total = this.settlementInvoiceDT0.totalAmountDifference;
        }
        this.invoice.subtotal2 = this.invoice.subtotal;
        this.invoice.invoiceProducts = this.invoiceProducts;
        this.marketService.saveInvoice(this.invoice).subscribe(
            (data: Invoice) => {
                this.marketService.changeStatusInvoiseFacturado(this.settlementInvoiceDT0.id, data.id).subscribe(
                    dataA => {
                        this.toastr.successToastr('Se genero correctamente el predocumento', 'Exito!');
                    },
                    errorData => {
                        this.toastr.errorToastr(errorData.error.message, 'Facturas');
                        this.initDisabled();
                    });
                this.eventService.sendMainSafe(new EventMessage(20, {}));
            },
            errorData => {
                this.toastr.errorToastr(errorData.error.message, 'Facturas');
                this.initDisabled();
            });
    }

    saveDebitNote(value) {
        let concept: ConceptDTO;
        for (let i = 0; i < this.settlementInvoiceDT0.concepts.length; i++) {
            concept = this.settlementInvoiceDT0.concepts[i];
            if (this.settlementInvoiceDT0.liquidacion === 0 ) {
                const product = new CreditNoteProductOutDTO();
                product.idProduct = this.products.filter(entity =>
                    entity.description === concept.description)[0].id;
                product.amount = concept.totalAmount;
                product.amount = Number(product.amount.toFixed(6));
                product.amountIva = concept.iva;
                product.quantity = 1;
                product.unitValue = concept.totalNet;
                product.percentageIva = 16;
                this.debitNoteProducts.push(product);
            }

            if (this.settlementInvoiceDT0.liquidacion > 0 ) {
                const product = new InvoiceProductDTO();
                product.idProduct = this.products.filter(entity =>
                    entity.description === concept.description)[0].id;
                product.amount = concept.totalAmountDifference;
                product.amount = Number(product.amount.toFixed(6));
                product.amountIva = concept.ivaDifference;
                product.quantity = 1;
                product.unitValue = concept.totalNetDifference;
                product.percentageIva = 16;
                this.debitNoteProducts.push(product);
            }
        }
        if (!Validate(this.debitNoteProducts)
            || this.debitNoteProducts.length === 0) {
            this.toastr.errorToastr('Los productos de la nota de debito no pueden ser vacíos',
                'Productos');
            this.initDisabled();
            return;
        }
        console.log(this.clientSelected);
        this.debitNote = value;
        this.debitNote.idInvoice = this.invoice.id;
        this.debitNote.invoice = null;
        this.debitNote.idSys = value.sys;
        this.debitNote.idPlantBranchOffice = value.plantBranchOffice;
        this.debitNote.idPlantDirection = this.plantSelected.plantDirections.id;
        this.debitNote.idClient = value.client;
        this.debitNote.idMoney = value.money;
        this.debitNote.idPaymentMethod = value.paymentMethod;
        this.debitNote.idPaymentCondition = value.paymentCondition;
        this.debitNote.idPaymentWay = value.paymentWay;
        this.debitNote.idUseCfdi = value.useCfdi;
        this.debitNote.idTypeRelation = value.typeRelation;
        this.debitNote.idPlantFiscalData = this.plantSelected.fiscalData.id;
        this.debitNote.idClientFiscalData = this.clientSelected.fiscalData.id;
        this.debitNote.save = true;
        this.debitNote.subtotal = 0;
        this.debitNote.subtotal = this.settlementInvoiceDT0.totalNetDifference;
        this.debitNote.amountRateIvaTransfer = this.settlementInvoiceDT0.ivaDifference;
        this.debitNote.total = this.settlementInvoiceDT0.totalAmountDifference;
        this.debitNote.subtotal2 = this.debitNote.subtotal;
        this.debitNote.debitNoteProducts = this.debitNoteProducts;
        this.marketService.saveDebitNote(this.debitNote).subscribe(
                (data: DebitNote) => {
                    this.marketService.changeStatusInvoiseFacturado(this.settlementInvoiceDT0.id, data.id).subscribe(
                        dataA => {
                            this.toastr.successToastr('Se genero correctamente el predocumento', 'Exito!');
                        },
                        errorData => {
                            this.toastr.errorToastr(errorData.error.message, 'Facturas');
                            this.initDisabled();
                        });
                    this.eventService.sendMainSafe(new EventMessage(20, {}));
                },
                errorData => {
                    this.toastr.errorToastr(errorData.error.message, 'Facturas');
                    this.initDisabled();
                });
    }

    saveCreditNote(value) {
        let concept: ConceptDTO;
        for (let i = 0; i < this.settlementInvoiceDT0.concepts.length; i++) {
            concept = this.settlementInvoiceDT0.concepts[i];
            if (this.settlementInvoiceDT0.liquidacion === 0 ) {
                const product = new CreditNoteProductOutDTO();
                product.idProduct = this.products.filter(entity => entity.description.trim() === concept.description.trim())[0].id;
                product.amount = concept.totalAmount;
                product.amount = Number(product.amount.toFixed(6));
                product.amountIva = concept.iva;
                product.quantity = 1;
                product.unitValue = concept.totalNet;
                product.percentageIva = 16;
                this.creditNoteProducts.push(product);
            }

            if (this.settlementInvoiceDT0.liquidacion > 0 ) {
                const product = new InvoiceProductDTO();
                product.idProduct = this.products.filter(entity =>
                    entity.description.trim() === concept.description.trim())[0].id;
                product.amount = concept.totalAmountDifference;
                product.amount = Number(product.amount.toFixed(6));
                product.amountIva = concept.ivaDifference;
                product.quantity = 1;
                product.unitValue = concept.totalNetDifference;
                product.percentageIva = 16;
                this.creditNoteProducts.push(product);
            }
        }
        if (!Validate(this.creditNoteProducts)
            || this.creditNoteProducts.length === 0) {
            this.toastr.errorToastr('Los productos de la nota de crédito no pueden ser vacíos',
                'Productos');
            this.initDisabled();
            return;
        }
        this.creditNote = value;
        this.creditNote.idInvoice = this.invoice.id;
        this.creditNote.invoice = null;
        this.creditNote.idSys = value.sys;
        this.creditNote.idPlantBranchOffice = value.plantBranchOffice;
        this.creditNote.idPlantDirection = this.plantSelected.plantDirections.id;
        this.creditNote.idClient = value.client;
        this.creditNote.idMoney = value.money;
        this.creditNote.idPaymentMethod = value.paymentMethod;
        this.creditNote.idPaymentCondition = value.paymentCondition;
        this.creditNote.idPaymentWay = value.paymentWay;
        this.creditNote.idUseCfdi = value.useCfdi;
        this.creditNote.idTypeRelation = value.typeRelation;
        this.creditNote.idPlantFiscalData = this.plantSelected.fiscalData.id;
        this.creditNote.idClientFiscalData = this.clientSelected.fiscalData.id;
        this.creditNote.save = true;
        this.creditNote.subtotal = 0;
        if (this.settlementInvoiceDT0.liquidacion === 0 ) {
            this.creditNote.subtotal = this.settlementInvoiceDT0.totalNet;
            this.creditNote.amountRateIvaTransfer = this.settlementInvoiceDT0.iva;
            this.creditNote.total = this.settlementInvoiceDT0.totalAmount;
        }

        if (this.settlementInvoiceDT0.liquidacion > 0 ) {
            this.creditNote.subtotal = this.settlementInvoiceDT0.totalNetDifference;
            this.creditNote.amountRateIvaTransfer = this.settlementInvoiceDT0.ivaDifference;
            this.creditNote.total = this.settlementInvoiceDT0.totalAmountDifference;
        }
        this.creditNote.creditNoteProducts = this.creditNoteProducts;
        this.invoice.subtotal2 = this.invoice.subtotal;
        this.marketService.saveCreditNote(this.creditNote).subscribe(
            (data: CreditNote) => {
                this.marketService.changeStatusInvoiseFacturado(this.settlementInvoiceDT0.id, data.id).subscribe(
                    dataA => {
                        this.toastr.successToastr('Se genero correctamente el predocumento', 'Exito!');
                    },
                    errorData => {
                        this.toastr.errorToastr(errorData.error.message, 'Facturas');
                        this.initDisabled();
                    });
                this.eventService.sendMainSafe(new EventMessage(20, {}));
            },
            errorData => {
                this.toastr.errorToastr(errorData.error.message, 'Facturas');
                this.initDisabled();
            });
    }
}
