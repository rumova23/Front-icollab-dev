import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MarketService } from 'src/app/safe/services/market.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Constants } from 'src/app/core/globals/Constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { ChargePpa } from 'src/app/safe/models/ChargePpa';
import {ConfirmationDialogService} from "../../../../core/services/confirmation-dialog.service";
import {requiredFileType} from "../../../../core/helpers/requiredFileType";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chargePpa',
  templateUrl: './chargePpa.component.html',
  styleUrls: ['./chargePpa.component.scss']
})
export class ChargePpaComponent implements OnInit {

  progress;
  fileUploadForm: FormGroup;
  file: any;
  fileName: any;
  valid = false;
  typeVarhtml = '6';

  title = 'Consulta / Edita Cargos y Costos';
  data: Array<ChargePpa> = [];
  dataSource;
  cols: any[];
  date: Date;

  chargeForm: FormGroup;
  hour = 0;
  config: any;
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
      'fixed',
      'variable',
      'gas',
      'hr',
      'margin',
      'others',
      'total',
      'edit'
    ];
    this.chargeForm = this.fb.group({
      fixed: new FormControl('', Validators.required),
      variable: new FormControl('', Validators.required),
      gas: new FormControl('', Validators.required),
      hr: new FormControl('', Validators.required),
      margin: new FormControl('', Validators.required),
      others: new FormControl('', Validators.required)
    });
    // this.date.setDate(this.date.getDate() + 1);
   // this.loadData();
    this.getConfigCharge();
  }

  private loadData() {
    this.marketService.listCharge(this.date.getTime())
      .subscribe(
        dat => {

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

      },
      errorData => {
        this.toastr.errorToastr(Constants.ERROR_LOAD, errorData);
      });
  }

  editCharge(charge) {
    this.selectedElement = charge;
    this.chargeForm.reset();
    this.hour = charge.hour;

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
    this.marketService.editCharge({
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

  upload(value) {
    this.valid = false;
    let reader = new FileReader();
    reader.onloadend = (e) => {
      this.file = reader.result;
      this.file = this.file.replace(/^data:(.*;base64,)?/, '');
      this.file = this.file.trim();
      this.fileName = value.file.name;
      this.marketService.validateEnergy({
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
    this.marketService.saveCharge({
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
      case '6':
        option = 'Cargo Fijo';
        break;
      case '7':
        option = 'Cargo Variable';
        break;
      case '8':
        option = 'Gas';
        break;
      case '9':
        option = 'HR / MW';
        break;
      case '10':
        option = 'Margen x MM';
        break;
      case '11':
        option = 'Otros';
        break;
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
    this.marketService.downloadCharge(this.fileUploadForm.controls['typeVarhtml'].value)
        .subscribe(
            data => {
              let blob = new Blob([this.base64toBlob(data.file,
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')], {});
              saveAs(blob, data.name);
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Error al descargar archivo: ' + this.getTypeWeather());
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
