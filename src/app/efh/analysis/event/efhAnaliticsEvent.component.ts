import {Component, Input, OnInit} from '@angular/core';
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
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-efh-analitics-event',
  templateUrl: './efhAnaliticsEvent.component.html',
  styleUrls: ['./efhAnaliticsEvent.component.scss']
})
export class EfhAnaliticsEventComponent implements OnInit {

  title: String;
  @Input() nombreCatalogo: string;
  analysisForm: FormGroup;
  unitsArr = [];
  data: any[] = [];
  dataAnalysis: Array<any>;
  dataSubmit = {};
  result;
  resultService;
  submittedData = false;
  currentYear = new Date().getFullYear();
  initDate = (this.currentYear - 1) + '-01-01';
  selectedUnit;
  selectedDate;

  constructor(
      private catalogoMaestroService: CatalogoMaestroService,
      private efhService: EfhService,
      private formBuilder: FormBuilder,
      public  toastr: ToastrManager,
      public  globalService: GlobalService,
      private eventService: EventService,
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
      queryDate: ['', Validators.required]
    });
    this.selectedUnit = undefined;
    this.getCatalogs();
  }

  getCatalogs() {
    this.addBlock(1, 'Cargando...');
    this.catalogoMaestroService.getCatalogoIndividual('unit')
        .subscribe(
            data => {
              this.resultService = data;
              let k = 0;
              for (const element of this.resultService) {
                k += 1;
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
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
              this.addBlock(2, null);
            }
        ).add(() => {
      this.addBlock(2, null);
    });
  }

  getDataSource(data) {
    this.data = [];
    this.addBlock(1, 'Cargando...');
    this.efhService.getEventsConfiguratedAsc().subscribe(
        dataBack => {
          this.result = dataBack;
          let i = 0;
          for (const element of this.result) {
            i += 1;
            const obj = {};
            obj['id'] = element.id;
            obj['idTypeEvent'] = element.idtypeevent;
            obj['idTypeFuel'] = element.idtypefuel;
            obj['idUnit'] = element.idunit;
            obj['dateInit'] = this.datePipe.transform(this.getTimeLocale(element.dateinit), 'yyyy-MM-dd HH:mm:ss');
            obj['dateEnd'] = this.datePipe.transform(this.getTimeLocale(element.dateend), 'yyyy-MM-dd HH:mm:ss');
            obj['chargebeforeshot'] = element.chargebeforeshot;
            obj['chargebeforereject'] = element.chargebeforereject;
            obj['chargebeforerunback'] = element.chargebeforerunback;
            obj['chargeafterrunback'] = element.chargeafterrunback;
            obj['chargebeforestop'] = element.chargebeforestop;
            obj['chargebeforestart'] = element.chargebeforestart;
            obj['programmed'] = element.programmed;
            obj['order'] = i;
            obj['spliced'] = element.spliced;
            obj['userUpdated'] = element.userUpdated === null ? element.userCreated : element.userUpdated;
            const dateUpdated = element.dateUpdated === null ? element.dateCreated : element.dateUpdated;
            obj['dateUpdated'] = '.';
            if (dateUpdated) {
              obj['dateUpdated'] = this.datePipe.transform(new Date(dateUpdated), 'yyyy-MM-dd HH:mm');
            }
            obj['status'] = element.active === true ? 'Activo' : 'Inactivo';
            obj['element'] = element;

            this.data.push(obj);
          }
          this.calculate();
        }, errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
          this.addBlock(2, null);
        }
    ).add(() => {
      this.addBlock(2, null);
    });
  }

  onSubmit() {
    this.submittedData = true;
    if (this.analysisForm.controls['queryDate'].invalid
        || (this.selectedUnit === undefined || this.selectedUnit === null)) {
      this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Lo siento,');
      return;
    }
    this.dataSubmit['idunit'] = this.analysisForm.controls['unitControl'].value;
    this.selectedDate = this.analysisForm.controls['queryDate'].value;
    console.log(this.selectedDate.toString());
    this.dataSubmit['dateinit'] = this.datePipe.transform(this.getTimeLocale(this.selectedDate), 'yyyy-MM-dd', 'es-MX');
    debugger;
    this.getDataSource(this.dataSubmit);
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }

  regresar() {
    this.eventService.sendChangePage(new EventMessage(4, {}, 'Efh.Inicio'));
  }

  getTimeLocale(dateString: string): Date {
    const toConvertDate = new Date(dateString);
    const offsetTimeZone = toConvertDate.getTimezoneOffset() * 60000;
    return new Date(toConvertDate.getTime() + offsetTimeZone);
  }

  calculate() {
    // Indicators
    const FF_gas = 1;
    const FF_diese = 1.25;
    let FF = 0;
    const cost_EFHi = 305.50;

    // Variables
    let totalStart = 0;
    let start;
    let date = '';
    let startTime = '';
    let stopTime = '';
    let runAOH;
    let runEFHi;
    let runESi;
    let runEFHi_costo;
    let rateEFHi_costo;
    let totalTrips = 0;
    let totalStarts = 0;
    let totalESi = 0.00;
    let totalAOH = 0.0;
    let totalEFHi = 0.0;
    let totalEFHi_costo = '';
    let sinceTrips = 0;
    let sinceStarts = 0;
    let sinceESi = 0.00;
    let sinceAOH = 0.0;
    let sinceEFHi = 0.0;
    let sinceEFHi_costo = '';
    let esi = 0.00;
    let ff = 1;
    let startFlag = 0;
    let tripFlag = 0;
    let loadTrip = '';
    let esi_tj = 0.0;
    let rejectFlag = 0;
    let loadReject = '';
    let esi_lrj = 1.00;
    let rapidLoad = 0;
    let changeRange = '';
    let changeRate = '';
    let esi_lcj = 0.00;
    this.dataAnalysis = [];

    // Auxiliares
    let firstEvent = true;
    let eventStartTime;
    let eventEndTime;
    let duration;
    let today;

    // Initialization
    const obj = {};
    obj['totalStarts'] = totalStart;
    obj['start'] = start;
    obj['date'] = date;
    obj['startTime'] = startTime;
    obj['stopTime'] = stopTime;
    obj['runAOH'] = runAOH;
    obj['runEFHi'] = runEFHi;
    obj['runESi'] = runESi;
    obj['runEFHi_costo'] = runEFHi_costo;
    obj['rateEFHi_costo'] = rateEFHi_costo;
    obj['totalTrips'] = totalTrips;
    obj['totalStarts'] = totalStarts;
    obj['totalESi'] = totalESi;
    obj['totalAOH'] = totalAOH;
    obj['totalEFHi'] = totalEFHi;
    obj['totalEFHi_costo'] = totalEFHi_costo;
    obj['sinceTrips'] = sinceTrips;
    obj['sinceStarts'] = sinceStarts;
    obj['sinceESi'] = sinceESi;
    obj['sinceAOH'] = sinceAOH;
    obj['sinceEFHi'] = sinceEFHi;
    obj['sinceEFHi_costo'] = sinceEFHi_costo;
    obj['esi'] = esi;
    obj['ff'] = ff;
    obj['startFlag'] = startFlag;
    obj['tripFlag'] = tripFlag;
    obj['loadTrip'] = loadTrip;
    obj['esi_tj'] = esi_tj;
    obj['rejectFlag'] = rejectFlag;
    obj['loadReject'] = loadReject;
    obj['esi_lrj'] = esi_lrj;
    obj['rapidLoad'] = rapidLoad;
    obj['changeRange'] = changeRange;
    obj['changeRate'] = changeRate;
    obj['esi_lcj'] = esi_lcj;
    this.dataAnalysis.push(obj);

    rateEFHi_costo = 305.50;

    for (const event of this.data) {
      if (event.idUnit === 1) {
        if (event.idTypeFuel === 1) {
          FF = 1;
        } else if (event.idTypeFuel === 952) {
          FF = 1.25;
        } else if (event.idTypeFuel === 5953 || event.idTypeFuel === 5952 || event.idTypeEvent === 4957 || event.idTypeEvent === 954) {
          FF = 0;
        }
        debugger;
        if (firstEvent) {
          eventStartTime = new Date(event.dateInit);
          eventStartTime.setHours(0);
          eventStartTime.setMinutes(0);
          eventStartTime.setSeconds(0);

          date = this.datePipe.transform(eventStartTime, 'dd/MM/yy');
          firstEvent = false;
        }

        if (event.idTypeEvent === 1) {
          start = 0;
          eventEndTime = new Date(event.dateInit);
          duration = (eventEndTime.valueOf() - eventStartTime.valueOf()) / (1000 * 3600);
          startTime = this.datePipe.transform(eventStartTime, 'HH:mm');
          stopTime = this.datePipe.transform(eventEndTime, 'HH:mm:ss');

          runAOH = duration;
          runEFHi = duration * FF;
          runEFHi_costo = runEFHi * rateEFHi_costo;

          tripFlag = 1;
          startFlag = 0;

          totalTrips = totalTrips + tripFlag;
          totalStarts = totalStarts + start;
          totalAOH = totalAOH + runAOH;
          totalEFHi = totalEFHi + runEFHi;
          totalEFHi_costo = totalEFHi_costo + runEFHi_costo;

          sinceTrips = sinceTrips + tripFlag;
          sinceStarts = sinceStarts + startFlag;
          sinceAOH = sinceAOH + runAOH;
          sinceEFHi = sinceEFHi + runEFHi;
          sinceEFHi_costo = sinceEFHi_costo + runEFHi_costo;

          loadTrip = event.chargebeforeshot;

          const obj = {};
          obj['totalStarts'] = totalStart;
          obj['start'] = start;
          obj['date'] = date;
          obj['startTime'] = startTime;
          obj['stopTime'] = stopTime;
          obj['runAOH'] = runAOH;
          obj['runEFHi'] = runEFHi;
          obj['runESi'] = runESi;
          obj['runEFHi_costo'] = runEFHi_costo;
          obj['rateEFHi_costo'] = rateEFHi_costo;
          obj['totalTrips'] = totalTrips;
          obj['totalStarts'] = totalStarts;
          obj['totalESi'] = totalESi;
          obj['totalAOH'] = totalAOH;
          obj['totalEFHi'] = totalEFHi;
          obj['totalEFHi_costo'] = totalEFHi_costo;
          obj['sinceTrips'] = sinceTrips;
          obj['sinceStarts'] = sinceStarts;
          obj['sinceESi'] = sinceESi;
          obj['sinceAOH'] = sinceAOH;
          obj['sinceEFHi'] = sinceEFHi;
          obj['sinceEFHi_costo'] = sinceEFHi_costo;
          obj['esi'] = esi;
          obj['ff'] = ff;
          obj['startFlag'] = startFlag;
          obj['tripFlag'] = tripFlag;
          obj['loadTrip'] = loadTrip;
          obj['esi_tj'] = esi_tj;
          obj['rejectFlag'] = rejectFlag;
          obj['loadReject'] = loadReject;
          obj['esi_lrj'] = esi_lrj;
          obj['rapidLoad'] = rapidLoad;
          obj['changeRange'] = changeRange;
          obj['changeRate'] = changeRate;
          obj['esi_lcj'] = esi_lcj;
          this.dataAnalysis.push(obj);
        }
      }
    }
  }

}
