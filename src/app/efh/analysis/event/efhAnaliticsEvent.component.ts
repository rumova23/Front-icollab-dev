import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CatalogoMaestroService} from '../../../core/services/catalogo-maestro.service';
import {EfhService} from '../../../core/services/efh.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {GlobalService} from '../../../core/globals/global.service';
import {EventService} from '../../../core/services/event.service';
import {DatePipe} from '@angular/common';
import {EventMessage} from '../../../core/models/EventMessage';
import {EventBlocked} from '../../../core/models/EventBlocked';
import {Constants} from '../../../core/globals/Constants';
import {ExportToExcelService} from '../../../core/services/export-to-excel.service';

@Component({
  selector: 'app-efh-analitics-event',
  templateUrl: './efhAnaliticsEvent.v2.component.html',
  styleUrls: ['./efhAnaliticsEvent.component.scss']
})
export class EfhAnaliticsEventComponent implements OnInit {

  title: String;
  @Input() nombreCatalogo: string;
  @ViewChild('tableAnalitics') TABLE: ElementRef;
  analysisForm: FormGroup;
  unitsArr = [];
  data: any[] = [];
  dataAnalysis: Array<any>;
  result;
  resultService;
  submittedData = false;
  selectedUnit;
  period: string;
  exportDisabled = true;

  rapidChangeTotal = 0;
  loadRejTotal = 0;
  tripsTotal = 0;
  startsTotal = 0;
  esiTotal = 0;
  aohTotal = 0;
  efhiTotal = 0;
  efhiCostTotal = 0;

  tripsSlpo = 0;
  startsSlpo = 0;
  esiSlpo = 0;
  aohSlpo = 0;
  efhiSlpo = 0;
  efhiCostSlpo = 0;

  constructor(
      private catalogoMaestroService: CatalogoMaestroService,
      private efhService: EfhService,
      private formBuilder: FormBuilder,
      public  toastr: ToastrManager,
      public  globalService: GlobalService,
      private eventService: EventService,
      private exportToExcelService: ExportToExcelService,
      private datePipe: DatePipe
  ) {
    this.analysisForm = this.formBuilder.group({});
  }

  get f() {
    return this.analysisForm.controls;
  }

  ngOnInit() {
    this.submittedData = false;
    this.title = 'Análisis / ' + this.nombreCatalogo;
    this.analysisForm = this.formBuilder.group({
      unitControl: [null, null],
      monthControl: ['', Validators.required],
      yearControl: ['', Validators.required]
    });
    this.selectedUnit = undefined;
    this.getCatalogs();
  }

  getCatalogs() {
    this.addBlock(1, 'Cargando...');
    this.catalogoMaestroService.getCatalogoIndividual('unit')
        .subscribe(
            data1 => {
              this.resultService = data1;
              let k = 0;
              for (const element of this.resultService) {
                  k += 1;
                  if (element.active) {
                      const obj = {};
                      // @ts-ignore
                      obj.order = k;
                      // @ts-ignore
                      obj.id = element.id;
                      // @ts-ignore
                      obj.name = element.code;
                      // @ts-ignore
                      obj.description = element.description;
                      // @ts-ignore
                      obj.active = element.active;
                      this.unitsArr.push(obj);
                  }
              }
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
              this.addBlock(2, null);
            }
        ).add(() => {
      this.addBlock(2, null);
    });
  }

  getDataSource(period: string, idUnit: number) {
    this.data = [];
    this.dataAnalysis = [];
    this.resetSummary();
    this.addBlock(1, 'Cargando...');
    this.efhService.getOperationDataByPeriod(period, idUnit).subscribe(
        dataBack => {
          this.result = dataBack;
          let i = 0;
          for (const element of this.result) {
              i += 1;
              const obj = {};
              obj['element'] = element;
              obj['id'] = element.id;
              obj['totalStarts'] = element.totalStarts;
              obj['start'] = element.starts;
              obj['date'] = this.datePipe.transform(element.eventDate, 'dd/MM/yyyy');
              obj['startTime'] = this.datePipe.transform(element.startDate, 'HH:mm:ss');
              obj['stopTime'] = this.datePipe.transform(element.endDate, 'HH:mm:ss');
              obj['idType'] = element.idType;
              obj['typeEvent'] = element.typeEvent;
              obj['idUnit'] = element.idUnit;
              obj['runAOH'] = element.runAOH;
              obj['runEFHi'] = element.runEFHi;
              obj['runESi'] = element.runESi;
              obj['runEFHi_costo'] = element.runEFHiCost;
              obj['rateEFHi_costo'] = element.rateEFHiCost;
              obj['totalTrips'] = element.totalTrips;
              obj['totalStarts'] = element.totalStart;
              obj['totalESi'] = element.totalESi;
              obj['totalAOH'] = element.totalAOH;
              obj['totalEFHi'] = element.totalEFHi;
              obj['totalEFHi_costo'] = element.totalEFHiCost;
              obj['sinceTrips'] = element.slpoTrips;
              obj['sinceStarts'] = element.slpoStarts;
              obj['sinceESi'] = element.slpoESi;
              obj['sinceAOH'] = element.slpoAOH;
              obj['sinceEFHi'] = element.slpoEFHi;
              obj['sinceEFHi_costo'] = element.slpoEFHiCost;
              obj['esi'] = element.esi;
              obj['ff'] = element.ff;
              obj['startFlag'] = element.startFlag;
              obj['tripFlag'] = element.tripFlag;
              obj['loadTrip'] = element.loadTrip;
              obj['esi_tj'] = element.esiPerTj;
              obj['rejectFlag'] = element.rejectFlag;
              obj['loadReject'] = element.loadRejection;
              obj['esi_lrj'] = element.esiPerLRj;
              obj['rapidLoad'] = element.rapidLoadChange;
              obj['changeRange'] = element.changeRangeLoadYj;
              obj['changeRate'] = element.changeRateXj;
              obj['esi_lcj'] = element.esiPerLCj;
              obj['comment'] = element.eventSummary;

              this.rapidChangeTotal = this.rapidChangeTotal + element.rapidLoadChange;
              this.loadRejTotal = this.loadRejTotal + element.loadRejection;

              if (i === this.result.length) {
                  this.tripsTotal = element.totalTrips;
                  this.startsTotal = element.totalStart;
                  this.esiTotal = element.totalESi;
                  this.aohTotal = element.totalAOH;
                  this.efhiTotal = element.totalEFHi;
                  this.efhiCostTotal = element.totalEFHiCost;

                  this.tripsSlpo = element.slpoTrips;
                  this.startsSlpo = element.slpoStarts;
                  this.esiSlpo = element.slpoESi;
                  this.aohSlpo = element.slpoAOH;
                  this.efhiSlpo = element.slpoEFHi;
                  this.efhiCostSlpo = element.slpoEFHiCost;
              }

              this.dataAnalysis.push(obj);
          }
        }, errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
          this.addBlock(2, null);
        }
    ).add(() => {
      this.addBlock(2, null);
      this.exportDisabled = false;
    });
  }

  onSubmit() {
    this.submittedData = true;
    if (this.analysisForm.controls['monthControl'].invalid
        || this.analysisForm.controls['yearControl'].invalid
        || (this.selectedUnit === undefined || this.selectedUnit === null)) {
      this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Lo siento,');
      return;
    }

    let month: string = this.analysisForm.controls['monthControl'].value + '';
    const year: string = this.analysisForm.controls['yearControl'].value + '';
    month = month.padStart(2, '0');
    this.period = month + year;
    this.getDataSource(this.period, this.selectedUnit);
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }

  regresar() {
      this.eventService.sendChangePage(new EventMessage(4, {}, 'Efh.Inicio'));
  }

  exportAsExcel() {
      this.exportToExcelService.exportAsExcelFile(this.dataAnalysis, 'EFG-ES Operating Data');
  }

  resetSummary() {
      this.rapidChangeTotal = 0;
      this.loadRejTotal = 0;
      this.tripsTotal = 0;
      this.startsTotal = 0;
      this.esiTotal = 0;
      this.aohTotal = 0;
      this.efhiTotal = 0;
      this.efhiCostTotal = 0;

      this.tripsSlpo = 0;
      this.startsSlpo = 0;
      this.esiSlpo = 0;
      this.aohSlpo = 0;
      this.efhiSlpo = 0;
      this.efhiCostSlpo = 0;
  }

}
