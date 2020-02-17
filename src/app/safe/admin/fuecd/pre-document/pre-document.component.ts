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
  typesRelation: Array<TypeRelationSat>;
  ratesIva: Array<RateIvaSat>;
  clients: Array<Client>;
  clientSelected: Client = {};
  plantSelected: Plant = {};

  catalogs: Array<CatalogOrder>;
  catalogsSat: Array<CatalogOrderSat>;
  invoiceForm: FormGroup;

  submitted = false;
  idSys: number;
  idPlantBranchOffice: number;
  idClient: number;
  dateDocument: Date;
  dateOperation: Date;
  datePayLimit: Date;

  listFulPlanta: Array<ConceptDTO>;
  colsFul: any[];

  invoice: Invoice;

  constructor(
      public globalService: GlobalService,
      private marketService: MarketService,
      private catalogService: CatalogService,
      private toastr: ToastrManager,
      private fb: FormBuilder
  ) {
      this.invoiceForm = this.fb.group({
          folioDocument: new FormControl('', Validators.required),
          fuecd: new FormControl('', Validators.required),
          fuf: new FormControl('', Validators.required),
          typeChange: new FormControl('', Validators.required),
          satConfirmation: new FormControl('', Validators.required),
          userCreate: new FormControl('', Validators.required),
          userTimbro: new FormControl('', Validators.required),
          userCanceled: new FormControl('', Validators.required),
          uuidDocument: new FormControl('', Validators.required),
          origenDocument: new FormControl('', Validators.required),
          plantBranchOffice: new FormControl('', Validators.required),
          plantDirection: new FormControl('', Validators.required),
          client: new FormControl('', Validators.required),
          money: new FormControl('', Validators.required),
          yearMarket: new FormControl(''),
          monthMarket: new FormControl(''),
          dayMarket: new FormControl(''),
          yearClosing: new FormControl(''),
          monthClosing: new FormControl(''),
          sys: new FormControl('false', Validators.required),
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
      this.dateOperation = new Date(this.settlementInvoiceDT0.dateOperation);
      this.invoiceForm.controls.fuecd.setValue(this.settlementInvoiceDT0.fuecd);
      this.invoiceForm.controls.fuf.setValue(this.settlementInvoiceDT0.fuf);
      this.loadCatalogs();
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
      }
      console.dir(this.settlementInvoiceDT0.concepts);
      this.listFulPlanta = this.settlementInvoiceDT0.concepts;
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

    getClient(id) {
        this.marketService.getClient(id)
            .subscribe(
                data => {
                    this.clientSelected = data;
                    this.invoiceForm.controls['paymentCondition'].setValue(
                        this.paymentConditions.filter(entity =>
                            entity.id === this.clientSelected.idPaymentCondition)[0]
                    );
                    this.invoiceForm.controls['paymentWay'].setValue(
                        this.paymentWays.filter(entity =>
                            entity.id === this.clientSelected.idPaymentWay)[0]
                    );
                    // SortUtils.sortByProperty(this.clientSelected.clientAccounts, 'id', 'DESC');
                    this.invoiceForm.controls['account'].setValue(
                        this.clientSelected.clientAccounts[0].account
                    );
                    this.invoiceForm.controls['paymentMethod'].setValue(
                        this.paymentWays.filter(entity =>
                            entity.id === this.clientSelected.fiscalData.idPaymentMethod)[0]
                    );
                    this.loadMoneys();
                },
                errorData => {
                    this.toastr.errorToastr(Constants.ERROR_LOAD, 'Client');
                });
    }

  download() {
    console.log('trato de hacer algo');
  }

  dateChange(event) {
    this.dateDocument = event.value;
  }

    save(value) {
        if (!Validate(this.invoiceProducts)
            || this.invoiceProducts.length === 0) {
            this.toastr.errorToastr("Los productos de la factura no pueden ser vacíos",
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
        for (var i = 0; i < this.invoiceProducts.length; i++) {
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
}
