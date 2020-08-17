import { Component, OnInit } from '@angular/core';
import {default as moment, Moment} from 'moment';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventMessage} from '../../../../core/models/EventMessage';
import {EventBlocked} from '../../../../core/models/EventBlocked';
import {ToastrManager} from 'ng6-toastr-notifications';
import {BinnacleService} from '../../../services/binnacle.service';
import {EventService} from '../../../../core/services/event.service';

@Component({
  selector: 'app-safe-list-binnacle-events',
  templateUrl: './safe-list-binnacle-events.component.html',
  styleUrls: ['./safe-list-binnacle-events.component.scss']
})
export class SafeListBinnacleEventsComponent implements OnInit {
  binnacleListForm: FormGroup;
  date = new FormControl(moment());
  maxDate: Date;
  constructor(
      private formBuilder: FormBuilder,
      public toastr: ToastrManager,
      public binnacleService: BinnacleService,
      public eventService: EventService
  ) { }

  ngOnInit() {
    this.maxDate = new Date(new Date().getFullYear(), (new Date().getMonth() - 1 ));
    this.binnacleListForm = this.formBuilder.group({
      date: new FormControl(moment(), Validators.required)
    });
  }

  onChangeDatePicker(d: Moment) {
    this.date.setValue(d);
  }

  download() {
    const year = new Date(this.date.value).getFullYear();
    const month =  new Date(this.date.value).getMonth() + 1;
    this.addBlock(1, 'Bajando CSV ' + year + '/' + month + ': Generando');
    this.binnacleService.downloadExcel(year, month)
        .subscribe(
            data => {
              const blob = new Blob([this.base64toBlob(data.base64,
                  'application/CSV')], {});
              saveAs(blob, data.nameFile);
              this.addBlock(2, '');
              this.toastr.successToastr('Download File: Correctamente ' + year + '/' + month + ': Generado Correctamente', '¡Exito!');
            },
            errorData => {
              this.addBlock(2, '');
              this.toastr.errorToastr(errorData.error.message, '¡Error!');
            });
  }

  downloadBinnacleReal() {
    const year = new Date(this.date.value).getFullYear();
    const month =  new Date(this.date.value).getMonth() + 1;
    this.addBlock(1, 'Bajando CSV ' + year + '/' + month + ': Generando');
    this.binnacleService.downloadBinnacleReal(year, month)
        .subscribe(
            data => {
              const blob = new Blob([this.base64toBlob(data.base64,
                  'application/CSV')], {});
              saveAs(blob, data.nameFile);
              this.addBlock(2, '');
              this.toastr.successToastr('Download File: Correctamente ' + year + '/' + month + ': Generado Correctamente', '¡Exito!');
            },
            errorData => {
              this.addBlock(2, '');
              this.toastr.errorToastr(errorData.error.message, '¡Error!');
            });
  }

  base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);
      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }
  addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1,
        new EventBlocked(type, msg)));
  }
}
