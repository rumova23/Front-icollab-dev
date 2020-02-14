import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MarketService } from '../../../services/market.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { Constants } from 'src/app/core/globals/Constants';
import { CatalogService } from 'src/app/core/services/catalog.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TimeRegister} from '../../../models/TimeRegister';
import {requiredFileType} from '../../../../core/helpers/requiredFileType';
import {SettlementInvoiceDT0} from '../../../models/settlement-invoice-dt0';
import {AccountStatusDT0} from '../../../models/account-status-dt0';
import {ConceptDTO} from '../../../models/concept-dto';
import {SettlementDT0} from '../../../models/settlement-dt0';

@Component({
  selector: 'app-control-facturacion',
  templateUrl: './control-facturacion.component.html',
  styleUrls: ['./control-facturacion.component.scss']
})

export class ControlFacturacionComponent implements OnInit {
  filterDatesFormGroup: FormGroup;
  dateIni: Date;
  dateFin: Date;
  fd = 'FO';

  fuecdForm: FormGroup;
  progress;
  file: any;
  fileName: any;
  valid = false;
  timeRegisters: Array<TimeRegister> = [];

  buttonAcepted = false;

  fuecd: AccountStatusDT0;
  loading: boolean;
  cols: any[];
  colsFul: any[];
  colsFuecd: any[];
  filters = [
    { label: 'Actividad', inputtype: 'text' },
    { label: 'Prefijo', inputtype: 'text' },
    { label: 'Activo', inputtype: 'text' },
  ];
  filterBtn = { label: 'buscar' };
  rowsPorPage = [5, 10, 25, 50, 100, 250, 500];
  listFUECD: Array<AccountStatusDT0>;
  listFUFPlanta: Array<SettlementInvoiceDT0>;
  listFUFCenace: Array<SettlementInvoiceDT0>;


  listFulPlanta: Array<ConceptDTO>;
  listFulCenace: Array<ConceptDTO>;

  aaaaaa: Array<SettlementInvoiceDT0>;
  bbbbbb: Array<SettlementInvoiceDT0>;
  constructor(
      private marketService: MarketService,
      private catalogService: CatalogService,
      public toastr: ToastrManager,
      private eventService: EventService,
      public globalService: GlobalService,
      private fb: FormBuilder
  ) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.dateIni = new Date();
    this.aaaaaa = [];
    this.bbbbbb = [];
    this.fuecdForm = this.fb.group({
      file: new FormControl(null, [Validators.required, requiredFileType('xml')])
    });

    this.filterDatesFormGroup = new FormGroup({
      typeDate: new FormControl(null, Validators.required)
    });
    this.cols = [
      'fuf',
      'tipoFuf',
      'liquidacion',
      'fechaOperaciónFuf',
      'fechaPago',
      'tipoDocumentoEmitir',
      'subtotal',
      'iva',
      'total',
      'subtotalDiferencia',
      'ivaDiferencia',
      'totalDiferencia',
      'verDetalleFulsContenidosFuf'
    ];
    this.colsFul = [
      'group',
      'description',
      'subtotal',
      'iva',
      'total',
      'subtotalDiferencia',
      'ivaDiferencia',
      'totalDiferencia'
    ];
    this.colsFuecd = [
      'fuecd',
      'dateOperation',
      'dateEmission',
      'ver'
    ];
    this.loading = false;
  }
  private detalleFuf(fuf, participante) {
    if (participante === 'participante') {
      for ( let i = 0; i < this.listFUFPlanta.length; i++ ) {
        if (this.listFUFPlanta[i].fuf === fuf) {
          this.listFulPlanta = this.listFUFPlanta[i].concepts;
          break;
        }
      }
    }
    if (participante === 'cenace') {
      for ( let i = 0; i < this.listFUFCenace.length; i++ ) {
        if (this.listFUFCenace[i].fuf === fuf) {
          this.listFulCenace = this.listFUFCenace[i].concepts;
          break;
        }
      }
    }
  }

  private aceptaFuecd() {
    this.marketService.aceptaFuecd(this.fuecd.fuecd, 'Aprobado')
        .subscribe(
            data => {
              this.toastr.successToastr('FUECD, aceptado', 'Exito!');
            },
            errorData => {
              this.toastr.errorToastr(errorData.error.message, 'Error!');
            });
  }

  private getFuecds() {
    this.marketService.getFufs(this.fuecd.fuecd).subscribe(
      (data: Array<SettlementInvoiceDT0>) => {
        for ( let i = 0; i < data.length; i++ ) {
          if (data[i].transmitter === 'participante') {
            this.aaaaaa.push(data[i]);
          }
          if (data[i].transmitter === 'cenace') {
            this.bbbbbb.push(data[i]);
          }
        }
        this.listFUFPlanta = this.aaaaaa;
        this.listFUFCenace = this.bbbbbb;
      },
      errorData => {
        this.toastr.errorToastr(Constants.ERROR_LOAD, 'FUECD');
      });
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  newEntity() {
    this.eventService.sendMainSafe(new
    EventMessage(23, { readOnly: false, edit: false, new: true, user: {} }));
  }

  invoice(fuecd) {
    this.eventService.sendMainSafe(new
    EventMessage(24, { readOnly: false, edit: false, new: true, fuecd }));
  }

  validate(value) {
    this.valid = false;
    const reader = new FileReader();
    reader.onloadend = (e) => {
      this.file = reader.result;
      this.file = this.file.replace(/^data:(.*;base64,)?/, '');

      this.file = this.file.trim();
      this.fileName = value.file.name;
      this.marketService.validateFuecd({ file: this.file, name:  this.fileName})
          .subscribe((data: AccountStatusDT0) => {
                this.fuecd = data;
                this.save();
                /*for (let a = 0; a < status.settlements.length; a++) {
                  const settlement = status.settlements[a];
                  for (let b = 0; b < settlement.settlementInvoices.length; b++) {
                    const settlementInvoice = settlement.settlementInvoices[b];

                    for (let c = 0; c < settlementInvoice.concepts.length; c++) {
                      const concept = settlementInvoice.concepts[c];

                      const timer: TimeRegister = {};
                      timer.fuecd = status.fuecd;
                      timer.concept = concept.ful;
                      timer.date = settlementInvoice.datePayment;
                      timer.ful = concept.ful;
                      timer.concept = concept.description;
                      timer.iva = concept.iva;
                      timer.totalAmount = concept.totalAmount;
                      timer.totalNet = concept.totalNet;
                      this.timeRegisters.push(timer);
                      for (let d = 0; d < concept.annexeds.length; d++) {
                        const annexed = concept.annexeds[d];

                        for (let e = 0; e < annexed.timeRegisters.length; e++) {
                          const timeRegister = annexed.timeRegisters[e];
                        }
                      }
                    }
                  }
                }*/
                this.valid = true;
              },
              errorData => {
                if (errorData.error.message.indexOf('Ya existe el estado de cuenta') > -1) {
                  this.toastr.warningToastr(errorData.error.message, 'Warning!');
                  this.fuecdForm.reset();
                } else {
                  this.toastr.errorToastr( errorData.error.message, 'Error!');
                }
              });
    };
    reader.readAsDataURL(value.file);
  }
  save() {
    this.marketService.saveFuecd({ file: this.file, name: this.fileName })
        .subscribe(
            data => {
              this.getFuecds();
              this.buttonAcepted = true;
            },
            errorData => {
              this.fuecdForm.reset();
              this.valid = false;
              this.timeRegisters = [];
              this.toastr.errorToastr(Constants.ERROR_SAVE, errorData);
            });
  }

  dateChangeIni(event) {
    this.dateIni = event.value;
    if (this.dateFin != null) {
      if (this.dateIni.getTime() >= this.dateFin.getTime()) {
        this.dateFin = new Date(this.dateIni);
      }
    }
  }
  dateChangeFin(event) {
    this.dateFin = event.value;
  }
  searchFuecdByDates() {
    const keyType = this.filterDatesFormGroup.controls['typeDate'].value;
    const typeDate = (keyType === '1') ? 'FO' : ((keyType === '2') ? 'FEECD' : 'FEF');
    this.marketService.filterFuecdByDate(typeDate, this.dateIni.getTime(), this.dateFin.getTime()).subscribe(
      (data: Array<AccountStatusDT0>) => {
        this.listFUECD = data;
      },
      errorData => {
        this.toastr.warningToastr(errorData.error.message, 'Warning!');
      });
  }

  detalleFufs(fuecd: string) {
    let accountStatusDT0: AccountStatusDT0;
    let settlementDT0: SettlementDT0;
    let settlementInvoiceDT0: SettlementInvoiceDT0;
    this.aaaaaa = [];
    this.bbbbbb = [];
    for ( let i = 0; i < this.listFUECD.length; i++ ) {
      if (this.listFUECD[i].fuecd === fuecd) {
        accountStatusDT0 = this.listFUECD[i];
        for (let j = 0; j < accountStatusDT0.settlements.length; j++) {
          settlementDT0 = accountStatusDT0.settlements[j]
          for (let k = 0; k < settlementDT0.settlementInvoices.length; k++) {
            settlementInvoiceDT0 = settlementDT0.settlementInvoices[k];
            settlementInvoiceDT0.liquidacion = Number(settlementDT0.number);
            settlementInvoiceDT0.tipoFuf = 'Liquidacion';
            if (settlementInvoiceDT0.liquidacion > 0) {
              settlementInvoiceDT0.tipoFuf = 'Reliquidacion';
            }
            if (settlementInvoiceDT0.transmitter === 'participante') {
              this.aaaaaa.push(settlementInvoiceDT0);
            }
            if (settlementInvoiceDT0.transmitter === 'cenace') {
              this.bbbbbb.push(settlementInvoiceDT0);
            }
          }
        }
        this.listFUFPlanta = this.aaaaaa;
        this.listFUFCenace = this.bbbbbb;
      }
    }
  }
}
