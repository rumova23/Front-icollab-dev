/* tslint:disable:indent */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
import { Moment } from 'moment';
import { PpaMonitoringFormatService } from '../../services/ppa-monitoring-format.service';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { TranslateService } from '@ngx-translate/core';
import {saveAs} from 'file-saver';

@Component({
	selector: 'app-dataq-dcf-energymeters',
	templateUrl: './dataq-dcf-energymeters.component.html',
	styleUrls: ['./dataq-dcf-energymeters.component.scss']
})
export class DataqDcfEnergymetersComponent implements OnInit {
	formQuery: FormGroup;
	tableData = [
		{ order: '', dateOpCom: '', process: '', user: '', dateUpdated: '', status: '' }
	];

	tableColumnsDisplay: string[] = [
		'order',
		'dateOpCom',
		'process',
		'user',
		'dateUpdated',
		'status',
		'sys_delete'
	];
	tableRowXpage = [5, 10, 20, 50, 100, 250, 500];
	tablaColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'dateOpCom', label: 'Fecha de Operación Comercial' },
		{ key: 'process', label: 'Proceso' },
		{ key: 'user', label: 'Usuario' },
		{ key: 'dateUpdated', label: 'Date and Time last modified'},
		{ key: 'status', label: 'Estatus del Proceso' }
	];

	maxDate: Date;
	buttonDetected = false;
	buttonCorrected = false;
	translateSuccess = 'Success';
	constructor(
		private formBuilder: FormBuilder,
		private confirmationDialogService: ConfirmationDialogService,
		public globalService: GlobalService,
		public eventService: EventService,
		public toastr: ToastrManager,
		private translate: TranslateService,
		private ppaMonitoringFormatService: PpaMonitoringFormatService
	) { }

	ngOnInit() {
		this.maxDate = new Date(new Date().getFullYear(), (new Date().getMonth() - 1));
		this.formQuery = this.formBuilder.group({
			date: new FormControl(moment(), Validators.required)
		});
	}

	onFormQuery(value) {

	}
	onChangeDatePicker(d: Moment) {
		const month = d.month() + 1;
		const year = d.year();
		const date = d.format('MM/yyyy');
	}
	onBtnApDeteccion() {
		this.aplicarDeteccion();
	}
	onBtnApCorreccion() {
		this.aplicarCorrecion();
	}
	onBtnDownload() {
		const mydate = this.formQuery.get('date').value;
		const month = mydate.month() + 1;
		const year = mydate.year();
		this.addBlock(1, 'Bajando  crudos CSV ' + year + '/' + month + ': Generando');
		this.ppaMonitoringFormatService.downloadCrudosProfileExcel(year, month)
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
	tableRowEdit(element) {
	}
	tableRowSee(element) {
	}
	tableRowDelete(element) {
		this.confirmationDialogService.confirm(
			'Confirmación',
			'¿Está seguro de eliminar el Registro?'
		)
			.then((confirmed) => {
				if (confirmed) {
				}
			})
			.catch(() => { });
	}

	aplicarDeteccion() {
		const mydate = this.formQuery.get('date').value;
		const month = mydate.month() + 1;
		const year = mydate.year();
		if (mydate == null) {
			this.toastr.errorToastr('Eliga una fecha.', 'Lo siento,');
			return 0;
		}
		this.addBlock(1, '');
		this.ppaMonitoringFormatService.procesaDeteccionProfile(
			year, month
		).subscribe(
			data => {
				/*
				data = {success: true, message: "ok", code: 0}
				*/
				this.addBlock(2, '');
				this.toastr.successToastr('El archivo llego con exito', 'Ejecución lanzada con éxito.');
				console.log(data);
			},
			errorData => {
				this.addBlock(2, '');
				console.dir(errorData);
				this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
			});
	}

	aplicarCorrecion() {
		const mydate = this.formQuery.get('date').value;
		const month = mydate.month() + 1;
		const year = mydate.year(); //getFullYear()
		if (mydate == null) {
			this.toastr.errorToastr('Eliga una fecha.', 'Lo siento,');
			return 0;
		}
		this.addBlock(1, '');
		this.ppaMonitoringFormatService.procesaCorreccionProfile(
			year, month
		).subscribe(
			data => {
				/*
				data = {success: true, message: "ok", code: 0}
				*/
				this.addBlock(2, '');
				this.toastr.successToastr('El archivo llego con exito', 'Ejecución lanzada con éxito.');
				console.log(data);
			},
			errorData => {
				this.addBlock(2, '');
				console.dir(errorData);
				this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
			});
	}



	translateMessages(){
		this.translate.get('Success').subscribe(e => this.translateSuccess=e);
	}
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
}
