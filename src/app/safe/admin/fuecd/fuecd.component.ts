import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MarketService } from '../../services/market.service';
import { Product } from '../../models/Product';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { Constants } from 'src/app/core/globals/Constants';
import { RateIvaSat } from '../../models/RateIvaSat';
import { CatalogOrder } from 'src/app/core/models/CatalogOrder';
import { CatalogOrderFind } from 'src/app/core/models/CatalogOrderFind';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { Fuecd } from '../../models/Fuecd';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TimeRegister} from '../../models/TimeRegister';
import {requiredFileType} from '../../../core/helpers/requiredFileType';
import {SettlementInvoiceDT0} from '../../models/settlement-invoice-dt0';


@Component({
  selector: 'app-fuecd',
  templateUrl: './fuecd.component.html',
  styleUrls: ['./fuecd.component.scss']
})

export class FuecdComponent implements OnInit {
  fuecdForm: FormGroup;
  progress;
  file: any;
  fileName: any;
  valid = false;
  timeRegisters: Array<TimeRegister> = [];
  fuecdReturn = '';

  loading: boolean;
  cols: any[];
  filters = [
    { label: 'Actividad', inputtype: 'text' },
    { label: 'Prefijo', inputtype: 'text' },
    { label: 'Activo', inputtype: 'text' },
  ];
  filterBtn = { label: 'buscar' };
  rowsPorPage = [50, 100, 250, 500];
  fuecd: Array<SettlementInvoiceDT0>;
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
    this.fuecdForm = this.fb.group({file: new FormControl(null, [Validators.required, requiredFileType('xml')])
    });
    this.cols = [
        'fuf',
        'fechaOperacion',
        'fechaEmision',
        'tipoFuf',
        'liquidacion',
        'fechaOperaciónFuf',
        'fechaPago',
        'uuidOrigen',
        'emisor',
        'tipoXml',
        'tipoDocumentoEmitir',
        'subtotal',
        'iva',
        'total',
        'subtotalDiferencia',
        'ivaDiferencia',
        'totalDiferencia',
        'generarPreDocumento',
        'verDetalleFulsContenidosFuf'
    ];
    this.loading = false;
  }

  private getFuecds() {
    this.marketService.getFufs(this.fuecdReturn)
      .subscribe(
        data => {
          this.fuecd = data;
        },
        errorData => {
          console.dir(errorData);
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
          .subscribe(data => {
                const status = data;
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
                console.dir(data);
                this.fuecdReturn = data;
                this.getFuecds();
            },
            errorData => {
              this.fuecdForm.reset();
              this.valid = false;
              this.timeRegisters = [];
              this.toastr.errorToastr(Constants.ERROR_SAVE, errorData);
            });

  }
}
