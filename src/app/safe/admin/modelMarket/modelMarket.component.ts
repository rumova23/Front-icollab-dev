import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MarketService } from 'src/app/safe/services/market.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Constants } from 'src/app/core/globals/Constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { ModelMarket } from '../../models/ModelMarket';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-modelMarket',
  templateUrl: './modelMarket.component.html',
  styleUrls: ['./modelMarket.component.scss']
})
export class ModelMarketComponent implements OnInit {
  title = "Modelo Mercado";
  data: Array<ModelMarket> = [];
  dataSource;
  cols: any[];
  colsGroup: any [];
  date: Date;

  modelMarketForm: FormGroup;
  hour = 0;
  dateDespatch: string = "";

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
      'idSubInt',
      'limitDispatchMax',
      'limitDispatchMin',
      'minimumPowerOperationCost',
      'megawatt1',
      'priceMegawatt1',
      'megawatt2',
      'priceMegawatt2',
      'megawatt3',
      'priceMegawatt3',
      'megawatt4',
      'priceMegawatt4',
      'megawatt5',
      'priceMegawatt5',
      'megawatt6',
      'priceMegawatt6',
      'megawatt7',
      'priceMegawatt7',
      'megawatt8',
      'priceMegawatt8',
      'megawatt9',
      'priceMegawatt9',
      'megawatt10',
      'priceMegawatt10',
      'megawatt11',
      'priceMegawatt11',
      "edit"
    ];
    this.modelMarketForm = this.fb.group({
      'megawatt1': new FormControl('', Validators.required),
      'priceMegawatt1': new FormControl('', Validators.required),
      'megawatt2': new FormControl('', Validators.nullValidator),
      'priceMegawatt2': new FormControl('', Validators.nullValidator),
      'megawatt3': new FormControl('', Validators.nullValidator),
      'priceMegawatt3': new FormControl('', Validators.nullValidator),
      'megawatt4': new FormControl('', Validators.nullValidator),
      'priceMegawatt4': new FormControl('', Validators.nullValidator),
      'megawatt5': new FormControl('', Validators.nullValidator),
      'priceMegawatt5': new FormControl('', Validators.nullValidator),
      'megawatt6': new FormControl('', Validators.nullValidator),
      'priceMegawatt6': new FormControl('', Validators.nullValidator),
      'megawatt7': new FormControl('', Validators.nullValidator),
      'priceMegawatt7': new FormControl('', Validators.nullValidator),
      'megawatt8': new FormControl('', Validators.nullValidator),
      'priceMegawatt8': new FormControl('', Validators.nullValidator),
      'megawatt9': new FormControl('', Validators.nullValidator),
      'priceMegawatt9': new FormControl('', Validators.nullValidator),
      'megawatt10': new FormControl('', Validators.nullValidator),
      'priceMegawatt10': new FormControl('', Validators.nullValidator),
      'megawatt11': new FormControl('', Validators.nullValidator),
      'priceMegawatt11': new FormControl('', Validators.nullValidator)
    });
    //this.date.setDate(this.date.getDate() + 1);
    //this.loadData();
    this.colsGroup = ['-', '--', '1', '2', '3', '4', '5','6','7','8','9','10','11'];

  }

  private loadData() {
    this.marketService.getModelMarket(this.date.getTime())
      .subscribe(
        data => {
          console.log(data);
          const rows = data.rows;
          this.dateDespatch = data.dateDespatch;
          this.data = [];
          for (var i = 0; i < rows.length; i++) {
            let hour: ModelMarket = {};
            const offerIncrements = rows[i].offerIncrements;
            hour.hour = offerIncrements[0].hour;
            hour.limitDispatchMin = rows[i].planningDetail.limitDespatchMin;
            hour.limitDispatchMax = rows[i].planningDetail.limitDespatchMax;
            hour.idSubInt =  rows[i].planningDetail.idSubInt;
            hour.minimumPowerOperationCost = rows[i].planningDetail.costOperation;
            for (var a = 0; a < offerIncrements.length; a++) {
              switch (a) {
                case 0:
                  hour.megawatt1 = offerIncrements[a].megaWatts;
                  hour.priceMegawatt1 = offerIncrements[a].costMegaWatts;
                  break;
                case 1:
                  hour.megawatt2 = offerIncrements[a].megaWatts;
                  hour.priceMegawatt2 = offerIncrements[a].costMegaWatts;
                  break;
                case 2:
                  hour.megawatt3 = offerIncrements[a].megaWatts;
                  hour.priceMegawatt3 = offerIncrements[a].costMegaWatts;
                  break;
                case 3:
                  hour.megawatt4 = offerIncrements[a].megaWatts;
                  hour.priceMegawatt4 = offerIncrements[a].costMegaWatts;
                  break;
                case 4:
                  hour.megawatt5 = offerIncrements[a].megaWatts;
                  hour.priceMegawatt5 = offerIncrements[a].costMegaWatts;
                  break;
                case 5:
                  hour.megawatt6 = offerIncrements[a].megaWatts;
                  hour.priceMegawatt6 = offerIncrements[a].costMegaWatts;
                  break;
                case 6:
                  hour.megawatt7 = offerIncrements[a].megaWatts;
                  hour.priceMegawatt7 = offerIncrements[a].costMegaWatts;
                  break;
                case 7:
                  hour.megawatt8 = offerIncrements[a].megaWatts;
                  hour.priceMegawatt8 = offerIncrements[a].costMegaWatts;
                  break;
                case 8:
                  hour.megawatt9 = offerIncrements[a].megaWatts;
                  hour.priceMegawatt9 = offerIncrements[a].costMegaWatts;
                  break;
                case 9:
                  hour.megawatt10 = offerIncrements[a].megaWatts;
                  hour.priceMegawatt10 = offerIncrements[a].costMegaWatts;
                  break;
                case 10:
                  hour.megawatt11 = offerIncrements[a].megaWatts;
                  hour.priceMegawatt11 = offerIncrements[a].costMegaWatts;
                  break;
              }
            }
            this.data.push(hour);
          }
          this.dataSource = new MatTableDataSource<any>(this.data);
          /*
          this.data = data;
          this.dataSource = new MatTableDataSource<any>(this.data); */

        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, errorData);
        });
  }

  editModelMarket(energy) {
    this.modelMarketForm.reset();
    this.hour = energy.hour;
    console.log(this.hour);
    console.log(energy);
    this.modelMarketForm.patchValue(energy);
  }

  cancelModelMarket() {
    this.modelMarketForm.reset();
    this.hour = 0;
  }

  addModelMarket(energy) {
    /*
    this.data = this.data.filter(entity =>
      entity.hour !== this.hour);
    energy.hour = this.hour; this.data = this.data.filter(entity =>
      entity.hour !== this.hour);
    energy.hour = this.hour;
    energy.edit = true; */
        /*
    this.data.push(energy);
    this.hour = 0;
    //this.data.slice();
    this.data.sort((a, b) => (a.hour > b.hour) ? 1 : -1)
    this.dataSource.data = this.data;
    this.modelMarketForm.reset(); */
    this.saveModel(energy);
  }

  dateChange(event) {
    console.log(event);
    this.date = event.value;
    this.loadData();
  }

  saveModel(energy) {
    let dat:any = {};
    dat.dateDespatch = this.date.getTime();
    dat.hour = this.hour;
    this.hour = 0;
    dat.listOffer = [];
    for(var i = 1; i <= 11; i++) {
      switch (i) {
        case 1:
          if(Validate(energy.megawatt1)) {
            dat.listOffer.push({
              megaWatts: energy.megawatt1,
              costMegaWatts: energy.priceMegawatt1,
              numberIncrement: i,
            });
          }
          break;
        case 2:
            if(Validate(energy.megawatt2)) {
              dat.listOffer.push({
                megaWatts: energy.megawatt2,
                costMegaWatts: energy.priceMegawatt2,
                numberIncrement: i
              });
            }
            break;
        case 3:
            if(Validate(energy.megawatt3)) {
              dat.listOffer.push({
                megaWatts: energy.megawatt3,
                costMegaWatts: energy.priceMegawatt3,
                numberIncrement: i
              });
            }
          break;
        case 4:
            if(Validate(energy.megawatt4)) {
              dat.listOffer.push({
                megaWatts: energy.megawatt4,
                costMegaWatts: energy.priceMegawatt4,
                numberIncrement: i
              });
            }
          break;
        case 5:
            if(Validate(energy.megawatt5)) {
              dat.listOffer.push({
                megaWatts: energy.megawatt5,
                costMegaWatts: energy.priceMegawatt5,
                numberIncrement: i
              });
            }
          break;
        case 6:
            if(Validate(energy.megawatt6)) {
              dat.listOffer.push({
                megaWatts: energy.megawatt6,
                costMegaWatts: energy.priceMegawatt6,
                numberIncrement: i
              });
            }
          break;
        case 7:
            if(Validate(energy.megawatt7)) {
              dat.listOffer.push({
                megaWatts: energy.megawatt7,
                costMegaWatts: energy.priceMegawatt7,
                numberIncrement: i
              });
            }
          break;
        case 8:
            if(Validate(energy.megawatt8)) {
              dat.listOffer.push({
                megaWatts: energy.megawatt8,
                costMegaWatts: energy.priceMegawatt8,
                numberIncrement: i
              });
            }
          break;
        case 9:
            if(Validate(energy.megawatt9)) {
              dat.listOffer.push({
                megaWatts: energy.megawatt9,
                costMegaWatts: energy.priceMegawatt9,
                numberIncrement: i
              });
            }
          break;
        case 9:
            if(Validate(energy.megawatt10)) {
              dat.listOffer.push({
                megaWatts: energy.megawatt10,
                costMegaWatts: energy.priceMegawatt10,
                numberIncrement: i
              });
            }
          break;
        case 11:
            if(Validate(energy.megawatt11)) {
              dat.listOffer.push({
                megaWatts: energy.megawatt11,
                costMegaWatts: energy.priceMegawatt11,
                numberIncrement: i
              });
            }
          break;
      }
    }
    console.log(dat);
    this.modelMarketForm.reset();
    this.marketService.saveModelMarket(dat)
    .subscribe(
      data => {
        console.log(data);
        this.loadData();
      },
      errorData => {
        this.toastr.errorToastr(Constants.ERROR_LOAD, errorData);
      });
  }

  download() {
    if (!Validate(this.data) || this.data.length <= 0) {
      return;
    }
    this.marketService.downloadModelMarket(
      this.date.getTime()
    ) .subscribe(
        dat => {
          console.log(dat);
          let blob = new Blob([this.base64toBlob(dat.base64,
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')], {});
          saveAs(blob, dat.nameFile);
          this.toastr.successToastr(Constants.SAVE_SUCCESS);
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Error al descargar archivo');
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
