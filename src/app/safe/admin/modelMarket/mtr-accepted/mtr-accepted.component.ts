import { Component, OnInit } from '@angular/core';
import {ModelMarket} from '../../../models/ModelMarket';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {Constants} from '../../../../core/globals/Constants';
import {GlobalService} from '../../../../core/globals/global.service';
import {MarketService} from '../../../services/market.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {Comentario} from '../../../../core/models/comentario';
import {Validate} from '../../../../core/helpers/util.validator.';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-mtr-accepted',
  templateUrl: './mtr-accepted.component.html',
  styleUrls: ['./mtr-accepted.component.scss']
})
export class MtrAcceptedComponent implements OnInit {
  title = 'Consulta MTR';
  date: Date;
  dateDespatch = '';
  dataSource;
  data: Array<ModelMarket> = [];

  cols: any[];
  colsGroup: any [];

  submitted = false;
  isdisabled = false;
  headObservaciones = ['#', 'Nombre', 'Observaciones', 'Fecha de ultima modificación'];
  observaciones: Array<any>;
  get f() { return this.fileUploadForm.controls; }


  progress;
  fileUploadForm: FormGroup;
  file: any;
  fileName: any;
  valid = false;
  selectedElement;
  constructor(
      public globalService: GlobalService,
      private marketService: MarketService,
      private toastr: ToastrManager,
      private fb: FormBuilder) { }

  ngOnInit() {
    this.fileUploadForm = this.fb.group({
      file: new FormControl(null, Validators.required),
      fObserva: [{ value: '', disabled: this.isdisabled }, Validators.required]
    });
    this.observaciones = [];
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
      'priceMegawatt11'
    ];
    this.colsGroup = ['-', '--', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  }


  dateChange(event) {
    this.date = new Date(event.target.value);
    this.loadData();
  }

  private loadData() {
    this.marketService.getModelMarketAcceptMtr(this.date.getTime())
        .subscribe(
            data => {
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
                hour.minimumPowerOperationCost = rows[i].planningCharges.costOperation;
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
              this.obtieneObservaciones();
            },
            errorData => {
              if (errorData.error.message.indexOf('La Planeacion Existe') > -1) {
                this.toastr.warningToastr(errorData.error.message, 'Warning!');
              } else {
                this.toastr.errorToastr(Constants.ERROR_LOAD, errorData.error.message);
              }
            });
  }
  obtieneObservaciones() {
    this.marketService.getComentariosPlanning(this.date.getTime()).subscribe(
        data => {
          data.forEach(comenta => {
            this.resuelveDS(comenta);
          });
        });
  }
  resuelveDS(comenta) {
    this.observaciones.push(
        new Comentario(comenta.planningSoporteId, comenta.usuarioSoporte, comenta.soporte, comenta.fechaSoporte));
  }

  download() {
    if (!Validate(this.data) || this.data.length <= 0) {
      return;
    }
    this.marketService.downloadModelMarketMtr(
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

  solicitaReactivarPlanning(value) {
    let reader = new FileReader();
    reader.onloadend = (e) => {
      this.file = reader.result;
      console.dir(reader);
      this.file = this.file.replace(/^data:(.*;base64,)?/, '');
      this.file = this.file.trim();
      this.fileName = value.file.name;
      this.marketService.solicitaReactivarPlannigMTR({
        file: this.file,
        name: this.fileName,
        soporte: this.fileUploadForm.controls.fObserva.value,
        date: this.date.getTime()
      }).subscribe(
          data => {
            this.obtieneObservaciones();
            this.toastr.successToastr(Constants.SAVE_SUCCESS);
          },
          errorData => {
            this.toastr.errorToastr(Constants.ERROR_LOAD, errorData.error.message);
          });
    }
    reader.readAsDataURL(value.file);
  }

  reactivarPlanning() {
    this.marketService.reactivarPlannigMtr(this.date.getTime()).subscribe(
        data => {
          console.dir(data);
          this.toastr.successToastr(Constants.SAVE_SUCCESS);
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, errorData.error.message);
        });
  }
}
