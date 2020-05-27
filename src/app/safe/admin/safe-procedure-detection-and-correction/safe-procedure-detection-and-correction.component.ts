/* tslint:disable:indent */
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
import {ConfirmationDialogService} from '../../../core/services/confirmation-dialog.service';

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
		{
			provide: MAT_DATE_FORMATS, useValue: MY_FORMAT_DATE_PICKER
		}
	],
})
export class SafeProcedureDetectionAndCorrectionComponent implements OnInit {

	date = new FormControl(moment());
	buttonDetected: boolean;
	isDetected: boolean;
	buttonCorrected: boolean;
	isCorrected: boolean;
	maxDate: Date;
	constructor(
		public globalService: GlobalService,
		public eventService: EventService,
		private toastr: ToastrManager,
		private ppaMonitoringFormatService: PpaMonitoringFormatService,
		private confirmationDialogService: ConfirmationDialogService) { }

	ngOnInit() {
		this.maxDate = new Date(new Date().getFullYear(), (new Date().getMonth() - 1 ));
		this.buttonDetected = true;
		this.buttonCorrected = true;
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
		this.stangeLoadRaw();
		datepicker.close();
	}

	validaAplicarDeteccion() {
		if (this.isDetected) {
			this.confirmationDialogService.confirm('Por favor, confirme..',
				'Esta seguro que, quiere sobreescribir la actual deteccion?').then((confirmed) => {
				if (confirmed) {
					this.aplicarDeteccionProcedimiento();
				}
			}).catch(() => console.log('Salio'));
		} else {
			this.aplicarDeteccionProcedimiento();
		}
	}

	aplicarDeteccionProcedimiento() {
		const year = new Date(this.date.value).getFullYear();
		const mount =  new Date(this.date.value).getMonth() + 1;
		this.addBlock(1, 'Aplicar Detección Procedimiento');
		this.ppaMonitoringFormatService.procesaDeteccionProcedimiento(year, mount).subscribe(
			data => {
				this.addBlock(2, '');
				this.stangeLoadRaw();
				this.toastr.successToastr('Detección Procedimiento: Aplicada correctamente', '¡Exito!');
			},
			errorData => {
				console.dir(errorData);
				this.addBlock(2, '');
				this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
			});
	}

	validaAplicarCorreccion() {
		if (this.isCorrected) {
			this.confirmationDialogService.confirm('Por favor, confirme..',
				'Esta seguro que, quiere sobreescribir la actual Correccion?').then((confirmed) => {
				if (confirmed) {
					this.aplicarCorrecionProcedimiento();
				}
			}).catch(() => console.log('Salio'));
		} else {
			this.aplicarCorrecionProcedimiento();
		}
	}
	aplicarCorrecionProcedimiento() {
		const year = new Date(this.date.value).getFullYear();
		const mount =  new Date(this.date.value).getMonth() + 1;
		this.addBlock(1, 'Aplicar Correcion Procedimiento');
		this.ppaMonitoringFormatService.procesaCorreccionProcedimiento(year, mount).subscribe(
			data => {
				this.addBlock(2, '');
				this.stangeLoadRaw();
				this.toastr.successToastr('Correcion Procedimiento: Aplicado correctamente', '¡Exito!');
			},
			errorData => {
				console.dir(errorData);
				this.addBlock(2, '');
				this.toastr.errorToastr(errorData.error.message, '¡Error!');
			});
	}

	download() {

		const year = new Date(this.date.value).getFullYear();
		const month =  new Date(this.date.value).getMonth() + 1;
		this.addBlock(1, 'Bajando CSV ' + year + '/' + month + ': Generando');
		this.ppaMonitoringFormatService.downloadExcel(year, month)
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
	stangeLoadRaw() {
		this.addBlock(1, '');
		const year = new Date(this.date.value).getFullYear();
		const month =  new Date(this.date.value).getMonth() + 1;
		this.ppaMonitoringFormatService.stagenorm(year, month)
			.subscribe(
				data => {
					console.dir(data);
					this.isDetected = data.isDetected;
					this.isCorrected = data.isCorrected;
					this.buttonDetected = false;
					this.buttonCorrected = true;
					if (this.isDetected) {
						this.buttonCorrected = false;
					}
					this.addBlock(2, '');
				},
				errorData => {
					this.addBlock(2, '');
					if (errorData.error.message.indexOf('Fecha de Operación Comercial: No cargada.') !== -1) {
						this.isDetected = false;
						this.isCorrected = false;
						this.buttonDetected = false;
						this.buttonCorrected = true;
						if (this.isDetected) {
							this.buttonCorrected = false;
						}
					} else {
						this.toastr.errorToastr(errorData.error.message, '¡Error!');
						this.buttonDetected = true;
						this.buttonCorrected = true;
					}
				});
	}
}
