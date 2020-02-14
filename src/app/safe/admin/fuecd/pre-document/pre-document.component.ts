import {Component, Input, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-pre-document',
  templateUrl: './pre-document.component.html',
  styleUrls: ['./pre-document.component.scss']
})
export class PreDocumentComponent implements OnInit {
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


  dateDocument: Date;

  constructor(
      public globalService: GlobalService,
      private marketService: MarketService,
      private catalogService: CatalogService,
      private toastr: ToastrManager,
      private fb: FormBuilder
  ) { }

  ngOnInit() {
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
    this.loadCatalogs();
    this.invoiceForm = this.fb.group({
      folioDocument: new FormControl('', Validators.required),
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
  }
  private loadCatalogs() {
    this.catalogService.list(this.catalogs)
        .subscribe(
            data => {
              console.dir(data);
              const result = data;
              this.paymentConditions = result.filter(entity => entity.catalog === 'paymentCondition')[0].data;
              this.systems = result.filter(entity => entity.catalog === 'sys')[0].data;
              this.loadMoneys();
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Catálogos');
            });
  }
  private loadMoneys() {
    this.catalogService.loadMoneys(1)
        .subscribe(
            data => {
              this.moneys = data;
              console.dir(this.moneys);
              this.loadCatalogsSat();
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Monedas');
            });
  }
  private loadCatalogsSat() {
    this.catalogService.listSat(this.catalogsSat)
        .subscribe(
            data => {
              console.dir(data);
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
            data => {
              this.clients = data;
              console.dir(data);
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
              console.dir(data);
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, errorData.error.message);
            });
  }

  download() {
    console.log('trato de hacer algo');
  }

  dateChange(event) {
    this.dateDocument = event.value;
  }
}
