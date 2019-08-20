import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MarketService } from 'src/app/safe/services/market.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Constants } from 'src/app/core/globals/Constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { EnergyPpa } from 'src/app/safe/models/EnergyPpa';

@Component({
  selector: 'app-energyPpa',
  templateUrl: './energyPpa.component.html',
  styleUrls: ['./energyPpa.component.scss']
})
export class EnergyPpaComponent implements OnInit {
  title = "Variables de Energía";
  data: Array<EnergyPpa> = [];
  dataSource;
  cols: any[];
  date: Date;

  energyForm: FormGroup;
  hour = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private marketService: MarketService,
    public globalService: GlobalService,
    private fb: FormBuilder,
    private toastr: ToastrManager) {
  }

  ngOnInit() {
    this.cols = [
      'hour',
      'indoorCalorificValue',
      'powerFactor',
      "edit"
    ];
    this.energyForm = this.fb.group({
      'indoorCalorificValue': new FormControl('', Validators.required),
      'powerFactor': new FormControl('', Validators.required)
    });
    //this.date.setDate(this.date.getDate() + 1);
    //this.loadData();

  }

  private loadData() {
    this.marketService.listEnergy(this.date.getTime())
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

  editEnergy(energy) {
    this.energyForm.reset();
    this.hour = energy.hour;
    console.log(this.hour);
    console.log(energy);
    this.energyForm.patchValue(energy);
  }

  cancelEnergy() {
    this.energyForm.reset();
    this.hour = 0;
  }

  addEnergy(energy) {
    /*
    this.data = this.data.filter(entity =>
      entity.hour !== this.hour);
    energy.hour = this.hour; this.data = this.data.filter(entity =>
      entity.hour !== this.hour);
    energy.hour = this.hour;
    energy.edit = true;

    this.data.push(energy);
    this.hour = 0;
    //this.data.slice();
    this.data.sort((a, b) => (a.hour > b.hour) ? 1 : -1)
    this.dataSource.data = this.data;
    this.energyForm.reset(); */
    energy.hour = this.hour;
    this.hour = 0;
    this.energyForm.reset();
    this.save(energy);
  }

  dateChange(event) {
    console.log(event);
    this.date = event.value;
    this.loadData();
  }

  save2() {
  }

  save(dat) {
    /*
    const dat = this.data = this.data.filter(entity =>
      entity.edit == true); */
    if (!Validate(dat)) {
      return;
    }
    this.marketService.editEnergy({
      time: this.date.getTime(),
      data: dat
    })
      .subscribe(
        dat => {
          console.log(dat);
          this.loadData();
          this.toastr.successToastr(Constants.SAVE_SUCCESS);
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, errorData);
        });
  }

}
