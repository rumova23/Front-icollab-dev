import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MarketService } from 'src/app/safe/services/market.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Constants } from 'src/app/core/globals/Constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { WeatherPpa } from 'src/app/safe/models/WeatherPpa';
import { Validate } from 'src/app/core/helpers/util.validator.';
import {requiredFileType} from "../../../../core/helpers/requiredFileType";
import {ConfirmationDialogService} from "../../../../core/services/confirmation-dialog.service";

@Component({
  selector: 'app-weatherPppa',
  templateUrl: './weatherPpa.component.html',
  styleUrls: ['./weatherPpa.component.scss']
})
export class WeatherPpaComponent implements OnInit {
  title = 'Consulta de variables de clima';
  data: Array<WeatherPpa> = [];
  dataSource;
  cols: any[];
  date: Date;

  temperatureForm: FormGroup;

  file: any;
  fileName: any;
  valid = false;
  typeWeather: string;
  weatherForm: FormGroup;
  hour = 0;
  config: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private marketService: MarketService,
              public globalService: GlobalService,
              private fb: FormBuilder,
              private toastr: ToastrManager,
              private confirmationDialogService: ConfirmationDialogService) {

  }

  ngOnInit() {
    this.temperatureForm = this.fb.group({
      file: new FormControl(null, [Validators.required, requiredFileType('xlsx')])
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
          this.toastr.errorToastr(Constants.ERROR_LOAD, errorData);
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
        idTypeImport: this.getTypeWeather(),
        nameImport: 'Temperatura'
      })
          .subscribe(
              data => {
                if (data.success) {
                  if (data.message === "ok") {
                    this.saveImport();
                  } else {
                    this.confirmationDialogService.confirm('Confirmación', data.message)
                        .then((confirmed) => this.confirm(confirmed))
                        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
                  }
                } else {
                  this.toastr.errorToastr(Constants.ERROR_LOAD, data.message);
                }
              },
              errorData => {
                this.temperatureForm.reset();
                this.toastr.errorToastr(Constants.ERROR_LOAD, errorData);
              });
    }
    reader.readAsDataURL(value.file);
  }

  private saveImport() {
    this.marketService.saveWeather({
      file: this.file,
      name: this.fileName,
      idTypeImport: this.getTypeWeather(),
      nameImport: this.typeWeather
    })
        .subscribe(
            dataS => {
              this.toastr.successToastr(Constants.SAVE_SUCCESS, '');
            },
            errorDataS => {
              this.temperatureForm.reset();
              this.toastr.errorToastr(Constants.ERROR_LOAD, errorDataS);
            });
  }

  private getTypeWeather() {
    let option: number = 0;
    switch (this.typeWeather) {
      case 'Temperatura':
        option = 1;
        break;
      case 'Presión Barométrica':
        option = 2;
        break;
      case 'Humedad':
        option = 3;
        break;
    }
    return option;
  }

  confirm(confirmed) {
    if (confirmed) {
      this.saveImport();
    }
  }
}
