/* tslint:disable:indent */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import * as moment from 'moment';
import { requiredFileType } from 'src/app/core/helpers/requiredFileType';
import { Moment } from 'moment';
import {BinnacleService} from '../../services/binnacle.service';
import {EventMessage} from '../../../core/models/EventMessage';
import {EventBlocked} from '../../../core/models/EventBlocked';
import {Constants} from '../../../core/globals/Constants';

@Component({
	selector: 'app-safe-import-event-log',
	templateUrl: './safe-import-event-log.component.html',
	styleUrls: ['./safe-import-event-log.component.scss']
})
export class SafeImportEventLogComponent implements OnInit {
	file: any;
	fileName: any;
	tableData = [
		{ order: 1, fechaOp: 'mar-20', fuenteImport: 'Manual', usuario: 'Manuel Herrera', fechaMod: '01/04/2020 01:40:00 pm', estatus: 'exitosa' },
		{ order: 2, fechaOp: 'mar-20', fuenteImport: 'Manual', usuario: 'Sistema', fechaMod: '01/04/2020 12:40:00 pm', estatus: 'exitosa' },
		{ order: 3, fechaOp: 'mar-20', fuenteImport: 'Manual', usuario: 'Ivette Colin', fechaMod: '01/04/2020 12:40:00 pm', estatus: 'exitosa' },
		{ order: 4, fechaOp: 'mar-20', fuenteImport: 'Manual', usuario: 'Sistema', fechaMod: '01/04/2020 11:40:00 pm', estatus: 'Fallida' },
		{ order: 5, fechaOp: 'mar-20', fuenteImport: 'Manual', usuario: 'Sistema', fechaMod: '01/04/2020 11:40:00 pm', estatus: 'Fallida' }
	];
	tablaColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'fechaOp', label: 'Fecha de Operación Comercial' },
		{ key: 'fuenteImport', label: 'Fuente de Importación' },
		{ key: 'usuario', label: 'Usuario' },
		{ key: 'fechaMod', label: 'Fecha y Hora Ultima Modificación' },
		{ key: 'estatus', label: 'Estatus de la Importación' }
	];
	tableColumnsDisplay: string[] = [
		'order',
		'fechaOp',
		'fuenteImport',
		'usuario',
		'fechaMod',
		'estatus',
		'sys_delete'
	];
	tableRowXpage = [5, 10, 20, 50, 100, 250, 500];
	fileUploadForm: FormGroup;

	progress;
	constructor(
		private formBuilder: FormBuilder,
		private confirmationDialogService: ConfirmationDialogService,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		public binnacleService: BinnacleService,
		public eventService: EventService) { }

	ngOnInit() {
		this.fileUploadForm = this.formBuilder.group({
			file: new FormControl(null, [Validators.required, requiredFileType('zip')]),
			date: new FormControl(moment(), Validators.required)
		});
	}
	onChangeDatePicker(d: Moment) {
		const month = d.month() + 1;
		const year = d.year();
		const date = d.format('MM/yyyy');
	}
	onTableRowDelete(element) {
		this.confirmationDialogService.confirm(
			'Confirmación',
			'¿Está seguro de eliminar el Registro?'
		)
		.then((confirmed) => {
			if ( confirmed ) {
				console.log(element);
			}
		})
		.catch(() => {});
	}
	downloadZipCenace() {
		const mydate = this.fileUploadForm.get('date').value;
		const month = mydate.month() + 1;
		const year = mydate.year();
		if (mydate == null) {
			this.toastr.errorToastr('Eliga una fecha.', 'Lo siento,');
			return 0;
		}
		this.addBlock(1, 'Bajando Zip ' + year + '/' + month + ': Generando');
		this.binnacleService.downloadZipCenace(year, month)
			.subscribe(
				data => {
					const blob = new Blob([this.base64toBlob(data.base64,
						'application/zip')], {});
					saveAs(blob, data.nameFile);
					this.addBlock(2, '');
					this.toastr.successToastr('Download File: Correctamente ' + year + '/' + month + ': Generado Correctamente', '¡Exito!');
				},
				errorData => {
					this.addBlock(2, '');
					this.toastr.errorToastr(errorData.error.message, '¡Error!');
				});
	}

	upload(value) {
		const mydate = this.fileUploadForm.get('date').value;
		const month = mydate.month() + 1;
		const year = mydate.year();
		if (mydate == null) {
			this.toastr.errorToastr('Eliga una fecha.', 'Lo siento,');
			return 0;
		}
		let reader = new FileReader();
		reader.onloadend = (e) => {
			this.file = reader.result;
			console.dir(reader);
			this.file = this.file.replace(/^data:(.*;base64,)?/, '');
			this.file = this.file.trim();
			this.fileName = value.file.name;
			this.binnacleService.uploadZip(year, month, {
				file: this.file,
				name: this.fileName,
				idTypeImport: 4,
				nameImport: 'no aplica'
			}).subscribe(
				data => {
					this.toastr.successToastr(Constants.SAVE_SUCCESS);
				},
				errorData => {
					this.toastr.errorToastr(Constants.ERROR_LOAD, errorData.error.message);
				});
		}
		reader.readAsDataURL(value.file);
	}
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
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
}
