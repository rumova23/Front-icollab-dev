import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MarketService } from 'src/app/safe/services/market.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Constants } from 'src/app/core/globals/Constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { WeatherPpa } from 'src/app/safe/models/WeatherPpa';
import { Validate } from 'src/app/core/helpers/util.validator.';
import {requiredFileType} from '../../../../core/helpers/requiredFileType';
import {ConfirmationDialogService} from '../../../../core/services/confirmation-dialog.service';
import {saveAs} from 'file-saver';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weatherPppa',
  templateUrl: './weatherPpa.component.html',
  styleUrls: ['./weatherPpa.component.scss']
})
export class WeatherPpaComponent implements OnInit {
  title = 'Consulta / Edita Variables Ambientales';
  data: Array<WeatherPpa> = [];
  dataSource;
  cols: any[];
  date: Date;
  progress;

  fileUploadForm: FormGroup;

  file: any;
  fileName: any;
  valid = false;
  weatherForm: FormGroup;
  hour = 0;
  config: any;
  typeVarhtml = '1';
  selectedElement;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private marketService: MarketService,
              public globalService: GlobalService,
              private fb: FormBuilder,
              private toastr: ToastrManager,
              private confirmationDialogService: ConfirmationDialogService,
              private datePipe: DatePipe) {

  }

  ngOnInit() {
    this.fileUploadForm = this.fb.group({
      file: new FormControl(null, [Validators.required, requiredFileType('xlsx')]),
      typeVarhtml: new FormControl('', Validators.required)
    });
    this.cols = [
      'hour',
      'temperature',
      'pressure',
      'humidity',
      'edit'
    ];
    this.weatherForm = this.fb.group({
      temperature: new FormControl('', Validators.required),
      pressure: new FormControl('', Validators.required),
      humidity: new FormControl('', Validators.required)
    });
    // this.date.setDate(this.date.getDate() + 1);
    // this.loadData();
    this.getConfigWeather();
  }
  private loadData() {
    this.marketService.listWeather(this.date.getTime())
      .subscribe(
        data => {
          this.data = data;
          for (let i = 0; i < this.data.length; i ++) {
            this.data[i].colorTemperature = this.data[i].temperature;
            /*this.data[i].colorTemperature = Number(this.data[i].temperature <= Number(this.config[0].value)) ?
             '#05FCE5' :  Number(this.data[i].temperature >= Number(this.config[1].value)) ?
             '#F5FC05' : '';*/
            this.data[i].colorHumidity = this.data[i].humidity;
            /*this.data[i].colorHumidity = Number(this.data[i].humidity <= Number(this.config[2].value)) ?
             '#05FCE5' :  Number(this.data[i].humidity >= Number(this.config[3].value)) ?
             '#F5FC05' : '';*/
            this.data[i].colorPressure = this.data[i].pressure
             /*this.data[i].colorPressure = Number(this.data[i].pressure <= Number(this.config[4].value)) ?
             '#05FCE5' :  Number(this.data[i].pressure >= Number(this.config[5].value)) ?
             '#F5FC05' : '';*/

          }
          this.dataSource = new MatTableDataSource<any>(this.data);
          // this.dataSource = new MatTableDataSource<any>(this.data);
        },
        errorData => {
          this.dataSource = new MatTableDataSource<any>([]);
          //this.toastr.errorToastr(Constants.ERROR_LOAD, errorData.error.message);
          this.toastr.errorToastr(errorData.error.message);
        });
  }

  private getConfigWeather() {
    this.marketService.getConfigWeather()
    .subscribe(
      dat => {
        this.config = dat;

      },
      errorData => {
        this.toastr.errorToastr(Constants.ERROR_LOAD, errorData);
      });
  }

  editWeather(weather) {
    this.selectedElement = weather;
    this.weatherForm.reset();
    this.hour = weather.hour;

    this.weatherForm.patchValue(weather);
  }

  cancelWeather() {
    this.weatherForm.reset();
    this.hour = 0;
  }

  addWeather(weather) {
    /*
    this.data = this.data.filter(entity =>
      entity.hour !== this.hour);
    weather.hour = this.hour; this.data = this.data.filter(entity =>
      entity.hour !== this.hour);
    weather.hour = this.hour;
    weather.edit = true;
    this.data.push(weather);
    this.hour = 0;
    //this.data.slice();
    this.data.sort((a, b) => (a.hour > b.hour) ? 1 : -1)
    this.dataSource.data = this.data;
    this.weatherForm.reset(); */
    weather.hour =  this.hour;
    this.hour = 0;
    this.weatherForm.reset();
    this.save(weather);
  }

  dateChange(event) {
    this.date = new Date(event.target.value);
    this.loadData();
  }

  save(dat) {
    /*
    const dat = this.data = this.data.filter(entity =>
      entity.edit == true); */
    if (!Validate(dat)) {
      return;
    }
    this.marketService.editWeather({
      time: this.date.getTime(),
      data: dat
    })
      .subscribe(dat => {
          this.loadData();
          this.toastr.successToastr(Constants.SAVE_SUCCESS);
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, errorData);
        });
  }

  upload(value) {
    this.valid = false;
    let reader = new FileReader();
    reader.onloadend = (e) => {
      this.file = reader.result;
      this.file = this.file.replace(/^data:(.*;base64,)?/, '');
      this.file = this.file.trim();
      this.fileName = value.file.name;
      this.marketService.validateWeather({
        file: this.file,
        name: this.fileName,
        idTypeImport: this.fileUploadForm.controls['typeVarhtml'].value,
        nameImport: this.getTypeWeather()
      })
          .subscribe(
              data => {
                if (data.success) {
                  if (data.message === "ok") {
                    this.saveImport();
                  } else {
                    
                    let a3 = data.message.split("para las fechas");
                    let a4 = a3[1].split("en el sistema,");
                    let fecha = a4[0].trim();
                    let datePipeString = this.datePipe.transform(new Date(fecha),'dd-MM-yyyy');
                    let menssage = `${a3[0].trim()} para las fechas ${datePipeString} en el sistema, ${a4[1].trim()}`;
                    data.message = menssage;
                    this.confirmationDialogService.confirm('Confirmación', data.message)
                        .then((confirmed) => this.confirm(confirmed))
                        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
                  }
                } else {
                  this.toastr.errorToastr(Constants.ERROR_LOAD, data.message);
                }
              },
              errorData => {
                this.fileUploadForm.reset();
                this.toastr.errorToastr(Constants.ERROR_LOAD, errorData);
              });
    }
    reader.readAsDataURL(value.file);
  }

  private saveImport() {
    this.marketService.saveWeather({
      file: this.file,
      name: this.fileName,
      idTypeImport: this.fileUploadForm.controls['typeVarhtml'].value,
      nameImport: this.getTypeWeather()
    })
        .subscribe(
            dataS => {
              this.toastr.successToastr(Constants.SAVE_SUCCESS, '');
            },
            errorDataS => {
              this.fileUploadForm.reset();
              this.toastr.errorToastr(Constants.ERROR_LOAD, errorDataS);
            });
  }

  private getTypeWeather() {
    let option = '';
    switch (this.fileUploadForm.controls['typeVarhtml'].value) {
      case '1':
        option = 'Temperatura';
        break;
      case '2':
        option = 'Presión Barométrica';
        break;
      case '3':
        option = 'Humedad';
        break;
    }
    return option;
  }

  confirm(confirmed) {
    if (confirmed) {
      this.saveImport();
    }
  }

  download() {
    this.marketService.downloadWeather(this.fileUploadForm.controls['typeVarhtml'].value)
        .subscribe(
            data => {
              console.dir(data);
              let blob = new Blob([this.base64toBlob(data.file,
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')], {});
              saveAs(blob, data.name);
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Error al descargar archivo de temperaturas');
            });
  }

  base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    let sliceSize = 1024;
    let byteCharacters = atob(base64Data);
    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    let byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      let begin = sliceIndex * sliceSize;
      let end = Math.min(begin + sliceSize, bytesLength);
      let bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }
}
