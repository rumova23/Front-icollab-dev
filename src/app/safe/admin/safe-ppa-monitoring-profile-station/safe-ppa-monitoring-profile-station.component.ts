import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {EventMessage} from '../../../core/models/EventMessage';
import {EventBlocked} from '../../../core/models/EventBlocked';
import {ToastrManager} from 'ng6-toastr-notifications';
import {EventService} from '../../../core/services/event.service';
import {PpaMonitoringFormatService} from '../../services/ppa-monitoring-format.service';
import { requiredFileType } from 'src/app/core/helpers/requiredFileType';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {MY_FORMAT_DATE_PICKER} from '../../../core/models/MyFormatDatePicker';
import * as moment from 'moment';

@Component({
  selector: 'app-safe-ppa-monitoring-profile-station',
  templateUrl: './safe-ppa-monitoring-profile-station.component.html',
  styleUrls: ['./safe-ppa-monitoring-profile-station.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMAT_DATE_PICKER},
  ]
})
export class SafePpaMonitoringProfileStationComponent implements OnInit {

  fileUploadForm: FormGroup;
  file: any;
  fileName: any;
  date = new FormControl(moment());
  progress;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrManager,
    public eventService: EventService,
    private ppaMonitoringFormatService: PpaMonitoringFormatService
  ) { }

  ngOnInit() {
    this.fileUploadForm = this.fb.group({
      file: new FormControl(null, [Validators.required, requiredFileType('xlsx')])
    });
  }

  chosenYearHandler(normalizedYear: any) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: any, datepicker: MatDatepicker<any>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  upload(value) {
    if (this.date.value == null) {
      this.toastr.errorToastr('Eliga una fecha.', 'Lo siento,');
      return 0;
    }
    this.addBlock(1, '');
    const reader = new FileReader();
    reader.onloadend = (e) => {
      this.file = reader.result;
      this.file = this.file.replace(/^data:(.*;base64,)?/, '');
      this.file = this.file.trim();
      this.fileName = value.file.name;
      this.ppaMonitoringFormatService.uploadPerfil({
            file: this.file,
            name: this.fileName,
            year: new Date(this.date.value).getFullYear(),
            month: new Date(this.date.value).getMonth() + 1
          }).subscribe (
          data => {
            this.addBlock(2, '');
            this.toastr.successToastr('El archivo llego con exito', 'Ejecución lanzada con éxito.');
          },
          errorData => {
            this.addBlock(2, '');
            console.dir(errorData);
            this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
          });
    };
    reader.readAsDataURL(value.file);
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1,
        new EventBlocked(type, msg)));
  }

  aplicarDeteccion() {
    if (this.date.value == null) {
      this.toastr.errorToastr('Eliga una fecha.', 'Lo siento,');
      return 0;
    }
    this.addBlock(1, '');
    this.ppaMonitoringFormatService.procesaDeteccionProfile(
      new Date(this.date.value).getFullYear(),
      new Date(this.date.value).getMonth() + 1
    ).subscribe (
        data => {
          this.addBlock(2, '');
          this.toastr.successToastr('El archivo llego con exito', 'Ejecución lanzada con éxito.');
        },
        errorData => {
          this.addBlock(2, '');
          console.dir(errorData);
          this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
        });
  }

  aplicarCorrecion() {
    if (this.date.value == null) {
      this.toastr.errorToastr('Eliga una fecha.', 'Lo siento,');
      return 0;
    }
    this.addBlock(1, '');
    this.ppaMonitoringFormatService.procesaCorreccionProfile(
        new Date(this.date.value).getFullYear(),
        new Date(this.date.value).getMonth() + 1
    ).subscribe (
        data => {
          this.addBlock(2, '');
          this.toastr.successToastr('El archivo llego con exito', 'Ejecución lanzada con éxito.');
        },
        errorData => {
          this.addBlock(2, '');
          console.dir(errorData);
          this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
        });
  }
}
