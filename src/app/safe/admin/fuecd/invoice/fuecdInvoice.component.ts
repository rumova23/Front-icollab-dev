import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Constants } from 'src/app/core/globals/Constants';
import { FormBuilder, FormGroup, Validators, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MarketService } from 'src/app/safe/services/market.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { TimeRegister } from 'src/app/safe/models/TimeRegister';

@Component({
  selector: 'app-fuecdInvoice',
  templateUrl: './fuecdInvoice.component.html',
  styleUrls: ['./fuecdInvoice.component.scss']
})

export class FuecdInvoiceComponent implements OnInit {
  timeRegisters: Array<TimeRegister> = [];
  accountStatus;
  idFuecd: number = 0;
  columns = ['id', 'fuecd', 'ful', 'date', 'concept',
    'iva', 'totalNet', 'totalAmount', 'invoice'];
  constructor(public globalService: GlobalService,
    private ngZone: NgZone, private marketService: MarketService,
    private fb: FormBuilder,
    private eventService: EventService,
    private catalogService: CatalogService,
    private toastr: ToastrManager) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getFuecd();
  }

  getFuecd() {
    this.marketService.getFuecd(this.idFuecd).subscribe(
    data => {
      const status = data;
      this.accountStatus = status;
      for (let a = 0; a < status.settlements.length; a++) {
        const settlement = status.settlements[a];
        for (let b = 0; b < settlement.settlementInvoices.length; b++) {
          const settlementInvoice = settlement.settlementInvoices[b];
          for (let c = 0; c < settlementInvoice.concepts.length; c++) {
            const concept = settlementInvoice.concepts[c];
            let timer: TimeRegister = {};
            timer.fuecd = status.fuecd;
            timer.id = concept.id;
            timer.idSettlementInvoice = settlementInvoice.id;
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
      }
    },
    errorData => {
      this.toastr.errorToastr(Constants.ERROR_SAVE, errorData);
    });
  }

  invoice() {
    let idsConcept:Array<Number> = [];
    let idsSettlementInvoice:Array<Number> = [];
    for(var i = 0; i < this.timeRegisters.length; i++) {
      if( this.timeRegisters[i].invoice == true) {
        idsConcept.push(this.timeRegisters[i].id);
        idsSettlementInvoice.push(this.timeRegisters[i].idSettlementInvoice);
      }
    }
    if(idsConcept.length == 0 || idsSettlementInvoice.length == 0) {
      this.toastr.errorToastr(Constants.ERROR_LOAD, "No hay ningun concepto seleccionado");
    }
    this.marketService.saveFuecdInvoice(
      {
        idsConcept: idsConcept,
        idsSettlementInvoice: idsSettlementInvoice,
        accountStatus: this.accountStatus
      }
    )
      .subscribe(
        data => {

          this.eventService.sendMainSafe(new EventMessage(22, {}));
        },
        errorData => {
          
          this.toastr.errorToastr(Constants.ERROR_SAVE, errorData);
        });
  }

}
