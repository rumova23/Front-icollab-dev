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
  result;
  resultService;
  submittedData = false;
  currentYear = new Date().getFullYear();
  initDate = (this.currentYear - 1) + '-01-01';

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

  get f() { return this.analysisForm.controls; }

  ngOnInit() {
    this.submittedData = false;
    this.title = 'Análisis / ' + this.nombreCatalogo;
    this.analysisForm = this.formBuilder.group({
      unitControl: [ null, null],
      queryDate: ['', Validators.required]
    });
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
                const obj            = {};
                // @ts-ignore
                obj.order       = k;
                // @ts-ignore
                obj.id          = element.id;
                // @ts-ignore
                obj.name        = element.code;
                // @ts-ignore
                obj.description = element.description;
                // @ts-ignore
                obj.active = element.active;
                this.unitsArr.push(obj);
              }

              this.getDataSource();
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
              this.addBlock(2, null);
            }
        );
    this.addBlock(2, null);
  }

  getDataSource() {
    this.data = [];
    this.efhService.getEventsConfiguratedAsc().subscribe(
        dataBack => {
          this.result = dataBack;
          let i = 0;
          for (const element of this.result) {
            i += 1;
            const obj            = {};
            obj['id'] = element.id;
            obj['idTypeEvent'] = element.idtypeevent;
            obj['idTypeFuel'] = element.idtypefuel;
            obj['idUnit'] = element.idunit;
            obj['dateInit'] = this.datePipe.transform(this.getTimeLocale(element.dateinit) , 'yyyy-MM-dd HH:mm:ss');
            obj['dateEnd'] = this.datePipe.transform(this.getTimeLocale(element.dateend) , 'yyyy-MM-dd HH:mm:ss');
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
              obj['dateUpdated'] = this.datePipe.transform(new Date(dateUpdated) , 'dd/MM/yyyy-MM-dd HH:mm');
            }
            obj['status']      = element.active === true ? 'Activo' : 'Inactivo';
            obj['element']     = element;

            this.data.push(obj);
          }
        }
    ).add(() => {
      this.addBlock(2, null);
      this.calculate();
    });
  }

  onSubmit() {
    this.submittedData = true;
    if (this.analysisForm.controls['queryDate'].invalid) {
      this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Lo siento,');
      return;
    }

    this.calculate();
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }

  regresar() {
    this.eventService.sendChangePage(new EventMessage(4, {} , 'Efh.Inicio'));
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
    let totalStarts = 0;
    let totalTrips = 0;
    let totalESi = 0.00;
    let totalAOH = 0.0;
    let totalEFHi = 0.0;
    let totalEFHi_money = 0.0;
    let sinceTrips = 0;
    let sinceStart = 0;
    let sinceESi = 0.00;
    let sinceAOH = 0.0;
    let sinceEFHi = 0.0;
    let sinceEFHi_money = 0.0;
    let ESi = 0;

    debugger;
    for (const event of this.data) {
      if (event.idUnit === 1) {
        if (event.idTypeFuel === 1) {
          FF = 1;
        } else if (event.idTypeFuel === 952) {
          FF = 1.25;
        } else if (event.idTypeFuel === 5953 || event.idTypeFuel === 5952 || event.idTypeEvent === 4957 || event.idTypeEvent === 954) {
          FF = 0;
        }
        var eventStartTime = new Date(event.dateInit);
        var eventEndTime = new Date(event.dateEnd);
        var duration = Math.ceil((eventEndTime.valueOf() - eventStartTime.valueOf()) / (1000 * 3600));

      }
    }

  }

}
