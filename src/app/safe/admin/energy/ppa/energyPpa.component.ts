import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MarketService } from 'src/app/safe/services/market.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Constants } from 'src/app/core/globals/Constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { EnergyPpa } from 'src/app/safe/models/EnergyPpa';
import {requiredFileType} from '../../../../core/helpers/requiredFileType';
import {ConfirmationDialogService} from '../../../../core/services/confirmation-dialog.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-energyPpa',
  templateUrl: './energyPpa.component.html',
  styleUrls: ['./energyPpa.component.scss']
})
export class EnergyPpaComponent implements OnInit {
  progress;
  fileUploadForm: FormGroup;
  file: any;
  fileName: any;
  valid = false;
  typeVarhtml = '4';
  config: any;
  title = 'Consulta / Edita Variables de Energía';
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
      'indoorCalorificValue',
      'powerFactor',
      'edit'
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
    this.marketService.saveEnergy({
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
      case '4':
        option = 'Poder Calorífico Inferior';
        break;
      case '5':
        option = 'Factor de Potencia';
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
    this.marketService.downloadEnergy(this.fileUploadForm.controls['typeVarhtml'].value)
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
