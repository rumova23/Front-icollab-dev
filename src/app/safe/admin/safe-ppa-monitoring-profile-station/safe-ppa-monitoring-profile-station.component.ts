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
import {saveAs} from 'file-saver';

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

  aplicarDeteccionProcedimiento() {
    if (this.date.value == null) {
      this.toastr.errorToastr('Eliga una fecha.', 'Lo siento,');
      return 0;
    }
    this.addBlock(1, '');
    this.ppaMonitoringFormatService.procesaDeteccionProcedimientoProfile(
        new Date(this.date.value).getFullYear(),
        new Date(this.date.value).getMonth() + 1
    ).subscribe (
        data => {
          this.addBlock(2, '');
          this.toastr.successToastr('Deteccion de Norma en proceso: ' + new Date(this.date.value).getFullYear() + '/' + (new Date(this.date.value).getMonth() + 1), '¡Procesando!');
        },
        errorData => {
          this.addBlock(2, '');
          console.dir(errorData);
          this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
        });
  }

  aplicarCorrecionProcedimiento() {
    if (this.date.value == null) {
      this.toastr.errorToastr('Eliga una fecha.', 'Lo siento,');
      return 0;
    }
    this.addBlock(1, '');
    this.ppaMonitoringFormatService.procesaCorrecionProcedimientoProfile(
        new Date(this.date.value).getFullYear(),
        new Date(this.date.value).getMonth() + 1
    ).subscribe (
        data => {
          this.addBlock(2, '');
          this.toastr.successToastr('Deteccion de Norma en proceso: ' + new Date(this.date.value).getFullYear() + '/' + (new Date(this.date.value).getMonth() + 1), '¡Procesando!');
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

  download() {
    const year = new Date(this.date.value).getFullYear();
    const month =  new Date(this.date.value).getMonth() + 1;
    this.addBlock(1, 'Bajando  crudos CSV ' + year + '/' + month + ': Generando');
    this.ppaMonitoringFormatService.downloadCrudosProfileExcel(year, month)
        .subscribe(
            data => {
              const blob = new Blob([this.base64toBlob(data.base64,
                  'application/CSV')], {});
              saveAs(blob, data.nameFile);
              this.addBlock(2, '');
              this.toastr.successToastr('Download File: Correctamente ' + year + '/' + month + ': Generado Correctamente', '¡Exito!');
            },
            errorData => {
              this.addBlock(2, '');
              this.toastr.errorToastr(errorData.error.message, '¡Error!');
            });
  }

  base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);
      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

    aplicarModeloPrimerTiempo() {
      if (this.date.value == null) {
        this.toastr.errorToastr('Eliga una fecha.', 'Faltan Datos¡');
        return 0;
      }
      this.addBlock(1, '');
      this.ppaMonitoringFormatService.procesaModeloTiempo(
          new Date(this.date.value).getFullYear(),
          new Date(this.date.value).getMonth() + 1
      ).subscribe (
          data => {
            this.addBlock(2, '');
            this.toastr.successToastr('Deteccion de Norma en proceso: ' + new Date(this.date.value).getFullYear() + '/' + (new Date(this.date.value).getMonth() + 1), '¡Procesando!');
          },
          errorData => {
            this.addBlock(2, '');
            console.dir(errorData);
            this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
          });
    }
}
