import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Constants } from 'src/app/core/globals/Constants';
import { FormBuilder, FormGroup, Validators, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MarketService } from 'src/app/safe/services/market.service';
import { FileUploadComponent } from 'src/app/common/fileUpload/fileUpload.component';
import { requiredFileType } from 'src/app/core/helpers/requiredFileType';
import { saveAs } from 'file-saver';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';


@Component({
  selector: 'app-chargeEdit',
  templateUrl: './chargeEdit.component.html',
  styleUrls: ['./chargeEdit.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})

export class ChargeEditComponent implements OnInit {
  chargeForm: FormGroup;
  file: any;
  fileName: any;
  typeCharge: string;
  valid: boolean = false;

  title;
  progress;
  
  constructor(public globalService: GlobalService,
    private marketService: MarketService,
    private fb: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService,
    private toastr: ToastrManager) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.chargeForm = this.fb.group({
      'file': new FormControl(null, [Validators.required, requiredFileType('xlsx')])
    });
  }

  download() {
    this.marketService.downloadCharge(this.getTypeCharge())
      .subscribe(
        data => {

          let blob = new Blob([this.base64toBlob(data.file,
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')], {});
          saveAs(blob, data.name);
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

  upload(value) {
    this.valid = false;
    let reader = new FileReader();

    reader.onloadend = (e) => {
      this.file = reader.result;
      this.file = this.file.replace(/^data:(.*;base64,)?/, '');
      this.file = this.file.trim();
      this.fileName = value.file.name;
      this.marketService.validateCharge({
        file: this.file,
        name: this.fileName,
        idTypeImport: this.getTypeCharge(),
        nameImport: this.typeCharge
      }).subscribe(data => {
            if (data.success) {
              if (data.message === 'ok') {
                this.save();
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

            this.chargeForm.reset();
            this.toastr.errorToastr(Constants.ERROR_LOAD, errorData);
          });
    }
    reader.readAsDataURL(value.file);
  }

  confirm(confirmed) {
    if (confirmed) {
      this.save();
    }
  }

  private save() {
    this.marketService.saveCharge({
      file: this.file, name: this.fileName,
      idTypeImport: this.getTypeCharge(),
      nameImport: this.typeCharge
    })
      .subscribe(
        dataS => {
          console.log(dataS);
          this.toastr.successToastr(this.typeCharge + '. Correctamente importado.', '¡Se ha logrado!');
        },
        errorDataS => {

          this.chargeForm.reset();
          this.toastr.errorToastr(Constants.ERROR_LOAD, errorDataS);
        });
  }

  private getTypeCharge() {
    let option: number = 0;
    switch (this.typeCharge) {
      case 'Cargo Fijo':
        option = 6;
        break;
      case 'Cargo Variable':
        option = 7;
        break;
      case 'Gas':
        option = 8;
        break;
      case 'HR / MW':
        option = 9;
        break;
      case 'Margen x MM':
        option = 10;
        break;
      case 'Otros':
        option = 11;
        break;
    }
    return option;
  }

}
