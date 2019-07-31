import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MarketService } from 'src/app/safe/services/market.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Constants } from 'src/app/core/globals/Constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { ChargePpa } from 'src/app/safe/models/ChargePpa';

@Component({
  selector: 'app-chargePpa',
  templateUrl: './chargePpa.component.html',
  styleUrls: ['./chargePpa.component.scss']
})
export class ChargePpaComponent implements OnInit {
  title = "Cargos";
  data: Array<ChargePpa> = [];
  dataSource;
  cols: any[];
  date: Date;

  chargeForm: FormGroup;
  hour = 0;
  config:any;

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
      'fixed',
      'variable',
      'gas',
      'hr',
      'margin',
      'others',
      'total',
      "edit"
    ];
    this.chargeForm = this.fb.group({
      'fixed': new FormControl('', Validators.required),
      'variable': new FormControl('', Validators.required),
      'gas': new FormControl('', Validators.required),
      'hr': new FormControl('', Validators.required),
      'margin': new FormControl('', Validators.required),
      'others': new FormControl('', Validators.required)
    });
    //this.date.setDate(this.date.getDate() + 1);
   // this.loadData();
   this.getConfigCharge();

  }

  private loadData() {
    this.marketService.listCharge(this.date.getTime())
      .subscribe(
        dat => {
          console.log(dat);
          this.data = dat;
          this.dataSource = new MatTableDataSource<any>(this.data);
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, errorData);
        });
  }

  private getConfigCharge() {
    this.marketService.getConfigCharge()
    .subscribe(
      dat => {
        this.config = dat;
        console.log(dat);
      },
      errorData => {
        this.toastr.errorToastr(Constants.ERROR_LOAD, errorData);
      });
  }

  editCharge(charge) {
    this.chargeForm.reset();
    this.hour = charge.hour;
    console.log(charge);
    this.chargeForm.patchValue(charge);
  }

  cancelCharge() {
    this.chargeForm.reset();
    this.hour = 0;
  }

  addCharge(charge) {
    /*
    this.data = this.data.filter(entity =>
      entity.hour !== this.hour);
    charge.hour = this.hour; this.data = this.data.filter(entity =>
      entity.hour !== this.hour);
    charge.hour = this.hour;
    charge.edit = true;
    charge.total = Number(charge.fixed) + 
    Number(charge.variable) + Number(charge.gas) +
    Number(charge.hr)  + Number(charge.margin) + 
    Number(charge.others);
    charge.total = Math.round(charge.total);

    this.data.push(charge);
    this.hour = 0;
    //this.data.slice();
    this.data.sort((a, b) => (a.hour > b.hour) ? 1 : -1)
    this.dataSource.data = this.data;
    this.chargeForm.reset(); */
    charge.hour = this.hour;
    this.hour = 0;
    this.chargeForm.reset();
    this.save(charge);
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
    this.marketService.editCharge({
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
