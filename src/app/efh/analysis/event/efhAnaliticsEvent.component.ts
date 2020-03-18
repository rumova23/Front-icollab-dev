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
  templateUrl: './efhAnaliticsEvent.component.html',
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
  dataPartial: Array<any>;
  datesOfRange: Array<Date>;
  dataSubmit = {};
  result;
  resultService;
  submittedData = false;
  currentYear = new Date().getFullYear();
  initDate = (this.currentYear - 1) + '-01-01';
  selectedUnit;
  selectedInitDate;
  selectedEndDate;
  datesValidation = false;
  exportDisabled = true;

    // Indicators
    FF = 0;
    FF_GAS = 0;
    FF_DIESEL = 0;
    FF_SC = 0;
    COSTO_EFHi = 0;
    MAX_LOAD = 0;

  tripLoadCurve: number[][] = [
    [0, 1],
    [10, 2],
    [20, 3],
    [30, 4],
    [40, 5],
    [50, 6],
    [60, 6.9],
    [70, 7.7],
    [80, 8.5],
    [90, 9.3],
    [100, 10]
  ];

  rejectLoadCurve: number[][] = [
    [10, 0],
    [12.5, 0.3],
    [15, 0.5],
    [20, 1],
    [33, 2],
    [62.4, 4],
    [100, 6]
  ];

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
      initDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.datesOfRange = [];
    this.dataPartial = [];
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

  getDataSource(data) {
    this.data = [];
    this.addBlock(1, 'Cargando...');
    this.efhService.getEventsConfiguratedByDate(data).subscribe(
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
            obj['dateInit'] = this.datePipe.transform(new Date(element.dateinit), 'yyyy-MM-dd HH:mm:ss');
            obj['dateEnd'] = this.datePipe.transform(new Date(element.dateend), 'yyyy-MM-dd HH:mm:ss');
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

          this.efhService.getIndicatorsConfiguratedByDate(data).subscribe(
              dataResult => {
                  this.result = dataResult;
                  for (const element of this.result) {
                      if (!this.globalService.aguila) {
                          switch (element.idtypeindicator) {
                              case 1: this.COSTO_EFHi = element.value;
                                      break;
                              case 2: this.FF_GAS = element.value;
                                      break;
                              case 3: this.MAX_LOAD = element.value;
                                      break;
                          }
                      } else {
                          switch (element.idtypeindicator) {
                              case 1: this.COSTO_EFHi = element.value;
                                      break;
                              case 4: if (element.idtypefuel === 1) {
                                        this.FF_GAS = element.value;
                                      } else if (element.idtypefuel === 952) {
                                        this.FF_DIESEL = element.value;
                                      }
                                      break;
                              case 3: this.MAX_LOAD = element.value;
                                      break;
                              case 5: this.FF_SC = element.value;
                                      break;
                          }
                      }

                  }

                  this.calculate();

              }, errorResult => {
                  this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
              }
          );
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
    if (this.analysisForm.controls['initDate'].invalid
        || this.analysisForm.controls['endDate'].invalid
        || (this.selectedUnit === undefined || this.selectedUnit === null)) {
      this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Lo siento,');
      return;
    }

    this.dataSubmit['idunit'] = this.analysisForm.controls['unitControl'].value;
    this.selectedInitDate = this.analysisForm.controls['initDate'].value;
    this.selectedEndDate = this.analysisForm.controls['endDate'].value;

    if (this.compareDate(this.selectedInitDate, this.selectedEndDate)) {
        this.toastr.errorToastr('Fecha inicio debe ser menor a Fecha final, verifique', 'Lo siento,');
        this.datesValidation = true;
        return;
    }

    this.datesValidation = false;

    this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.selectedInitDate + 'T00:00:00.000'), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
    this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.selectedEndDate + 'T00:00:00.000'), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
    this.fillDatesOfRange(new Date(this.selectedInitDate + 'T00:00:00.000'), new Date(this.selectedEndDate + 'T00:00:00.000'));
    this.getDataSource(this.dataSubmit);
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }

  regresar() {
    this.eventService.sendChangePage(new EventMessage(4, {}, 'Efh.Inicio'));
  }

  calculate() {
    this.exportDisabled = false;

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
    let totalEFHi_costo = 0;
    let sinceTrips = 0;
    let sinceStarts = 0;
    let sinceESi = 0.00;
    let sinceAOH = 0.0;
    let sinceEFHi = 0.0;
    let sinceEFHi_costo = 0;
    let esi = 0.00;
    let ff = 1;
    let startFlag = 0;
    let tripFlag = 0;
    let loadTrip = 0;
    let esi_tj = 0.0;
    let rejectFlag = 0;
    let loadReject = 0;
    let esi_lrj = 1.00;
    let rapidLoad = 0;
    let changeRange;
    let changeRate;
    let esi_lcj = 0.00;
    this.dataAnalysis = [];

    // Auxiliares
    let firstEvent = true;
    let waitForStart = false;
    let thereAreMore = false;
    let eventStartTime;
    let eventEndTime;
    let duration;
    let newDate;

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

    rateEFHi_costo = this.COSTO_EFHi;
    let cont = 0;

    for (const dateToAnalyze of this.datesOfRange) {
        this.getDataPartial(dateToAnalyze);
        waitForStart = false;
        thereAreMore = false;
        firstEvent = true;
        cont = 0;

        for (const event of this.dataPartial) {
            cont++;
            if (event.idTypeFuel === 1) {
                this.FF = this.FF_GAS;
            } else if (event.idTypeFuel === 952) {
                this.FF = this.FF_DIESEL;
            } else if (event.idTypeFuel === 5953 || event.idTypeFuel === 5952 || event.idTypeEvent === 4957 || event.idTypeEvent === 954) {
                this.FF = this.FF_SC;
            }

            tripFlag = 0;
            startFlag = 0;
            start = 0;
            loadTrip = 0;
            rejectFlag = 0;
            loadReject = 0;
            rapidLoad = 0;
            changeRange = 0;
            changeRate = 0;
            esi = 0.00;
            esi_tj = 0.0;
            esi_lrj = 0.0;
            esi_lcj = 0.0;

            debugger;

            if (waitForStart && event.idTypeEvent !== 4954) {
                continue;
            } else {
                // eventStartTime = new Date(event.dateInit);
                date = this.datePipe.transform(eventStartTime, 'dd/MM/yy');
            }

            // PRIMER EVENTO
            if (firstEvent) {
                eventStartTime = new Date(event.dateInit);
                eventStartTime.setHours(0);
                eventStartTime.setMinutes(0);
                eventStartTime.setSeconds(0);
                firstEvent = false;
            }

            // ULTIMO EVENTO
            if (cont === this.dataPartial.length) {
                eventEndTime = new Date(event.dateInit);
                eventEndTime.setHours(23);
                eventEndTime.setMinutes(59);
                eventEndTime.setSeconds(59);
            }

            // OPERACION NORMAL
            if (event.idTypeEvent === 956) {
                eventEndTime = new Date(event.dateEnd);
                duration = (eventEndTime.valueOf() - eventStartTime.valueOf()) / (1000 * 3600);
                startTime = this.datePipe.transform(eventStartTime, 'HH:mm');
                stopTime = this.datePipe.transform(eventEndTime, 'HH:mm:ss');

                runAOH = duration;
                runEFHi = duration * this.FF;
                runEFHi_costo = runEFHi * rateEFHi_costo;
            }

            // DISPARO
            if (event.idTypeEvent === 1) {
                /* if (thereAreMore) {
                    eventEndTime = new Date(this.dataPartial[cont].dateInit);
                    thereAreMore = false;
                } else {
                    eventEndTime = new Date(event.dateInit);
                } */
                eventEndTime = new Date(event.dateInit);
                duration = (eventEndTime.valueOf() - eventStartTime.valueOf()) / (1000 * 3600);
                startTime = this.datePipe.transform(eventStartTime, 'HH:mm');
                stopTime = this.datePipe.transform(eventEndTime, 'HH:mm:ss');

                runAOH = duration;
                runEFHi = duration * this.FF;
                runEFHi_costo = runEFHi * rateEFHi_costo;

                tripFlag = 1;

                loadTrip = event.chargebeforeshot;

                totalTrips = totalTrips + tripFlag;
                sinceTrips = sinceTrips + tripFlag;

                esi_tj = this.calcularEsiForTrip(loadTrip);

                waitForStart = true;
            }

            // PARO
            if (event.idTypeEvent === 4957 || event.idTypeEvent === 954) {
                /*
                if (thereAreMore) {
                    eventEndTime = new Date(this.dataPartial[cont].dateInit);
                    thereAreMore = false;
                } else {
                    eventEndTime = new Date(event.dateInit);
                } */
                eventEndTime = new Date(event.dateInit);
                duration = (eventEndTime.valueOf() - eventStartTime.valueOf()) / (1000 * 3600);
                startTime = this.datePipe.transform(eventStartTime, 'HH:mm');
                stopTime = this.datePipe.transform(eventEndTime, 'HH:mm:ss');

                runAOH = duration;
                runEFHi = duration * this.FF;
                runEFHi_costo = runEFHi * rateEFHi_costo;

                tripFlag = 1;

                loadTrip = event.chargebeforeshot;

                totalTrips = totalTrips + tripFlag;
                sinceTrips = sinceTrips + tripFlag;

                esi_tj = this.calcularEsiForTrip(loadTrip);

                waitForStart = true;
            }

            // ARRANQUE
            if (event.idTypeEvent === 4954) {
                start = 1;
                startFlag = 1;

                eventStartTime = new Date(event.dateEnd);
                waitForStart = false;

                if (cont < this.dataPartial.length && (this.dataPartial[cont].idTypeEvent === 1
                    || this.dataPartial[cont].idTypeEvent === 4957 || this.dataPartial[cont].idTypeEvent === 954)) {
                    continue;
                }

                startTime = this.datePipe.transform(eventStartTime, 'HH:mm');
                stopTime = this.datePipe.transform(eventEndTime, 'HH:mm:ss');

                duration = (eventEndTime.valueOf() - eventStartTime.valueOf()) / (1000 * 3600);
                runAOH = duration;
                runEFHi = duration * this.FF;
                runEFHi_costo = runEFHi * rateEFHi_costo;

                totalStarts = totalStarts + start;
                sinceStarts = sinceStarts + startFlag;
            }

            totalAOH = totalAOH + runAOH;
            totalEFHi = totalEFHi + runEFHi;
            totalEFHi_costo = totalEFHi_costo + runEFHi_costo;

            sinceAOH = sinceAOH + runAOH;
            sinceEFHi = sinceEFHi + runEFHi;
            sinceEFHi_costo = sinceEFHi_costo + runEFHi_costo;

            esi = (this.FF * startFlag) + esi_tj + esi_lcj + esi_lrj;
            runESi = esi;
            totalESi = totalESi + esi;
            sinceESi = sinceESi + esi;

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

    /*
    for (const event of this.data) {
        debugger;
        cont++;
        if (event.idTypeFuel === 1) {
          this.FF = this.FF_GAS;
        } else if (event.idTypeFuel === 952) {
            this.FF = this.FF_DIESEL;
        } else if (event.idTypeFuel === 5953 || event.idTypeFuel === 5952 || event.idTypeEvent === 4957 || event.idTypeEvent === 954) {
            this.FF = this.FF_SC;
        }

        tripFlag = 0;
        startFlag = 0;
        start = 0;
        loadTrip = 0;
        rejectFlag = 0;
        loadReject = 0;
        rapidLoad = 0;
        changeRange = 0;
        changeRate = 0;
        esi = 0.00;
        esi_tj = 0.0;
        esi_lrj = 0.0;
        esi_lcj = 0.0;
        newDate = this.datePipe.transform(new Date(event.dateInit), 'dd/MM/yy');

        if (firstEvent) {
          eventStartTime = new Date(event.dateInit);
          eventStartTime.setHours(0);
          eventStartTime.setMinutes(0);
          eventStartTime.setSeconds(0);
          date = this.datePipe.transform(eventStartTime, 'dd/MM/yy');
          firstEvent = false;
        }

        if (date !== newDate) {
          date = newDate;
          eventStartTime = new Date(event.dateInit);
          eventStartTime.setHours(0);
          eventStartTime.setMinutes(0);
          eventStartTime.setSeconds(0);
        }

        if (cont === this.data.length) {
          eventEndTime = new Date(event.dateInit);
          eventEndTime.setHours(23);
          eventEndTime.setMinutes(59);
          eventEndTime.setSeconds(59);
        }

        if (event.idTypeEvent === 956) {
            eventEndTime = new Date(event.dateEnd);
            duration = (eventEndTime.valueOf() - eventStartTime.valueOf()) / (1000 * 3600);
            startTime = this.datePipe.transform(eventStartTime, 'HH:mm');
            stopTime = this.datePipe.transform(eventEndTime, 'HH:mm:ss');

            runAOH = duration;
            runEFHi = duration * this.FF;
            runEFHi_costo = runEFHi * rateEFHi_costo;
        }

        if (event.idTypeEvent === 1) {
          eventEndTime = new Date(event.dateInit);
          duration = (eventEndTime.valueOf() - eventStartTime.valueOf()) / (1000 * 3600);
          startTime = this.datePipe.transform(eventStartTime, 'HH:mm');
          stopTime = this.datePipe.transform(eventEndTime, 'HH:mm:ss');

          runAOH = duration;
          runEFHi = duration * this.FF;
          runEFHi_costo = runEFHi * rateEFHi_costo;

          tripFlag = 1;

          loadTrip = event.chargebeforeshot;

          totalTrips = totalTrips + tripFlag;
          sinceTrips = sinceTrips + tripFlag;

          esi_tj = this.calcularEsiForTrip(loadTrip);
        }

        if (event.idTypeEvent === 4957 || event.idTypeEvent === 954) {
            eventEndTime = new Date(event.dateInit);
            duration = (eventEndTime.valueOf() - eventStartTime.valueOf()) / (1000 * 3600);
            startTime = this.datePipe.transform(eventStartTime, 'HH:mm');
            stopTime = this.datePipe.transform(eventEndTime, 'HH:mm:ss');

            runAOH = duration;
            runEFHi = duration * this.FF;
            runEFHi_costo = runEFHi * rateEFHi_costo;

            tripFlag = 1;

            loadTrip = event.chargebeforeshot;

            totalTrips = totalTrips + tripFlag;
            sinceTrips = sinceTrips + tripFlag;

            esi_tj = this.calcularEsiForTrip(loadTrip);
        }

        if (event.idTypeEvent === 4954) {
            debugger;
          start = 1;
          startFlag = 1;

          eventStartTime = new Date(event.dateEnd);
          startTime = this.datePipe.transform(eventStartTime, 'HH:mm');
          stopTime = this.datePipe.transform(eventEndTime, 'HH:mm:ss');

          if (cont === this.data.length) {
            duration = (eventEndTime.valueOf() - eventStartTime.valueOf()) / (1000 * 3600);
            runAOH = duration;
            runEFHi = duration * this.FF;
            runEFHi_costo = runEFHi * rateEFHi_costo;

            totalStarts = totalStarts + start;
            sinceStarts = sinceStarts + startFlag;
          }
        }

        totalAOH = totalAOH + runAOH;
        totalEFHi = totalEFHi + runEFHi;
        totalEFHi_costo = totalEFHi_costo + runEFHi_costo;

        sinceAOH = sinceAOH + runAOH;
        sinceEFHi = sinceEFHi + runEFHi;
        sinceEFHi_costo = sinceEFHi_costo + runEFHi_costo;

        esi = (this.FF * startFlag) + esi_tj + esi_lcj + esi_lrj;
        runESi = esi;
        totalESi = totalESi + esi;
        sinceESi = sinceESi + esi;

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
    } */
  }

  calcularEsiForTrip(load: number): number {
    const percentLoad = load * 100 / this.MAX_LOAD;
    let esi = 0;
    for (let i = 0; i < this.tripLoadCurve.length; i++) {
      if (i === this.tripLoadCurve.length) {
        break;
      }
      if (percentLoad >= this.tripLoadCurve[i][0] && percentLoad <= this.tripLoadCurve[i + 1][0]) {
        esi = this.tripLoadCurve[i][1] + (this.tripLoadCurve[i + 1][1] - this.tripLoadCurve[i][1]) / (this.tripLoadCurve[i + 1][0] - this.tripLoadCurve[i][0]) * (percentLoad - this.tripLoadCurve[i][0]);
        break;
      }
    }
    return esi;
  }

  calcularEsiForReject(load: number): number {
    const percentLoad = load * 100 / this.MAX_LOAD;
    let esi = 0;
    for (let i = 0; i < this.rejectLoadCurve.length; i++) {
      if (i === this.rejectLoadCurve.length) {
        break;
      }
      if (percentLoad >= this.rejectLoadCurve[i][0] && percentLoad <= this.rejectLoadCurve[i + 1][0]) {
        esi = this.rejectLoadCurve[i][1] + (this.rejectLoadCurve[i + 1][1] - this.rejectLoadCurve[i][1]) / (this.rejectLoadCurve[i + 1][0] - this.rejectLoadCurve[i][0]) * (percentLoad - this.rejectLoadCurve[i][0]);
        break;
      }
    }
    return esi;
  }

  calcularEsiForRunback(minutes: number, ci: number, cf: number): number {
    const yj = ((ci - cf) * 100) / this.MAX_LOAD;
    const xj = yj / minutes;
    return xj;
  }

  compareDate(date1: string, date2: string): boolean {
    let d1 = new Date(date1);
    let d2 = new Date(date2);

    // Check if the dates are equal
    let same = d1.getTime() === d2.getTime();

    if (same) { return false; }

    // Check if the first is greater than second
    if (d1 > d2) { return true; }

    // Check if the first is less than second
    if (d1 < d2) { return false; }
  }

  fillDatesOfRange(startDate: Date, endDate: Date) {
      let currentDate = startDate;
      while (currentDate <= endDate) {
        this.datesOfRange.push(currentDate);
        currentDate = new Date(currentDate.getTime() + (1000 * 60 * 60 * 24));
      }
  }

  exportAsExcel() {
      this.exportToExcelService.exportAsExcelFile(this.TABLE.nativeElement, 'EFG-ES Operating Data');
  }

  getDateArrayLength(day: Date): number {
      let count = 0;
      const dayToCheck = this.datePipe.transform(new Date(day), 'yyyy-MM-dd');
      for (const element of this.data) {
          const dateInit = this.datePipe.transform(new Date(element.dateinit), 'yyyy-MM-dd');
          if (dateInit === dayToCheck) {
            count++;
          }
      }
      return count;
  }

  getDataPartial(day: Date) {
      this.dataPartial.length = 0;
      const dayToCheck = this.datePipe.transform(new Date(day), 'yyyy-MM-dd');
      for (const element of this.data) {
          const dateInit = this.datePipe.transform(new Date(element.dateInit), 'yyyy-MM-dd');
          if (dateInit === dayToCheck) {
              this.dataPartial.push(element);
          }
      }
  }

}
