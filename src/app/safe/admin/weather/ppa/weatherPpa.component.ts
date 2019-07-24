import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MarketService } from 'src/app/safe/services/market.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Constants } from 'src/app/core/globals/Constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { WeatherPpa } from 'src/app/safe/models/WeatherPpa';
import { Validate } from 'src/app/core/helpers/util.validator.';

@Component({
  selector: 'app-weatherPppa',
  templateUrl: './weatherPpa.component.html',
  styleUrls: ['./weatherPpa.component.scss']
})
export class WeatherPpaComponent implements OnInit {
  title = "Consulta de variables de clima";
  data: Array<WeatherPpa> = [];
  dataSource;
  cols: any[];
  date: Date = new Date();

  weatherForm: FormGroup;
  hour = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private marketService: MarketService,
    private globalService: GlobalService,
    private fb: FormBuilder,
    private toastr: ToastrManager) {

  }

  ngOnInit() {
    this.cols = [
      'hour',
      'temperature',
      'pressure',
      'humidity',
      "edit"
    ];
    this.weatherForm = this.fb.group({
      'temperature': new FormControl('', Validators.required),
      'pressure': new FormControl('', Validators.required),
      'humidity': new FormControl('', Validators.required)
    });
    this.date.setDate(this.date.getDate() + 1);
    this.loadData();

  }

  private loadData() {
    this.marketService.listWeather(this.date.getTime())
      .subscribe(
        data => {
          console.log(data);
          this.data = data;
          this.dataSource = new MatTableDataSource<any>(this.data);
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, errorData);
        });
  }

  editWeather(weather) {
    this.weatherForm.reset();
    this.hour = weather.hour;
    console.log(weather);
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
    console.log(event);
    this.date = event.value;
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
      .subscribe(
        dat => {
          this.loadData();
          this.toastr.successToastr(Constants.SAVE_SUCCESS);
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, errorData);
        });
  }

}
