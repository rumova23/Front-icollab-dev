import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {MY_FORMAT_DATE_PICKER} from '../../../core/models/MyFormatDatePicker';
import * as moment from 'moment';

import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { GlobalService } from 'src/app/core/globals/global.service';
import { time } from 'highcharts';
import {ToastrManager} from 'ng6-toastr-notifications';
import { PpaMonitoringFormatService } from '../../services/ppa-monitoring-format.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-safe-procedure-detection-and-correction',
  templateUrl: './safe-procedure-detection-and-correction.component.html',
  styleUrls: ['./safe-procedure-detection-and-correction.component.scss'],
	providers: [
		{
		  provide: DateAdapter,
		  useClass: MomentDateAdapter,
		  deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
		},
	
		{provide: MAT_DATE_FORMATS, useValue: MY_FORMAT_DATE_PICKER},
	  ],
})
export class SafeProcedureDetectionAndCorrectionComponent implements OnInit {

	date = new FormControl(moment());
	constructor(
		public globalService: GlobalService,
		public eventService: EventService,
		private toastr: ToastrManager,
		private ppaMonitoringFormatService: PpaMonitoringFormatService) { }

	ngOnInit() {
	}
	ejecutaProceso(){
		this.addBlock(1,"");

		timer(2000).subscribe(()=>{
			this.addBlock(2,"");
		});
	}
	download(){
		this.addBlock(1,"");

		timer(2000).subscribe(()=>{
			this.addBlock(2,"");
		});
	}
	
	private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
	chosenYearHandler(normalizedYear: any) {
		const ctrlValue = this.date.value;
		ctrlValue.year(normalizedYear.year());
		this.date.setValue(ctrlValue);
	}

	chosenMonthHandler(normalizedMonth: any, datepicker: MatDatepicker<any>) {
		const ctrlValue = this.date.value;
		ctrlValue.month(normalizedMonth.month());
		this.date.setValue(ctrlValue);
		datepicker.close();
	}

	
	aplicarDeteccionProcedimiento() {
		const year = new Date(this.date.value).getFullYear()
		const mount =  new Date(this.date.value).getMonth() + 1;
		this.addBlock(1, 'Aplicar Detección Procedimiento');
		this.ppaMonitoringFormatService.procesaDeteccionProcedimiento(year, mount).subscribe(
			data => {
				console.dir(data);
				this.addBlock(2,"");
			},
			errorData => {
				console.dir(errorData);
				this.addBlock(2,"");
				this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
			});
	}

	aplicarCorrecionProcedimiento() {
		const year = new Date(this.date.value).getFullYear()
		const mount =  new Date(this.date.value).getMonth() + 1;
		this.addBlock(1, 'Aplicar Correcion Procedimiento');
		this.ppaMonitoringFormatService.procesaCorreccionProcedimiento(year, mount).subscribe(
			data => {
				console.dir(data);
				this.addBlock(2,"");
			},
			errorData => {
				console.dir(errorData);
				this.addBlock(2,"");
				this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
			});
	}

	download() {
		const year = new Date(this.date.value).getFullYear()
		const month =  new Date(this.date.value).getMonth() + 1;
		this.ppaMonitoringFormatService.downloadExcel(year, month)
			.subscribe(
				data => {
					console.dir(data);
					let blob = new Blob([this.base64toBlob(data.base64,
						'application/CSV')], {});
					saveAs(blob, data.nameFile);
				},
				errorData => {
					this.toastr.errorToastr(errorData.error.message, '¡Error!');
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
