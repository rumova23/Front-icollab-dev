import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { EventService } from 'src/app/core/services/event.service';
import { PpaMonitoringFormatService } from '../../services/ppa-monitoring-format.service';

@Component({
	selector: 'app-safe-procedure-detection-and-correction-v2',
	templateUrl: './safe-procedure-detection-and-correction-v2.component.html',
	styleUrls: ['./safe-procedure-detection-and-correction-v2.component.scss']
})
export class SafeProcedureDetectionAndCorrectionV2Component implements OnInit {
	date = new FormControl(moment());
	formQuery:FormGroup;
	tableData = [
		{order:'',dateOpCom:'',process:'',user:'',dateUpdated:'',status:''}
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
	tableRow_x_page = [5,10,20,50, 100, 250, 500];

	tablaColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'dateOpCom', label: 'Fecha de Operación Comercial' },
		{ key: 'process', label: 'Proceso' },
		{ key: 'user', label: 'Usuario' },
		{ key: 'dateUpdated', label: 'Date and Time last modified'},
		{ key: 'status', label: 'Estatus del Proceso' }
	];

	buttonDetected: boolean;
	isDetected: boolean;
	buttonCorrected: boolean;
	isCorrected: boolean;
	maxDate: Date;
	constructor(
		private formBuilder: FormBuilder,
		private confirmationDialogService: ConfirmationDialogService,
		public globalService: GlobalService,
		public eventService: EventService,
		public toastr: ToastrManager,
		private ppaMonitoringFormatService: PpaMonitoringFormatService
	) { }

	ngOnInit() {
		this.buttonDetected = true;
		this.buttonCorrected = true;
		this.maxDate = new Date(new Date().getFullYear(), (new Date().getMonth() - 1 ));
		this.formQuery = this.formBuilder.group({
			date: new FormControl(moment(), Validators.required)
		});
	}
	onFormQuery(value){

	}
	onChangeDatePicker(d: Moment) {
		this.date.setValue(d);
		this.stangeLoadRaw();
		/*const month = d.month() + 1;
		const year = d.year();
		const date = d.format('MM/yyyy');
		//*/
	}
	onBtnApDeteccion(){
		this.validaAplicarDeteccion();
	}
	onBtnApCorreccion(){
		this.validaAplicarCorreccion();
	}
	onBtnDownload(){
		this.download();
	}
	tableRowEdit(element){
	}	
	tableRowSee(element){
	}
	tableRowDelete(element){
		this.confirmationDialogService.confirm(
			'Confirmación',
			'¿Está seguro de eliminar el Registro?'
		)
		.then((confirmed) => {
			if ( confirmed ) {
			}
		})
		.catch(() => {});
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
		this.ppaMonitoringFormatService.procesaDeteccionProcedimiento(year, mount).subscribe(
			data => {
				
				this.stangeLoadRaw();
				this.toastr.successToastr('Detección Procedimiento: Aplicada correctamente', '¡Exito!');
			},
			errorData => {
				console.dir(errorData);
				
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
		
		this.ppaMonitoringFormatService.procesaCorreccionProcedimiento(year, mount).subscribe(
			data => {
				
				this.stangeLoadRaw();
				this.toastr.successToastr('Correcion Procedimiento: Aplicado correctamente', '¡Exito!');
			},
			errorData => {
				console.dir(errorData);
				
				this.toastr.errorToastr(errorData.error.message, '¡Error!');
			});
	}
	download() {

		const year = new Date(this.date.value).getFullYear();
		const month =  new Date(this.date.value).getMonth() + 1;
		this.ppaMonitoringFormatService.downloadExcel(year, month)
			.subscribe(
				data => {
					const blob = new Blob([this.base64toBlob(data.base64,
						'application/CSV')], {});
					saveAs(blob, data.nameFile);
					
					this.toastr.successToastr('Download File: Correctamente ' + year + '/' + month + ': Generado Correctamente', '¡Exito!');
				},
				errorData => {
					
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
		
		const year = new Date(this.date.value).getFullYear();
		const month =  new Date(this.date.value).getMonth() + 1;
		this.ppaMonitoringFormatService.stagenorm(year, month)
			.subscribe(
				data => {
					this.isDetected = data.isDetected;
					this.isCorrected = data.isCorrected;
					this.buttonDetected = false;
					this.buttonCorrected = true;
					if (this.isDetected) {
						this.buttonCorrected = false;
					}
					
				},
				errorData => {
					
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
